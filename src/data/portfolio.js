// ============ EDIT EVERYTHING HERE ============
// Media: put files in /public (e.g. /public/media/me.jpg -> "/media/me.jpg") or use full URLs.
// Leave a value "" to show a clean placeholder. Nothing below is invented content.
export const portfolio = {
  name: 'Your Name',
  profileImage: '',                       // e.g. '/media/portrait.jpg'
  headline: ["I DON'T JUST EDIT.", 'I CREATE EXPERIENCES.'],
  tagline: 'Video Editor | Motion Designer | Visual Storyteller',
  showreel: { url: '', thumbnail: '' },   // mp4/webm URL + poster image
  about: {
    intro: 'Write your professional introduction here.',
    philosophy: 'Describe your creative philosophy here.',
    approach: 'Describe your editing approach here.',
    experience: [
      { role: 'Your role', place: 'Company / Freelance', period: 'Years', text: 'What you did.' },
    ],
  },
  projects: [
    { id: 1, category: 'Cinematic Editing', title: 'Project title', description: 'Project details.', thumbnail: '', video: '' },
    { id: 2, category: 'Commercial Advertisements', title: 'Project title', description: 'Project details.', thumbnail: '', video: '' },
    { id: 3, category: 'Instagram Reels', title: 'Project title', description: 'Project details.', thumbnail: '', video: '' },
    { id: 4, category: 'Promotional Videos', title: 'Project title', description: 'Project details.', thumbnail: '', video: '' },
    { id: 5, category: 'Motion Graphics', title: 'Project title', description: 'Project details.', thumbnail: '', video: '' },
    { id: 6, category: 'Creative Brand Films', title: 'Project title', description: 'Project details.', thumbnail: '', video: '' },
  ],
  skills: ['Adobe Premiere Pro','Adobe After Effects','Blender','Motion Graphics','Color Grading','Sound Design','Visual Storytelling','Cinematic Editing'],
  contact: {
    email: '',        // you@example.com
    whatsapp: '',     // international number, digits only: 919876543210
    instagram: '',    // https://instagram.com/yourhandle
    linkedin: '',     // https://linkedin.com/in/yourname
    formEndpoint: '', // optional: Formspree/other POST URL. Empty = opens the visitor's email app.
  },
}
