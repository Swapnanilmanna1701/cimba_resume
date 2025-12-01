# AI Resume Reviewer

An AI-powered web application that helps job seekers optimize their resumes for specific job descriptions. Upload your resume, paste the job description, and get an instant match score with actionable improvement suggestions powered by Google's Gemini AI.

## Features

- **Resume Upload**: Supports PDF and TXT formats (up to 10MB)
- **AI-Powered Analysis**: Uses Google Gemini AI to analyze resumes against job requirements
- **Match Score**: Get a 0-100% compatibility score
- **Improvement Suggestions**: Receive 3 specific, actionable suggestions to improve your resume
- **Analysis History**: View all your past analyses
- **PDF Reports**: Download analysis results as PDF documents

## Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | React 18, Vite, Tailwind CSS |
| Backend | Java 17, Spring Boot 3.x |
| Database | PostgreSQL |
| AI | Google Gemini 2.0 Flash API |
| PDF Parsing | Apache PDFBox |

## Prerequisites

Before running the application, ensure you have:

- **Java 17** or higher installed
- **Node.js 18** or higher installed
- **Maven** for building the backend
- **PostgreSQL** database
- **Google Gemini API Key** - Get one from [Google AI Studio](https://aistudio.google.com/apikey)

## Environment Variables

Set up the following environment variables:

| Variable | Description |
|----------|-------------|
| `PGHOST` | PostgreSQL host address |
| `PGPORT` | PostgreSQL port (default: 5432) |
| `PGUSER` | PostgreSQL username |
| `PGPASSWORD` | PostgreSQL password |
| `PGDATABASE` | PostgreSQL database name |
| `GEMINI_API_KEY` | Your Google Gemini API key |

## Project Structure

```
/
├── backend/                    # Spring Boot backend
│   ├── src/main/java/com/resumereviewer/
│   │   ├── controller/         # REST API endpoints
│   │   ├── service/            # Business logic & AI integration
│   │   ├── repository/         # Database access layer
│   │   ├── model/              # JPA entities
│   │   ├── dto/                # Data transfer objects
│   │   └── config/             # Configuration classes
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API service layer
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ai-resume-reviewer
```

### 2. Set Up Environment Variables

Create the required environment variables or add them to your environment:

```bash
export PGHOST=your_postgres_host
export PGPORT=5432
export PGUSER=your_username
export PGPASSWORD=your_password
export PGDATABASE=your_database
export GEMINI_API_KEY=your_gemini_api_key
```

### 3. Set Up the Backend

```bash
cd backend
mvn clean install
```

### 4. Set Up the Frontend

```bash
cd frontend
npm install
```

## Running the Application

### Start the Backend Server

```bash
cd backend
mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Dserver.port=8080"
mvn spring-boot:run (if previous  is not working/ after set $env:PGHOST="localhost"
$env:PGPORT="5432"
$env:PGDATABASE="resume"
$env:PGUSER="postgres"
$env:PGPASSWORD="postgres"
$env:GEMINI_API_KEY="your-gemini-api-key-here"
to the  powershell)
```

The backend will start on `http://localhost:8080`

### Start the Frontend Development Server

In a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5000`

### Access the Application

Open your browser and navigate to `http://localhost:5000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/analyze` | Analyze a resume against a job description |
| GET | `/api/analyses` | Get all past analyses |
| GET | `/api/analyses/{id}` | Get a specific analysis by ID |
| GET | `/api/health` | Health check endpoint |

### Example: Analyze Resume

```bash
curl -X POST http://localhost:8080/api/analyze \
  -F "resume=@resume.pdf" \
  -F "jobDescription=Your job description here"
```

## Usage Guide

1. **Upload Resume**: Click the upload area or drag and drop your resume file (PDF or TXT)
2. **Enter Job Description**: Paste the complete job description in the text area
3. **Analyze**: Click "Analyze Resume" to start the AI analysis
4. **Review Results**: View your match score and improvement suggestions
5. **Download Report**: Click "Download PDF" to save your analysis
6. **View History**: Navigate to the History page to see past analyses

## Troubleshooting

### Common Issues

**Database Connection Failed**
- Verify PostgreSQL is running
- Check your database credentials in environment variables
- Ensure the database exists

**Gemini API Error**
- Verify your GEMINI_API_KEY is valid
- Check your API quota at Google AI Studio
- Ensure you have internet connectivity

**Frontend Not Loading**
- Make sure both backend and frontend servers are running
- Check if port 5000 is available
- Clear browser cache and refresh

**PDF Upload Fails**
- Ensure the PDF is under 10MB
- Try converting to TXT format if PDF parsing fails
- Check if the PDF contains extractable text (not just images)

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
