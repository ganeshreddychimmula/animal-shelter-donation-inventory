# Donation Inventory Manager

A simple and elegant web application built with React to track and manage various types of donations. The app provides a clean interface for viewing, adding, editing, and deleting donation records.

## Screenshots

| Main Dashboard View | Add/Edit Donation Modal |
| :---: | :---: |
| ![Donation Inventory Dashboard](assets/ss/dashboard.jpg) | ![Add New Donation Modal](assets/ss/modal.jpg) |

| Responsive Layout Handling | Filtered View |
| :---: | :---: |
| ![Responsive layout handling different content heights](assets/ss/layout-debug.jpg) | ![Filtered View](assets/ss/filtered-view.jpg) |

| Form Validation Error | Empty State |
| :---: | :---: |
| ![Form with validation error](assets/ss/form-validation.jpg) | ![Empty state for filtered list](assets/ss/empty-state.jpg) |

**Mobile Responsive View**
![Mobile responsive layout](assets/ss/mobile-view.jpg)


## Features

-   **CRUD Operations:** Full capabilities to Create, Read, Update, and Delete donation entries.
-   **Modal Form:** A reusable modal component for adding and editing donations without leaving the main page.
-   **Dynamic Filtering:** Filter the displayed donations by type (e.g., Money, Food, Clothing).
-   **Responsive Design:** Built with a modern, custom CSS layout system that ensures the application looks great on all screen sizes.
-   **Component-Based Architecture:** Logically structured with reusable React components for maintainability.

## Tech Stack

-   **React:** A JavaScript library for building user interfaces.
-   **Modern CSS:** Custom CSS properties (variables), fluid typography/spacing with `clamp()`, and a logical layout system (inspired by Every Layout). No external CSS frameworks are used.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) (which includes npm) installed on your machine.

### Installation

1.  **Clone the repository** to your local machine:
    ```sh
    git clone [https://your-repository-url.com](https://your-repository-url.com)
    ```
2.  **Navigate into the project directory:**
    ```sh
    cd donation-inventory-manager
    ```
3.  **Install the required dependencies:**
    ```sh
    npm install
    ```

### Running the Application

1.  **Start the development server:**
    ```sh
    npm run dev
    ```
2.  Open your browser and navigate to `http://localhost:5173` to see the application running.

## Project Structure

The project follows a standard React application structure, with a clear separation of concerns.

/src|-- /assets|   |-- /css|   |   |-- block.css      # Styles for specific components (BEM-like blocks)|   |   |-- global.css     # Global styles, resets, and CSS variables|   |   |-- layouts.css    # Reusable layout primitives (Stack, Box, Cluster)|   |   |-- utilities.css  # Simple utility classes (e.g., text-align)|   |-- /ss|   |   |-- dashboard.jpg      # Screenshot of the main view|   |   |-- modal.jpg          # Screenshot of the modal form|   |   |-- layout-debug.jpg   # Screenshot showing layout debugging|   |   |-- filtered-view.jpg  # Screenshot of a filtered list|   |   |-- empty-state.jpg    # Screenshot of an empty state|   |   |-- form-validation.jpg# Screenshot of form validation|   |   |-- mobile-view.jpg    # Screenshot of mobile layout|   |-- data.js              # Mock data and application constants||-- /components|   |-- DonationForm.jsx     # The form for adding/editing donations|   |-- Header.jsx           # The main application header|   |-- Modal.jsx            # The reusable modal component||-- App.jsx                  # Main application component, handles state and logic|-- index.jsx                # Entry point of the React application
### Key Components

-   **`App.jsx`**: The core component that manages the application's state, including the list of donations, filter settings, and modal visibility. It passes data and functions down to child components.
-   **`DonationForm.jsx`**: A controlled form component that can be used for both creating a new donation and editing an existing one. It receives an `initialData` prop to populate fields for editing.
-   **`Modal.jsx`**: A generic modal component that overlays the screen. It can be closed by clicking the background overlay, the close button, or by pressing the `Escape` key.

### CSS Methodology

The project uses a powerful, custom CSS system that avoids the need for large frameworks.

-   **`global.css`**: This is the foundation. It defines design tokens (colors, fonts, spacing) as CSS custom properties (`--primary-color`, `--s1`, etc.) and sets global styles.
-   **`layouts.css`**: Contains reusable, low-level layout primitives like:
    -   `.l-stack`: For creating vertical rhythm between elements.
    -   `.l-cluster`: For grouping items that wrap, like buttons.
    -   `.l-box`: For creating padded containers.
    -   `.l-grid`: For responsive grid layouts.
-   **`block.css`**: Contains styles for specific, reusable components (e.g., `.b-button`, `.b-donation-form`). This is similar to the "Block" in BEM methodology.

This structure makes the styling highly modular, consistent, and easy to maintain.
