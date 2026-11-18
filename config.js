// Paste your Supabase values here (Dashboard → Project Settings → API).
// The anon key is safe to put in a public site: the database only allows reading.
window.PORTFOLIO_CONFIG = {
  SUPABASE_URL: "",       // e.g. "https://abcdxyz.supabase.co"
  SUPABASE_ANON_KEY: "",  // the long "anon public" key

  name: "Jenric Digal",
  role: "AI Video Editor",
  tagline: "I turn AI-generated footage into finished ads, music videos and short films: prompted, cut, graded and timed to sound.",
  nickname: "Jen",
  email: "aisat.digal235321@gmail.com",
  phone: "0993 367 2236",   // shown publicly on the site; set to "" to hide it
  // The Tools section. Tools with the same "group" share a row. Remove any you don't use;
  // an empty list hides the section.
  tools: [
    { group: "Generate", name: "Higgsfield", use: "Still frames for each shot, then image-to-video clips." },
    { group: "Generate", name: "Google Flow", use: "Generating and extending video shots from prompts and frames." },
    { group: "Edit", name: "Adobe Premiere Pro", use: "The main edit: pacing, structure, sound and color." },
    { group: "Edit", name: "CapCut", use: "Quick vertical cuts and captions for social." },
    { group: "Design", name: "Adobe Photoshop", use: "Photo edits, thumbnails and cleaning up still frames." },
    { group: "Design", name: "Adobe Illustrator", use: "Logos, vector artwork and brand assets." },
    { group: "Design", name: "Canva", use: "Quick social graphics and layouts." },
  ],
  // Section names for the two styles (projects.style = 'realistic' or 'animated')
  styles: {
    realistic: "Realistic",
    animated: "Pixar-style 3D",
  },
  links: {
    // Replace with your exact profile link (e.g. "https://www.facebook.com/your.name") when you have it.
    Facebook: "https://www.facebook.com/search/top?q=Jen%20Digal",
    YouTube: "",
    Instagram: "",
    TikTok: "",
    LinkedIn: "",
  },
};
