# Todo List

A simple and efficient todo list application to help you manage tasks and boost productivity.

## DeepWiki link
[My Deepwiki Page](https://deepwiki.com/yehorkarabanov/todo_list)

## Features

- Add, edit, and delete tasks.
- Mark tasks as complete.
- Categorize tasks for better organization.
- Responsive user interface.
- Save tasks locally or integrate with a backend API.

## Technologies Used

- **Frontend:** JavaScript, SCSS, HTML
- **Backend:** Python
- **Containerization:** Dockerfile, Docker Compose
- **Others:** Shell scripts, Mako templates

## Backend Key Features

1. **Task Management API**:
   - Supports creation, updating, and deletion of tasks.

2. **User Management**:
   - Provides user registration, authentication, and profile management.

3. **Database Integration**:
   - Robust database support with models and migrations.
   - Likely uses SQLAlchemy or similar ORM.

4. **Email Notifications**:
   - Includes functionality for sending email notifications.

5. **Asynchronous Task Processing**:
   - Utilizes Celery for background task processing and scheduling.

6. **Configuration and Settings**:
   - Offers customizable environment variables and application settings.

7. **Main Application Logic**:
   - Entry point for backend application logic and route definitions.

## Frontend Key Features

1. **Responsive User Interface**:
   - The UI is designed to be responsive and user-friendly.

2. **Build and Deployment Support**:
   - Dockerfile enables containerized builds for easy deployment.

3. **Package Management**:
   - Managed with `package.json` and `package-lock.json`, ensuring dependency and script organization.

4. **Static Assets**:
   - The `public` directory contains static files such as images and icons.

5. **Modular Codebase**:
   - The `src` directory organizes components, utilities, and views for a scalable design.

## Containerization with Docker Compose

- **Service Orchestration**:
   - The `docker-compose.yml` file orchestrates multiple services like the backend, frontend, and database.
   - Handles service dependencies, networking, and environment variables.

- **Key Features**:
   - Simplified multi-container setup.
   - Easy scaling and resource management.

## NGINX Configuration

- **Reverse Proxy**:
   - Serves as a reverse proxy to route requests to the backend or frontend services.

- **Static Content Delivery**:
   - Efficiently serves static files like frontend assets.

- **Load Balancing**:
   - Provides load balancing for backend services to ensure high availability.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yehorkarabanov/todo_list.git
   ```
2. Navigate to the project directory:
   ```bash
   cd todo_list
   ```
3. Install dependencies:
   - If using `npm` or `pip` for JavaScript and Python dependencies, adjust accordingly.

4. Run the application:
   ```bash
   # Example for a local development server
   npm start
   ```

5. For Docker Compose:
   ```bash
   docker-compose up
   ```

## Usage

1. Open the application in your browser or terminal.
2. Add tasks, manage categories, and track progress.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push them to your branch:
   ```bash
   git push origin feature-name
   ```
4. Open a pull request describing your changes.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For further inquiries or collaboration, feel free to reach out:

- **Author:** Yehor Karabanov
- **GitHub:** [yehorkarabanov](https://github.com/yehorkarabanov)
