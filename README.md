# Jihen Jabeur — Portfolio

React + Vite. Bilingual (EN/FR), light/dark theme, responsive, animated (framer-motion).

## Run locally
```bash
npm install
npm run dev
```

## Edit content
All text (EN + FR) is in `src/i18n/content.js`. Photo: `public/jihen.webp`. CV: `public/Jihen_Jabeur_CV.pdf`.

## Deploy on Vercel
Replace the old repo content with this folder, push to GitHub — Vercel rebuilds automatically.
Framework preset: **Vite** · Build command: `npm run build` · Output: `dist`.

## Contact form
Uses FormSubmit (free, no key). The FIRST message sent from the live site triggers an
activation email to jihenjabeur7@gmail.com — click **Activate Form** once. Check spam if missing.
After activation, FormSubmit gives a random string; you can replace the email in
`src/components/Contact.jsx` (ENDPOINT) with it so your address isn't visible in the code.
The old EmailJS variables in Vercel are no longer used and can be deleted.
