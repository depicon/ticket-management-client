# Ticket Management Client

This is the frontend for the Ticket Management application, built with React, TypeScript, and Vite.

## Technology Stack

- **Framework:** [React](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Routing:** [React Router](https://reactrouter.com/)

## Project Structure

The project is a standard Vite-React application with the following key directories:

-   `src/`: Contains all the source code, including components, pages, and assets.
-   `public/`: Contains static assets that are not processed by the build tool.
-   `dist/`: The output directory for the production build.

## Configuration

### Vite Configuration (`vite.config.ts`)

-   **Development Server Port:** `5173`
-   **API Proxy:** Requests to `/api` are proxied to `http://localhost:3000` to avoid CORS issues during development.
-   **Path Alias:** The `@` alias is configured to point to the `src` directory for cleaner import paths.

### Docker

The project includes Docker configurations for both development and production environments:

-   `Dockerfile`: Sets up a multi-stage build using Nginx to serve the production-ready static files.
-   `Dockerfile.dev`: Configures the development environment.
-   `entrypoint.sh`: A script to substitute environment variables in the built files at runtime.

## Getting Started

### Prerequisites

-   Node.js (v20.x or higher)
-   npm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/depicon/ticket-management-client.git
    cd ticket-management-client
    ```

2.  Install the dependencies:
    ```bash
    npm install
    ```

### Available Scripts

-   **`npm run dev`**: Starts the development server with Hot Module Replacement (HMR). The application will be available at `http://localhost:5173`.
-   **`npm run build`**: Compiles the TypeScript code and builds the application for production in the `dist` folder.
-   **`npm run lint`**: Lints the codebase using ESLint.
-   **`npm run preview`**: Serves the production build locally to preview it.
