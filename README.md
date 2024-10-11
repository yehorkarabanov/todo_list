
# TO-DO list
## Description
This is a pet project to practise skills in building web application as fullstack developer.




## Overview

This project comprises the following languages and libraries:\
1. **Python**:
* **FastAPI** - Web framework for building APIs with Python.
* **SqlAlchemy** + **Alembic** - ORM to work with database and manage migrations.
* **Celery** - Task queue for time-consuming tasks.
* **Flower** - UI for Celery administration.
* **Loguru** - Logging purposes.
2. **JavaScript**:
* **React** - Development of dynamic and interactive UIs
* **React-router** - Building multi - paged frontend.
* **Redux** - Cross-paged data storage.
* **Axious** - HTTP requests to backend.
* **Sass** - Efficients way to write scc.
3. **NGINX** - Reverse proxy to route traffic to the FastAPI backend and serve the frontend**. Nginx also handles HTTPS.
4. **Docker** - Containerize the application
5. **Redis** - Cache and task queue storage.


## Installation

1. Clone repository

```bash
git clone <repository-url>
cd <repository-directory>
```

2. Start the Application with Docker Compose
```bash
docker-compose -f ./docker-compose.yml -f ./docker-compose.override.yml up
```
3. Create and Stamp the Database with Alembic
```bash
docker-compose exec backend-api bash
cd ..
alembic upgrade head
```
## URL Endpoints

Nginx is used as a reverse proxy for various services in this project. Below are the key URL paths and their purposes:

1. **Root (`/`)**
   - **Description**: The root path serves the frontend application.
   - **Proxy Pass**: Requests are proxied to the frontend at `http://frontend:3000/`.

2. **API (`/api/`)**
   - **Description**: Handles backend API requests.
   - **Proxy Pass**: Requests are routed to the FastAPI backend at `http://backend-api:8080/`.

3. **Flower (`/flower/`)**
   - **Description**: Provides access to Flower, a monitoring tool for Celery workers.
   - **Proxy Pass**: Requests are forwarded to `http://flower:5555/flower/`.

4. **PgAdmin (`/pgadmin/`)**
   - **Description**: Gives access to PgAdmin, a PostgreSQL database management tool.
   - **Proxy Pass**: Requests are routed to `http://pgadmin:80/`.

5. **Mailhog (`/mailhog/`)**
   - **Description**: Serves the Mailhog interface for testing and capturing outgoing emails.
   - **Proxy Pass**: Requests are proxied to `http://mailhog:8025/`.

### HTTPS and Redirection

- **HTTP to HTTPS Redirection**: Nginx is configured to redirect all HTTP traffic to HTTPS, ensuring secure communication.
- **SSL/TLS**: Nginx manages SSL/TLS termination using the certificate files located at `/etc/nginx/server.crt` and `/etc/nginx/server.key`.
