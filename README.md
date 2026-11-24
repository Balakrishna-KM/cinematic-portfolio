# Cinematic Video Editor Portfolio
React + Vite + React Three Fiber + Drei + GSAP ScrollTrigger + Framer Motion + Lenis.

## Run
    npm install
     npm install        # local
    npm run build      # outputs /dist (deploy to Netlify, Vercel, Cloudflare Pages, any static host)

## Replace your content (one file): src/data/portfolio.js
- Name, intro, experience, skills, contact, socials: edit the text.
- Images/videos: copy files into `public/media/` and reference as `/media/yourfile.jpg` or `/media/reel.mp4`, or paste full URLs (YouTube pages will not work: use direct .mp4/.webm links).
- Showreel: `showreel.url` (video) and `showreel.thumbnail` (poster).
- Each project: `title`, `category`, `description`, `thumbnail`, `video` (hover preview + modal player). Add or remove projects freely.
- Contact form: set `contact.formEndpoint` (e.g. a Formspree URL) to post directly; otherwise it opens the visitor's email app.
- Empty fields show a labelled placeholder; no fake projects, clients, or awards are included.

## Performance
3D loads after first paint, is skipped on phones (<=768px) and with prefers-reduced-motion (CSS atmosphere remains), DPR is capped at 1.5, particles total ~130. Keep videos compressed (H.264, under ~10 MB for previews).
