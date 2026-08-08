# Portfolio Website - Implementation Plan

## Tech Stack
- **Frontend:** React (JavaScript), hosted on GitHub Pages (free, 24/7 availability)
- **Backend:** Flask (Python), for contact form API
- **Hosting:** GitHub Pages for frontend, backend can be deployed on Render/Railway free tier

## Project Structure
```
Portfolio-Project/
├── frontend/          # React app
│   ├── public/
│   │   └── resume.pdf        # Downloadable resume
│   └── src/
│       ├── App.js
│       ├── index.js
│       ├── components/
│       │   ├── Navbar.js
│       │   ├── Hero.js           # Animated intro/landing section
│       │   ├── About.js          # Profile/bio section
│       │   ├── Experience.js     # Experience journey/timeline
│       │   ├── Skills.js         # Skills showcase
│       │   ├── Contact.js        # Quick message form
│       │   └── Footer.js
│       └── styles/
│           └── App.css
├── backend/           # Flask API
│   ├── app.py                    # Flask server (contact form endpoint)
│   ├── requirements.txt
│   └── .env
└── Portfolio/         # (existing Maven skeleton - can be removed)
```

## Feature Breakdown

### Feature 1: View Profile/Data
**What:** A single-page interactive portfolio with sections for bio, skills, and experience.
**How:**
- React SPA with smooth scroll navigation
- **Hero Section** - Animated intro with name, title, and tagline
- **About Section** - Profile photo, bio, and summary
- **Experience Section** - Timeline-style journey through work experience
- **Skills Section** - Visual display of technical skills
- Animations using CSS animations and scroll-triggered effects (via Intersection Observer API)

### Feature 2: Download Resume
**What:** A button that lets visitors download the resume as a PDF.
**How:**
- Store `resume.pdf` in the `public/` folder
- Download button in the Hero and/or Navbar section
- Uses a simple `<a href="/resume.pdf" download>` link - no backend needed

### Feature 3: Contact / Quick Message
**What:** A form where visitors can send a quick message.
**How:**
- React contact form component (name, email, message)
- **Option A (Simple):** Use Formspree or EmailJS - no backend needed, free tier available
- **Option B (Custom):** Flask backend with a `/api/contact` POST endpoint that sends an email
- Recommend Option A for simplicity and free hosting

## Animations & Interactivity
- Fade-in on scroll for each section
- Typing effect on hero title
- Smooth scroll navigation
- Hover effects on skill cards and buttons
- Timeline animation for experience section

## Hosting Plan
- **Frontend:** GitHub Pages (free, reliable, custom domain support)
- **Backend (if needed):** Render free tier for Flask API
- If using Formspree for contact, no backend deployment needed at all

## Implementation Order
1. Set up React project with routing and basic structure
2. Build Hero section with animations
3. Build About section
4. Build Experience timeline
5. Build Skills section
6. Build Contact form (Formspree integration)
7. Add Navbar with smooth scroll
8. Add Footer
9. Polish animations and responsiveness
10. Deploy to GitHub Pages
