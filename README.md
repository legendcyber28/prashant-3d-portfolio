# Prashant Katheriya | interactive 3D portfolio

Live portfolio: https://legendcyber28.github.io/prashant-3d-portfolio/
Career dashboard: https://legendcyber28.github.io/prashant-career-dashboard/

A React and Three.js portfolio with a cyclist riding a continuous loop. The visitor can pause at chapter stops, change between three themes, turn on dark mode, and optionally save a first-name greeting on their own device. The welcome audio starts only after a tap. Five common names have recorded AI-voice greetings; other names receive a general spoken greeting while their entered name stays on screen. The sound control also enables a simple ambient soundscape. A third-party counter displays page visits.

## Edit and build

The editable source is in `src/`, with the Vite HTML entry in `source/index.html`. The `audio/` folder contains the licensed AI-generated voice segments as JavaScript data modules. The Three.js runtime is bundled by Vite from the npm dependency and follows the Three.js MIT license. The supplied illustration is stylized, not a scan or exact likeness of the owner.

1. Install Node.js 20 or newer.
2. Run `npm install`.
3. Run `npm run dev` for the local preview.
4. Run `npm run build` to create `dist/index.html` and `dist/assets/`.

The published root currently uses a separately prepared Pages build (`index.html`, `portfolio.js`, `assets/assets/index-DemCRcjD.css`, and `audio/`). Editing the TypeScript source does **not** update the live page automatically. To publish a source change, rebuild, upload the new `dist/index.html` and its entire `dist/assets/` folder, and point Pages to that build. Test the page on desktop and mobile after each deployment. Do not replace the published root `index.html` with the Vite source template.

Project, experience, and contact text should be reviewed before a job application. The visitor counter depends on https://page-views-api.ratneshc.com/ and may be unavailable if its service is down.
