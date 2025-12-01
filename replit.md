# AI Resume Reviewer

This is a full-stack application that uses Gemini AI to review resumes and provide feedback.

## Running the Application

To run this application, you will need to have the following installed:

- Java 17 or higher
- Maven
- Node.js and npm
- A PostgreSQL database

### Backend Setup

1.  **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

2.  **Set Environment Variables:**

    Create a `.env` file in the `backend` directory and add the following environment variables:

    ```bash
    PGHOST=your_database_host
    PGPORT=your_database_port
    PGDATABASE=your_database_name
    PGUSER=your_database_username
    PGPASSWORD=your_database_password
    GEMINI_API_KEY=your_gemini_api_key
    ```

    Replace the placeholder values with your actual database credentials and Gemini API key.

3.  **Run the Spring Boot Application:**

    You can run the application using the following Maven command:

    ```bash
    mvn spring-boot:run
    ```

    The backend server will start on port `8080`.

### Frontend Setup

1.  **Navigate to the frontend directory:**

    ```bash
    cd frontend
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

3.  **Run the Development Server:**

    ```bash
    npm run dev
    ```

    The frontend development server will start on port `5173`.

## API Endpoints

-   `POST /api/analyze`: Upload a resume and job description for analysis.
-   `GET /api/analyses`: Get a list of all resume analyses.
-   `GET /api/analyses/{id}`: Get a specific resume analysis by ID.
-   `GET /api/health`: Health check endpoint.