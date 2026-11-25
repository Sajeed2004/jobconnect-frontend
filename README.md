# JobConnect – Frontend Demo

A responsive job portal frontend built with React, Vite, React Router, and CSS.

## Features
- Landing page and featured jobs
- Job search by title, company, skill, and location
- Category and job-type filters
- Job details pages
- Save jobs
- Apply for jobs (demo state only)
- Candidate dashboard with applications and saved jobs
- Login and registration demo forms
- Responsive desktop and mobile layout

## Requirements
- Node.js 18 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Build

```bash
npm run build
npm run preview
```

The production site is generated in the `dist` folder.

## Deploy to Vercel
1. Push this folder to a GitHub repository.
2. Import the repository in Vercel.
3. Framework preset: Vite.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Deploy.

## Deploy to GitHub Pages
For a simple GitHub Pages deployment, install `gh-pages`:

```bash
npm install --save-dev gh-pages
```

Add these fields to `package.json` (replace `YOUR_REPO_NAME`):

```json
"homepage": "https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO_NAME",
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

In `vite.config.js`, set `base` to `"/YOUR_REPO_NAME/"` instead of `"./"`.
Then run:

```bash
npm run deploy
```

Enable GitHub Pages from repository Settings → Pages if required.

## Demo note
This is a frontend-only demonstration. Job listings are sample data. Login, registration, saving, and applying are client-side demo interactions; there is no real authentication, backend, or persistent database.
