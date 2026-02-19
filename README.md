# Vehicle Booking System Frontend

A modern Vehicle Booking System built with React, TypeScript, and Vite.

## Frontend Setup

### 1. Clone the Frontend Repository

```bash
git clone <frontend-repo-url>
cd <frontend-project-folder>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is already in use).

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production bundle
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## Tech Stack

- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Formik** - Form management
- **Yup** - Schema validation

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_URL="http://localhost:5001/api/v1"
```
