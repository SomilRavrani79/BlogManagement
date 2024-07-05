# Blog Management Application

This is a Blog Management Application developed using Angular. The application allows users to create, view, and delete blog posts. It also includes form validation and integration with a backend service.

## Setup Instructions

### Prerequisites

- Node.js and npm: [Download and install](https://nodejs.org/)
- Angular CLI: Install globally using `npm install -g @angular/cli`

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/SomilRavrani79/BlogManagement.git
    cd your-repository-name/ClientApp
    ```

2. Install the Angular dependencies:

    ```bash
    npm install
    ```

## How to Run the Application

1. Navigate to the `ClientApp` directory:

    ```bash
    cd ClientApp
    ```

2. Start the Angular development server:

    ```bash
    ng serve
    ```

3. Open a web browser and navigate to `http://localhost:4200` to access the Blog Management Application.

## Design Decisions and Application Structure

### Design Decisions

- **Component-Based Architecture**: The application is built using Angular's component-based architecture to ensure modularity, reusability, and maintainability.
- **Reactive Forms**: Reactive forms are used for form handling and validation to provide a robust and scalable way to manage form states and validations.
- **Angular Material**: Angular Material is used for UI components to ensure a consistent and responsive design.
- **Service Layer**: A service layer is implemented to handle HTTP requests and encapsulate business logic, making the codebase cleaner and easier to manage.

### Application Structure

```plaintext
ClientApp/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── blog-form/
│   │   │   │   ├── blog-form.component.css
│   │   │   │   ├── blog-form.component.html
│   │   │   │   ├── blog-form.component.ts
│   │   │   ├── blog-list/
│   │   │   │   ├── blog-list.component.css
│   │   │   │   ├── blog-list.component.html
│   │   │   │   ├── blog-list.component.ts
│   │   ├── models/
│   │   │   ├── blog.model.ts
│   │   ├── services/
│   │   │   ├── blog.service.ts
│   │   ├── app.component.css
│   │   ├── app.component.html
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   ├── assets/
│   ├── environments/
│   ├── index.html
│   ├── main.ts
│   ├── styles.css
│   ├── polyfills.ts
├── .gitignore
├── angular.json
├── package.json
├── README.md
├── tsconfig.json
