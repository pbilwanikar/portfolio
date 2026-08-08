# Portfolio Website

A personal portfolio website built with React and Flask — interactive, animated, and fully responsive.

## Features

- **Interactive Single-Page Portfolio** — Animated hero section with typing effect, scroll-reveal animations, 3D tilt profile image, and animated stat counters
- **Resume Download** — Dynamically serves the latest resume from Google Drive. Upload a new version to Drive and the portfolio automatically picks it up — no redeployment needed
- **Contact Form** — Sends messages directly to your inbox using Gmail API with OAuth (no passwords stored)
- **Responsive Design** — Works seamlessly on desktop, tablet, and mobile

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, JavaScript, CSS3 |
| Backend | Python, Flask |
| Auth | Google OAuth 2.0 (Gmail API) |
| APIs | Google Drive API, Gmail API |
| Hosting | GitHub Pages (frontend), Render (backend) |

## Project Structure

```
Portfolio-Project/
├── frontend/               # React SPA
│   ├── src/
│   │   ├── components/     # Navbar, Hero, About, Experience, Skills, Contact, Footer
│   │   └── hooks/          # Custom scroll-reveal animation hook
│   └── public/             # Static assets
├── backend/                # Flask API
│   ├── app.py              # Contact form + resume download endpoints
│   ├── requirements.txt
│   └── render.yaml         # Render deployment config
└── ReadMe.md
```

## Running Locally

**Frontend:**
```bash
cd frontend
npm install
npm start          # runs on http://localhost:3000
```

**Backend:**
```bash
cd backend
pip install -r requirements.txt
python app.py      # runs on http://localhost:5001
```

## Environment Variables (Backend)

Set these in your hosting dashboard (Render) or in a local `.env` file:

| Variable | Purpose |
|---|---|
| `CONTACT_RECEIVE_EMAIL` | Email where contact form messages are sent |
| `GOOGLE_DRIVE_FOLDER_ID` | Google Drive folder containing your resume |
| `GOOGLE_API_KEY` | API key for Google Drive file listing |
| `GMAIL_TOKEN` | OAuth token JSON for Gmail API (hosted environments) |
| `CORS_ORIGINS` | Allowed frontend origins |
