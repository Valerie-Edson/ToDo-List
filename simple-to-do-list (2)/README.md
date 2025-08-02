# Simple To-Do List

A clean, simple, and effective to-do list application to help you manage your tasks. This project is built with modern web technologies and is designed to run directly in the browser without a build step.

![A preview of the to-do list application showing a few tasks, with a dark theme and clean interface.](https://via.placeholder.com/800x400.png?text=Simple+To-Do+List+App)
*(Image placeholder: A screenshot of the application)*

---

## ✨ Features

*   **Add & Manage Tasks:** Quickly add, edit, and delete your to-do items.
*   **Mark as Complete:** Toggle tasks between active and completed states.
*   **Persistent Storage:** Your to-do list is automatically saved to your browser's local storage, so your tasks are there when you return.
*   **Task Filtering:** View all tasks, or filter by 'Active' or 'Completed'.
*   **Clear Completed:** A simple button to clear all finished tasks from your list.
*   **Responsive Design:** Looks and works great on both desktop and mobile devices.
*   **No Build Step:** Runs directly in modern browsers using ES Modules.

---

## 🚀 Getting Started

This application is designed to be extremely easy to run. Since it doesn't require a complex build process, you can run it with any simple local web server.

### Prerequisites

You need a web server to serve the files correctly due to browser security policies for ES Modules.

### Running Locally

1.  **Clone the repository (or download the files):**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Start a simple web server.** Here are two easy options:

    *   **Using Node.js (`serve` package):**
      If you have Node.js installed, you can use the `serve` package.
      ```bash
      # Install serve globally if you haven't already
      npm install -g serve

      # Run the server from the project's root directory
      serve .
      ```

    *   **Using Python:**
      If you have Python installed, you can use its built-in HTTP server.
      ```bash
      # For Python 3
      python -m http.server

      # For Python 2
      python -m SimpleHTTPServer
      ```

3.  **Open in your browser:**
    Navigate to the URL provided by your server (usually `http://localhost:3000` or `http://localhost:8000`).

---

## 🛠️ Tech Stack

*   **Frontend:** [React 18](https://react.dev/) (via [esm.sh](https://esm.sh/))
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) (via CDN)
*   **Hosting:** Runs on any static file server (e.g., Vercel, Netlify, GitHub Pages, Nginx, Apache).

### A Note on Server Configuration

If you deploy to a traditional web server like Nginx or Apache, you may need to add a MIME type for `.tsx` files to ensure they are served as JavaScript.

*   **For Nginx**, add this to your config: `types { application/javascript tsx; }`
*   **For Apache**, add this to an `.htaccess` file: `AddType application/javascript .tsx`

---

## 📁 File Structure

```
.
├── components/           # Reusable React components
│   ├── Header.tsx
│   ├── Icons.tsx
│   ├── TodoFilter.tsx
│   ├── TodoInput.tsx
│   ├── TodoItem.tsx
│   └── TodoList.tsx
├── hooks/                # Custom React hooks
│   └── useLocalStorage.ts
├── services/             # (This should be removed as it's not used)
│   └── geminiService.ts
├── App.tsx               # Main application component
├── index.html            # HTML entry point with importmap
├── index.tsx             # React root renderer
├── metadata.json         # App metadata
├── README.md             # Project documentation (this file)
└── types.ts              # TypeScript type definitions
```

---

## 📄 License

This project is open-source and available under the **MIT License**.
