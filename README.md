# TaskFlow

A modern task and project management application built with **Vue 3, TypeScript, Pinia, Vue Router, Vite, and Sass**.

TaskFlow provides a simple workspace for managing projects and the tasks inside them, with authentication, project dashboards, task boards, reusable UI components, and a clean feature-oriented frontend architecture.

> **Note:** TaskFlow currently uses mock data and simulated asynchronous operations instead of a real backend. The architecture is intentionally structured so the mock implementations can later be replaced with real API calls.

---

## ✨ Features

### Authentication

* Login with demo accounts
* Three user roles:

  * Admin
  * Manager
  * Member
* Authentication state managed with Pinia
* Protected application routes
* Automatic redirection for unauthenticated users
* Redirect back to the originally requested page after login
* Logout support
* Loading and authentication error states

The current authentication implementation uses a mock user directory and simulates network latency rather than communicating with a backend.

### Dashboard

The dashboard provides an overview of the workspace:

* Total projects
* Active projects
* Total tasks
* Completed tasks
* Recently created projects
* Quick navigation to the complete project list

Dashboard data is derived from the Pinia project and task stores.

### Project Management

Projects can be:

* Viewed in a project list
* Created through an interactive form
* Opened through a dedicated project detail page
* Categorized by status
* Assigned to an owner
* Given a due date
* Displayed with a description

Current project statuses include:

```text
planning
active
on-hold
completed
```

### Task Management

Each project contains its own tasks.

Tasks support:

* Title
* Description
* Priority
* Assignee
* Status
* Creation date

Tasks are organized into three board columns:

```text
┌─────────────┐
│    To Do    │
├─────────────┤
│   Tasks     │
└─────────────┘

┌─────────────┐
│ In Progress │
├─────────────┤
│   Tasks     │
└─────────────┘

┌─────────────┐
│    Done     │
├─────────────┤
│   Tasks     │
└─────────────┘
```

Tasks can be created, deleted, and moved forward through the workflow.

The current task status flow is:

```text
todo → in-progress → done
```

### Reusable UI

The application is built from reusable components such as:

* Buttons
* Inputs
* Cards
* Badges
* Project cards
* Task cards
* Task columns
* Application header
* Application sidebar

For example, `ProjectCard` is responsible for presenting a project while `TaskColumn` and `TaskCard` handle the task-board UI.

---

## 🧱 Architecture

TaskFlow follows a frontend-oriented architecture where application state, views, reusable components, routing, and styling have separate responsibilities.

```text
src/
├── assets/
│   └── styles/
│
├── components/
│   ├── base/
│   ├── layout/
│   ├── projects/
│   └── tasks/
│
├── layouts/
│   └── DefaultLayout.vue
│
├── router/
│   └── index.ts
│
├── stores/
│   ├── auth.ts
│   ├── projects.ts
│   └── tasks.ts
│
├── types/
│   ├── auth.ts
│   ├── project.ts
│   ├── task.ts
│   └── user.ts
│
├── views/
│   ├── LoginView.vue
│   ├── DashboardView.vue
│   ├── ProjectsView.vue
│   ├── ProjectDetailView.vue
│   └── NotFoundView.vue
│
├── App.vue
└── main.ts
```

The project also contains `docs/commit-notes`, reflecting the repository's commit-oriented development/documentation structure.

---

## 🔄 Application Flow

The main application flow looks like this:

```text
                    ┌──────────────┐
                    │   Login      │
                    │     Page     │
                    └──────┬───────┘
                           │
                           │ login
                           ▼
                    ┌──────────────┐
                    │ Auth Store   │
                    └──────┬───────┘
                           │
                    authenticated
                           │
                           ▼
                 ┌───────────────────┐
                 │   DefaultLayout   │
                 │                   │
                 │ Header + Sidebar  │
                 └─────────┬─────────┘
                           │
              ┌────────────┼─────────────┐
              ▼            ▼             ▼
         Dashboard      Projects      Project
           View           View        Details
                                        │
                                        ▼
                                  Task Board
                                        │
                         ┌──────────────┼──────────────┐
                         ▼              ▼              ▼
                       To Do       In Progress       Done
```

The router defines the login route separately and places the dashboard, project list, and project-detail pages inside the authenticated default layout. A global navigation guard checks the authentication store before allowing access to protected routes.

---

## 🗂️ State Management

TaskFlow uses **Pinia** for centralized application state.

There are currently three primary stores.

### Auth Store

```text
stores/auth.ts
```

Responsible for:

* Current user
* Authentication status
* Login
* Logout
* Authentication loading state
* Authentication errors
* User initials

### Projects Store

```text
stores/projects.ts
```

Responsible for:

* Project collection
* Loading state
* Fetching projects
* Creating projects
* Finding projects by ID
* Filtering active projects

### Tasks Store

```text
stores/tasks.ts
```

Responsible for:

* Task collection
* Loading state
* Fetching tasks
* Creating tasks
* Removing tasks
* Moving tasks through their status workflow
* Filtering tasks by project
* Generating board columns
* Counting completed tasks

---

## 🧩 Data Model

TaskFlow currently models four primary concepts.

### User

```text
User
├── id
├── name
├── email
├── role
└── avatarColor
```

Available roles:

```text
admin
manager
member
```

### Project

```text
Project
├── id
├── name
├── description
├── status
├── ownerId
├── createdAt
└── dueDate
```

### Task

```text
Task
├── id
├── projectId
├── title
├── description
├── status
├── priority
├── assigneeId
└── createdAt
```

Task statuses:

```text
todo
in-progress
done
```

Task priorities:

```text
low
medium
high
```

---

## 🔐 Authentication

TaskFlow currently provides three demo accounts.

| Role    | Email                 | Password     |
| ------- | --------------------- | ------------ |
| Admin   | `admin@taskflow.io`   | `admin123`   |
| Manager | `manager@taskflow.io` | `manager123` |
| Member  | `member@taskflow.io`  | `member123`  |

These accounts are defined directly in the mock authentication store.

**These credentials are for demonstration only. They should not be used as a pattern for storing real production passwords.**

---

## 🧪 Testing

TaskFlow uses **Vitest** as its testing framework, with Vue Test Utils available for component testing.

The repository provides the following scripts:

```bash
npm run test
```

Runs Vitest in watch mode.

```bash
npm run test:run
```

Runs the test suite once.

```bash
npm run test:coverage
```

Runs the test suite with coverage reporting.

The project dependencies include Vitest, Vue Test Utils, `happy-dom`, `jsdom`, and V8 coverage support.

---

## 🎨 Styling

TaskFlow uses **Sass/SCSS** for styling.

Global styling is initialized from:

```text
src/assets/styles/main.scss
```

The global stylesheet provides:

* Design variables
* Sass mixins
* Reset styles
* Typography
* Colors
* Spacing
* Shared page utilities
* Shared form utilities
* Common layout helpers

Component-specific styles remain inside their Vue SFCs using scoped SCSS.

This keeps reusable global styles separate from component-specific presentation.

---

## 🛠️ Tech Stack

| Category          | Technology        |
| ----------------- | ----------------- |
| Framework         | Vue 3             |
| Language          | TypeScript        |
| Build Tool        | Vite              |
| State Management  | Pinia             |
| Routing           | Vue Router        |
| HTTP Client       | Axios             |
| Styling           | Sass / SCSS       |
| Testing           | Vitest            |
| Component Testing | Vue Test Utils    |
| DOM Environment   | happy-dom / jsdom |

The current `package.json` defines Vue 3, Pinia, Vue Router, Axios, Sass, TypeScript, Vite, Vitest, and Vue Test Utils as the primary project dependencies.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have:

* Node.js
* npm

installed on your machine.

### 1. Clone the repository

```bash
git clone https://github.com/hessiio/taskflow.git
cd taskflow
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Vite will start the development server and provide the local URL in the terminal.

### 4. Open the application

Open the URL provided by Vite, typically:

```text
http://localhost:5173
```

---

## 📦 Available Scripts

### Development

```bash
npm run dev
```

Starts the Vite development server.

### Production Build

```bash
npm run build
```

Runs TypeScript checking and creates a production Vite build.

### Preview

```bash
npm run preview
```

Previews the production build locally.

### Tests

```bash
npm run test
```

```bash
npm run test:run
```

```bash
npm run test:coverage
```

These scripts are defined in the project's package configuration.

---

## 📱 Main Routes

TaskFlow currently exposes the following application routes:

| Route           | Purpose                        | Authentication |
| --------------- | ------------------------------ | -------------- |
| `/login`        | User login                     | Public         |
| `/`             | Dashboard                      | Required       |
| `/projects`     | Project list and creation      | Required       |
| `/projects/:id` | Project details and task board | Required       |
| `/*`            | Not-found page                 | Public         |

The router uses Vue Router's `meta.requiresAuth` field and a global `beforeEach` guard to protect authenticated pages.

---

## 🧠 Design Principles

TaskFlow is structured around several frontend development principles.

### Feature-oriented organization

Code is grouped according to its responsibility rather than putting every component, store, and view into unrelated global folders.

For example:

```text
components/
├── projects/
└── tasks/

stores/
├── projects.ts
└── tasks.ts
```

This makes it easier to understand which parts of the application belong to a particular feature.

### Centralized state

Application-level state lives in Pinia stores rather than being duplicated across views.

Views consume the stores and focus primarily on presentation and user interaction.

### Reusable components

Common UI elements are extracted into reusable components.

For example:

```text
AppButton
AppInput
AppCard
AppBadge
```

Feature-specific components then compose these primitives into larger interfaces.

### Typed application state

Users, projects, tasks, statuses, priorities, and form inputs are represented with TypeScript types.

This gives the different parts of the application a shared understanding of the data they exchange.

---

## 🔌 Current Backend Status

TaskFlow currently **does not require a backend or database**.

Instead, the application uses mock data directly inside the Pinia stores and simulates asynchronous operations using delays.

For example, project loading currently behaves conceptually like:

```text
View
 │
 ▼
Projects Store
 │
 ▼
Mock Data
 │
 ▼
Store State
 │
 ▼
Vue UI
```

The authentication store even documents that its simulated login can later be replaced with a real API request such as an Axios call.

This makes the project useful as a **frontend architecture and learning project** without requiring a server or database to run it.

---

## 🔮 Possible Future Improvements

The current architecture leaves room for several natural extensions:

* Replace mock authentication with a real API
* Persist authentication state
* Add a backend API
* Persist projects and tasks in a database
* Add project editing and deletion
* Add task editing
* Add task descriptions and due dates
* Add task assignees
* Add drag-and-drop Kanban interactions
* Add filtering and searching
* Add role-based permissions
* Add project members
* Add activity history
* Add notifications
* Add responsive mobile navigation
* Add persistent user preferences

These are potential extensions rather than features currently implemented in the repository.

---

## 📁 Project Structure

```text
taskflow/
│
├── docs/
│   └── commit-notes/
│
├── public/
│
├── src/
│   ├── assets/
│   │   └── styles/
│   │
│   ├── components/
│   │   ├── base/
│   │   ├── layout/
│   │   ├── projects/
│   │   └── tasks/
│   │
│   ├── layouts/
│   │   └── DefaultLayout.vue
│   │
│   ├── router/
│   │   └── index.ts
│   │
│   ├── stores/
│   │   ├── auth.ts
│   │   ├── projects.ts
│   │   └── tasks.ts
│   │
│   ├── types/
│   │   ├── auth.ts
│   │   ├── project.ts
│   │   ├── task.ts
│   │   └── user.ts
│   │
│   ├── views/
│   │   ├── DashboardView.vue
│   │   ├── LoginView.vue
│   │   ├── ProjectDetailView.vue
│   │   ├── ProjectsView.vue
│   │   └── NotFoundView.vue
│   │
│   ├── App.vue
│   └── main.ts
│
├── .gitignore
├── README.md
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── vitest.config.ts
└── vitest.setup.ts
```

The repository currently contains the Vue application under `src`, static assets under `public`, and commit documentation under `docs/commit-notes`.

---

## 📌 Project Status

TaskFlow is currently a **frontend task-management application in active development**.

The current implementation establishes the core application architecture:

```text
Authentication
      ↓
Protected Router
      ↓
Application Layout
      ↓
Dashboard
      ↓
Projects
      ↓
Project Details
      ↓
Task Board
```

The project is intentionally lightweight at this stage, using mock data while establishing the Vue architecture, state management, routing, reusable components, and core task/project workflows.

---

## 📄 License

No license has currently been specified in the repository.
