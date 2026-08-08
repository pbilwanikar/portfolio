from flask import Flask, request, jsonify, redirect
from flask_cors import CORS
from dotenv import load_dotenv
import os
import base64
import json
import requests as http_requests
from email.mime.text import MIMEText
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

load_dotenv()

app = Flask(__name__)

# Allow requests from any origin (update with your GitHub Pages URL in production)
CORS(app, origins=os.getenv('CORS_ORIGINS', '*').split(','))

SCOPES = ['https://www.googleapis.com/auth/gmail.send']
TOKEN_PATH = os.path.join(os.path.dirname(__file__), 'token.json')
CREDENTIALS_PATH = os.path.join(os.path.dirname(__file__), 'credentials.json')


def get_gmail_credentials():
    """Get or refresh Gmail OAuth credentials.
    Supports both:
    - GMAIL_TOKEN env var (for hosted environments like Render)
    - token.json file (for local development)
    """
    creds = None
    token_env = os.getenv('GMAIL_TOKEN')

    # Try env var first (production/hosted)
    if token_env:
        token_data = json.loads(token_env)
        creds = Credentials.from_authorized_user_info(token_data, SCOPES)
    # Fall back to file (local dev)
    elif os.path.exists(TOKEN_PATH):
        creds = Credentials.from_authorized_user_file(TOKEN_PATH, SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
            # Save refreshed token back
            if token_env:
                print('TOKEN REFRESHED — update GMAIL_TOKEN env var on Render with:')
                print(creds.to_json())
            else:
                with open(TOKEN_PATH, 'w') as token:
                    token.write(creds.to_json())
        else:
            # Local-only: browser OAuth flow
            if not os.path.exists(CREDENTIALS_PATH):
                return None
            flow = InstalledAppFlow.from_client_secrets_file(CREDENTIALS_PATH, SCOPES)
            creds = flow.run_local_server(port=8090)
            with open(TOKEN_PATH, 'w') as token:
                token.write(creds.to_json())

    return creds


def send_email_via_gmail(to_email, subject, body):
    """Send email using Gmail API with OAuth."""
    creds = get_gmail_credentials()
    if not creds:
        raise Exception('Gmail not authorized. Set GMAIL_TOKEN env var or run locally to authorize.')

    message = MIMEText(body)
    message['to'] = to_email
    message['subject'] = subject
    raw = base64.urlsafe_b64encode(message.as_bytes()).decode()

    resp = http_requests.post(
        'https://gmail.googleapis.com/gmail/v1/users/me/messages/send',
        headers={'Authorization': f'Bearer {creds.token}', 'Content-Type': 'application/json'},
        json={'raw': raw},
        timeout=10,
    )
    resp.raise_for_status()
    return resp.json()


@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.get_json()

    name = data.get('name', '').strip()
    email = data.get('email', '').strip()
    message_text = data.get('message', '').strip()

    if not name or not email or not message_text:
        return jsonify({'error': 'All fields are required'}), 400

    receive_email = os.getenv('CONTACT_RECEIVE_EMAIL')
    body = f'Name: {name}\nEmail: {email}\n\nMessage:\n{message_text}'

    try:
        send_email_via_gmail(receive_email, f'Portfolio Contact: {name}', body)
        return jsonify({'message': 'Message sent successfully!'}), 200
    except Exception as e:
        print(f'Error sending email: {e}')
        return jsonify({'message': 'Message received! (Email delivery pending setup)'}), 200


@app.route('/api/resume', methods=['GET'])
def resume():
    folder_id = os.getenv('GOOGLE_DRIVE_FOLDER_ID')
    api_key = os.getenv('GOOGLE_API_KEY')

    if not folder_id or not api_key:
        return jsonify({'error': 'Google Drive not configured'}), 500

    try:
        resp = http_requests.get(
            'https://www.googleapis.com/drive/v3/files',
            params={
                'q': f"'{folder_id}' in parents and trashed = false",
                'orderBy': 'modifiedTime desc',
                'pageSize': 1,
                'fields': 'files(id, name)',
                'key': api_key,
            },
            timeout=10,
        )
        resp.raise_for_status()
        files = resp.json().get('files', [])

        if not files:
            return jsonify({'error': 'No resume found in folder'}), 404

        file_id = files[0]['id']
        download_url = f'https://drive.google.com/uc?export=download&id={file_id}'
        return redirect(download_url)

    except Exception as e:
        print(f'Error fetching resume: {e}')
        return jsonify({'error': 'Failed to fetch resume'}), 500


@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'}), 200


if __name__ == '__main__':
    port = int(os.getenv('PORT', 5001))
    app.run(debug=os.getenv('FLASK_ENV') != 'production', host='0.0.0.0', port=port)
