# AI Resume Reviewer

## Overview
An AI-powered web application that helps users optimize their resumes for specific job descriptions. The application analyzes resumes against job requirements and provides a match score along with actionable improvement suggestions.

## Tech Stack
- **Frontend**: React 18 with Vite, Tailwind CSS
- **Backend**: Java Spring Boot 3.x
- **Database**: PostgreSQL
- **AI**: Google Gemini AI API

## Project Structure
```
/
├── backend/                 # Spring Boot backend
│   ├── src/
│   │   └── main/
│   │       ├── java/com/resumereviewer/
│   │       │   ├── controller/    # REST API endpoints
│   │       │   ├── service/       # Business logic & AI integration
│   │       │   ├── repository/    # Database access
│   │       │   ├── model/         # JPA entities
│   │       │   ├── dto/           # Data transfer objects
│   │       │   └── config/        # Configuration classes
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service layer
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
└── replit.md
```

## Features
1. **Resume Upload**: Upload PDF or text resumes
2. **Job Description Input**: Paste job descriptions for comparison
3. **AI Analysis**: Gemini AI analyzes resume against job requirements
4. **Match Score**: 0-100% match score with visual indicator
5. **Improvement Suggestions**: Three actionable suggestions per analysis
6. **Download Reports**: Export analysis as PDF
7. **History**: View past analyses

## API Endpoints
- `POST /api/analyze` - Analyze resume against job description
- `GET /api/analyses` - Get all past analyses
- `GET /api/analyses/{id}` - Get specific analysis
- `GET /api/health` - Health check

## Environment Variables
- `DATABASE_URL` - PostgreSQL connection string (auto-configured)
- `GEMINI_API_KEY` - Google Gemini AI API key (required)

## Running the Application
The application runs two services:
1. Backend: Spring Boot on port 8080
2. Frontend: Vite dev server on port 5000 (proxies /api to backend)

## Recent Changes
- Initial project setup (November 2025)
- React frontend with Tailwind CSS
- Spring Boot backend with Gemini AI integration
- PDF parsing with Apache PDFBox
- PostgreSQL database integration
- Updated Gemini model to gemini-2.0-flash for API compatibility (November 2025)
