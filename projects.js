// Your portfolio videos, stored with the site in /videos.
// Used when Supabase isn't set up in config.js.
//
// One entry = one card. An ad with several hook versions has "variants";
// the player shows a button for each one. style: "realistic" or "animated".
// featured: true = plays at the top of the page.
window.PORTFOLIO_PROJECTS = [
  {
    style: "realistic", featured: true,
    title: "AI Video Explainer", category: "Explainer", year: 2026,
    description: "A presenter-led explainer in Filipino about making videos with AI, generated to look like a real studio shoot.",
    aspect_ratio: "9:16", duration: "1:12",
    video_url: "videos/cxa-01.mp4", thumbnail_url: "videos/cxa-01.jpg",
  },
  {
    style: "realistic",
    title: "Founder Story: We Tried", category: "UGC", client: "Jewelry brand", year: 2026,
    description: "A founder-style UGC ad for a jewelry brand, cut for vertical paid social. Three hook versions of the same story for testing.",
    aspect_ratio: "9:16",
    variants: [
      { label: "Hook 1", video_url: "videos/v41-hook-1.mp4", thumbnail_url: "videos/v41-hook-1.jpg", duration: "0:32" },
      { label: "Hook 2", video_url: "videos/v41-hook-2.mp4", thumbnail_url: "videos/v41-hook-2.jpg", duration: "0:32" },
      { label: "Hook 3", video_url: "videos/v41-hook-3.mp4", thumbnail_url: "videos/v41-hook-3.jpg", duration: "0:35" },
    ],
  },
  {
    style: "realistic",
    title: "Founder Story: Last Advice", category: "UGC", client: "Jewelry brand", year: 2026,
    description: "A shop-owner monologue in front of the storefront. Three different openings tested on the same body.",
    aspect_ratio: "9:16",
    variants: [
      { label: "Hook 1", video_url: "videos/v80-hook-1.mp4", thumbnail_url: "videos/v80-hook-1.jpg", duration: "0:32" },
      { label: "Hook 2", video_url: "videos/v80-hook-2.mp4", thumbnail_url: "videos/v80-hook-2.jpg", duration: "0:32" },
      { label: "Hook 3", video_url: "videos/v80-hook-3.mp4", thumbnail_url: "videos/v80-hook-3.jpg", duration: "0:31" },
    ],
  },
  {
    style: "realistic",
    title: "Founder Story: Long Cut", category: "UGC", client: "Jewelry brand", year: 2026,
    description: "A longer one-minute cut of the closing-shop story, with three different hooks.",
    aspect_ratio: "9:16",
    variants: [
      { label: "Hook 1", video_url: "videos/v87-hook-1.mp4", thumbnail_url: "videos/v87-hook-1.jpg", duration: "1:08" },
      { label: "Hook 2", video_url: "videos/v87-hook-2.mp4", thumbnail_url: "videos/v87-hook-2.jpg", duration: "1:05" },
      { label: "Hook 3", video_url: "videos/v87-hook-3.mp4", thumbnail_url: "videos/v87-hook-3.jpg", duration: "1:08" },
    ],
  },
  {
    style: "realistic",
    title: "Founder Story: 847", category: "UGC", client: "Jewelry brand", year: 2026,
    description: "A tight 23-second cut built around one product moment, in three hook versions.",
    aspect_ratio: "9:16",
    variants: [
      { label: "Hook 1", video_url: "videos/v92-hook-1.mp4", thumbnail_url: "videos/v92-hook-1.jpg", duration: "0:23" },
      { label: "Hook 2", video_url: "videos/v92-hook-2.mp4", thumbnail_url: "videos/v92-hook-2.jpg", duration: "0:23" },
      { label: "Hook 3", video_url: "videos/v92-hook-3.mp4", thumbnail_url: "videos/v92-hook-3.jpg", duration: "0:23" },
    ],
  },
  {
    style: "realistic",
    title: "Founder Story: Closing Sign", category: "UGC", client: "Jewelry brand", year: 2026,
    description: "The storefront version of the closing-shop concept, with three opening lines to test.",
    aspect_ratio: "9:16",
    variants: [
      { label: "Hook 1", video_url: "videos/v93-hook-1.mp4", thumbnail_url: "videos/v93-hook-1.jpg", duration: "0:26" },
      { label: "Hook 2", video_url: "videos/v93-hook-2.mp4", thumbnail_url: "videos/v93-hook-2.jpg", duration: "0:25" },
      { label: "Hook 3", video_url: "videos/v93-hook-3.mp4", thumbnail_url: "videos/v93-hook-3.jpg", duration: "0:25" },
    ],
  },
  {
    style: "animated",
    title: "The Late-Night Baker", category: "Commercial", year: 2026,
    description: "A 3D animated ad about a bakery owner still working at night, in a Pixar-style look.",
    aspect_ratio: "9:16", duration: "0:57",
    video_url: "videos/ad-1.mp4", thumbnail_url: "videos/ad-1.jpg",
  },
  {
    style: "animated",
    title: "3D Brand Explainer", category: "Explainer", year: 2026,
    description: "A 3D animated explainer in Filipino showing how a brand can use AI video.",
    aspect_ratio: "9:16", duration: "0:54",
    video_url: "videos/demo-3.mp4", thumbnail_url: "videos/demo-3.jpg",
  },
  {
    style: "animated",
    title: "Comic-Style Explainer", category: "Explainer", year: 2026,
    description: "An explainer in Filipino with a comic-book, halftone look.",
    aspect_ratio: "9:16", duration: "0:55",
    video_url: "videos/demo-2.mp4", thumbnail_url: "videos/demo-2.jpg",
  },
];
