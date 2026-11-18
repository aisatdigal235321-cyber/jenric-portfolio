(function () {
  const cfg = window.PORTFOLIO_CONFIG || {};
  const $ = (id) => document.getElementById(id);

  // Shown until Supabase is connected, so the layout can be previewed.
  const EXAMPLES = [
    { style: "realistic", title: "Night Market Spec Ad", category: "Commercial", client: "Example project", description: "A 30-second spec ad built from AI stills animated into clips, then cut to music and color graded.", tools: ["Higgsfield", "Premiere Pro"], duration: "0:30", aspect_ratio: "16:9", year: 2026, featured: true },
    { style: "realistic", title: "Skincare UGC Set", category: "UGC", client: "Example project", description: "Three vertical UGC-style videos with a consistent AI presenter across every shot.", tools: ["Higgsfield", "CapCut"], duration: "0:15", aspect_ratio: "9:16", year: 2026 },
    { style: "realistic", title: "Neon Rain Music Video", category: "Music Video", client: "Example project", description: "Beat-synced visuals for an indie track, with stylized city scenes and rain transitions.", tools: ["Higgsfield", "After Effects"], duration: "2:48", aspect_ratio: "16:9", year: 2026 },
    { style: "animated", title: "The Last Lantern", category: "Short Film", client: "Example project", description: "A 90-second animated story told in 14 shots, with the same characters and lighting across scenes.", tools: ["Higgsfield", "DaVinci Resolve"], duration: "1:32", aspect_ratio: "16:9", year: 2026 },
    { style: "animated", title: "Pip's Big Breakfast", category: "Commercial", client: "Example project", description: "A cereal spec ad starring a small 3D robot mascot, with squash-and-stretch timing and bright lighting.", tools: ["Higgsfield", "Premiere Pro"], duration: "0:30", aspect_ratio: "16:9", year: 2026 },
    { style: "animated", title: "Sky Whale Lullaby", category: "Music Video", client: "Example project", description: "A soft 3D animated music video following a whale drifting over a sleeping town.", tools: ["Higgsfield", "After Effects"], duration: "2:10", aspect_ratio: "9:16", year: 2026 },
  ];
  const STYLE_LABELS = { realistic: "Realistic", animated: "Pixar-style 3D", ...(cfg.styles || {}) };
  const styleOf = (p) => (p.style === "animated" ? "animated" : "realistic");
  const PH = [["#f6c9d4", "#e4dcf0"], ["#fbd9c9", "#d6e5ef"], ["#f3c2cf", "#efe3cc"], ["#e7d3ef", "#f8d0da"]];

  // ---- Sakura petals falling from the branch, over the whole page ----
  (function petals() {
    const box = $("petals");
    const branch = document.querySelector(".branch");
    if (!box || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = branch ? branch.getBoundingClientRect() : { left: innerWidth * 0.6, top: 60, width: innerWidth * 0.4, height: 200 };
    const rand = (a, b) => a + Math.random() * (b - a);
    for (let i = 0; i < 18; i++) {
      const s = document.createElement("span");
      const size = rand(10, 20);
      // start somewhere under the blossoms (the lower-left two thirds of the branch)
      const x = rand(r.left + r.width * 0.05, r.left + r.width * 0.9);
      const y = rand(r.top + r.height * 0.15, r.top + r.height * 0.7);
      const dur = rand(11, 20);
      s.style.cssText = `left:${x.toFixed(0)}px;top:${y.toFixed(0)}px;width:${size.toFixed(1)}px;height:${(size * 0.8).toFixed(1)}px;` +
        `--dx:${(-rand(10, 55)).toFixed(0)}vw;--dur:${dur.toFixed(1)}s;--delay:-${rand(0, dur).toFixed(1)}s;` +
        `--sway:${rand(3, 6).toFixed(1)}s;--o:${rand(0.75, 1).toFixed(2)}`;
      box.appendChild(s);
    }
  })();

  let projects = [];
  const activeCat = { realistic: "All", animated: "All" };
  document.querySelectorAll("[data-style-label]").forEach((el) => (el.textContent = STYLE_LABELS[el.dataset.styleLabel]));

  // ---- Static text from config ----
  if (cfg.name) { $("name").textContent = cfg.name; $("footName").textContent = cfg.name; document.title = cfg.name + " · " + (cfg.role || "Portfolio"); }
  if (cfg.role) $("role").textContent = cfg.role;
  $("tagline").textContent = cfg.tagline || "";
  $("brand").textContent = (cfg.name || "JD").split(" ").map((w) => w[0]).join("").slice(0, 3);
  $("year").textContent = new Date().getFullYear();
  $("emailText").textContent = cfg.email || "";
  $("emailText").href = $("mailBtn").href = "mailto:" + (cfg.email || "");
  $("brandName").textContent = cfg.name || "Jenric Digal";
  if (cfg.nickname) $("nickname").textContent = cfg.nickname;
  if (cfg.phone) { const ph = $("phoneText"); ph.textContent = cfg.phone; ph.href = "tel:" + cfg.phone.replace(/[^\d+]/g, ""); ph.hidden = false; }

  // ---- Tools section, grouped by step ----
  const toolList = (cfg.tools || []).map((t) => (typeof t === "string" ? { name: t } : t)).filter((t) => t && t.name);
  const groupOf = (t) => t.group || "Tools";
  const groups = [...new Set(toolList.map(groupOf))];
  $("toolGroups").innerHTML = groups.map((g) => `
    <div class="tool-group">
      <h3>${esc(g)}</h3>
      <ul class="tool-items">${toolList.filter((t) => groupOf(t) === g).map((t) => `<li><strong>${esc(t.name)}</strong>${t.use ? `<span>${esc(t.use)}</span>` : ""}</li>`).join("")}</ul>
    </div>`).join("");
  if (!toolList.length) { $("tools").hidden = true; document.querySelector('.nav a[href="#tools"]').hidden = true; }

  // ---- Phone menu ----
  const topbar = document.querySelector(".topbar");
  const menuBtn = $("menuBtn");
  function setMenu(open) {
    topbar.classList.toggle("menu-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  menuBtn.addEventListener("click", () => setMenu(!topbar.classList.contains("menu-open")));
  $("nav").addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
  document.addEventListener("click", (e) => { if (!topbar.contains(e.target)) setMenu(false); });

  $("copyEmail").addEventListener("click", async () => {
    const btn = $("copyEmail");
    try { await navigator.clipboard.writeText(cfg.email || ""); btn.textContent = "Copied"; }
    catch { btn.textContent = "Select the email to copy"; }
    setTimeout(() => (btn.textContent = "Copy email"), 1800);
  });

  const linkList = $("links");
  Object.entries(cfg.links || {}).forEach(([label, url]) => {
    if (!url) return;
    const li = document.createElement("li");
    li.innerHTML = `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(label)}</a>`;
    linkList.appendChild(li);
  });

  // ---- Helpers ----
  function esc(s) { return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
  function placeholder(i, label) {
    const [a, b] = PH[i % PH.length];
    return `<div class="placeholder" style="--ph-a:${a};--ph-b:${b}"><span>${esc(label)}</span></div>`;
  }
  function meta(p) { return [p.category, p.client, p.year].filter(Boolean).join(" · "); }

  // ---- Data ----
  async function load() {
    const ready = cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY && window.supabase;
    const local = Array.isArray(window.PORTFOLIO_PROJECTS) ? window.PORTFOLIO_PROJECTS : [];
    if (!ready && local.length) return local.map(normalize);
    if (!ready) {
      showNotice("Showing example projects. Add your Supabase URL and key in config.js to load your real videos.");
      return EXAMPLES;
    }
    try {
      const client = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
      const { data, error } = await client
        .from("projects")
        .select("*")
        .order("featured", { ascending: false })
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      if (error) throw error;
      if (!data.length) { showNotice("No projects yet. Add rows to the projects table in Supabase."); return []; }
      return data;
    } catch (e) {
      console.error(e);
      showNotice("Couldn't load projects from Supabase. Check the URL and anon key in config.js, and that schema.sql was run.");
      return EXAMPLES;
    }
  }
  // A project with hook versions takes its card video/thumbnail/length from the first version.
  function normalize(p) {
    const first = (p.variants || [])[0];
    return first ? { ...p, video_url: p.video_url || first.video_url, thumbnail_url: p.thumbnail_url || first.thumbnail_url, duration: p.duration || first.duration } : p;
  }
  function showNotice(msg) { const n = $("notice"); n.textContent = msg; n.hidden = false; }

  // ---- Hero ----
  function renderHero() {
    const p = projects.find((x) => x.featured) || projects[0];
    const media = $("heroMedia");
    if (!p) { media.innerHTML = placeholder(0, "Your featured reel"); return; }
    $("heroCaption").textContent = "Featured · " + p.title;
    document.querySelector(".frame").classList.toggle("vertical", p.aspect_ratio === "9:16");
    if (p.video_url) {
      media.innerHTML = `<video src="${esc(p.video_url)}" ${p.thumbnail_url ? `poster="${esc(p.thumbnail_url)}"` : ""} muted loop playsinline autoplay preload="auto"></video>`;
      const v = media.querySelector("video");
      v.addEventListener("timeupdate", () => ($("heroTc").textContent = timecode(v.currentTime)));
    } else {
      media.innerHTML = placeholder(0, "Featured reel goes here");
      tickFakeTc();
    }
    $("heroReel").style.cursor = "pointer";
    $("heroReel").onclick = () => openPlayer(p, 0);
  }
  function timecode(t, fps = 30) {
    const f = Math.floor((t % 1) * fps), s = Math.floor(t) % 60, m = Math.floor(t / 60) % 60, h = Math.floor(t / 3600);
    return [h, m, s, f].map((n) => String(n).padStart(2, "0")).join(":");
  }
  function tickFakeTc() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = performance.now();
    const loop = (now) => { $("heroTc").textContent = timecode((now - start) / 1000); requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
  }

  // ---- Style sections (Realistic / Pixar-style 3D), each with its own filters + grid ----
  function renderSection(key) {
    const sec = document.querySelector(`.work[data-style="${key}"]`);
    const inStyle = projects.filter((p) => styleOf(p) === key);
    const cats = ["All", ...new Set(inStyle.map((p) => p.category).filter(Boolean))];
    if (!cats.includes(activeCat[key])) activeCat[key] = "All";

    sec.querySelector(".count").textContent = inStyle.length + (inStyle.length === 1 ? " project" : " projects");
    const filters = sec.querySelector(".filters");
    filters.innerHTML = cats.length > 2
      ? cats.map((c) => `<button class="chip" role="tab" type="button" aria-selected="${c === activeCat[key]}" data-cat="${esc(c)}">${esc(c)}</button>`).join("")
      : "";
    filters.querySelectorAll(".chip").forEach((b) => b.addEventListener("click", () => { activeCat[key] = b.dataset.cat; renderSection(key); }));

    const list = inStyle.filter((p) => activeCat[key] === "All" || p.category === activeCat[key]);
    const grid = sec.querySelector(".grid");
    if (!list.length) { grid.innerHTML = `<p class="empty">No ${esc(STYLE_LABELS[key])} projects yet.</p>`; return; }
    grid.innerHTML = "";
    grid.classList.toggle("portrait", list.every((p) => p.aspect_ratio === "9:16"));
    list.forEach((p) => {
      const idx = projects.indexOf(p);
      const vertical = p.aspect_ratio === "9:16";
      const card = document.createElement("button");
      card.type = "button";
      card.className = "card";
      card.setAttribute("aria-label", "Play " + p.title);
      card.innerHTML = `
        <div class="thumb ${vertical ? "vertical" : ""}">
          ${p.thumbnail_url ? `<img src="${esc(p.thumbnail_url)}" alt="" loading="lazy">` : placeholder(idx, p.video_url ? p.category : "Example")}
          ${p.video_url ? `<video src="${esc(p.video_url)}" muted loop playsinline preload="none"></video>` : ""}
          ${p.aspect_ratio ? `<span class="ratio">${esc(p.aspect_ratio)}</span>` : ""}
          ${p.duration ? `<span class="badge">${esc(p.duration)}</span>` : ""}
          ${(p.variants || []).length > 1 ? `<span class="hooks">${p.variants.length} hooks</span>` : ""}
        </div>
        <div>
          <p class="mono card-meta">${esc(meta(p))}</p>
          <h3>${esc(p.title)}</h3>
        </div>`;
      const v = card.querySelector("video");
      if (v) {
        card.addEventListener("mouseenter", () => { v.preload = "auto"; v.play().then(() => v.classList.add("ready")).catch(() => {}); });
        card.addEventListener("mouseleave", () => { v.pause(); v.classList.remove("ready"); });
      }
      card.addEventListener("click", () => openPlayer(p, idx));
      grid.appendChild(card);
    });
  }

  // ---- Player ----
  const dlg = $("player");
  function openPlayer(p, idx) {
    const variants = p.variants && p.variants.length ? p.variants : [p];
    dlg.classList.toggle("vertical", p.aspect_ratio === "9:16");
    $("playerTitle").textContent = p.title;
    $("playerDesc").textContent = p.description || "";
    $("playerTools").innerHTML = (p.tools || []).map((t) => `<li>${esc(t)}</li>`).join("");

    function show(i) {
      const v = variants[i];
      $("playerMeta").textContent = [STYLE_LABELS[styleOf(p)], meta(p), v.duration || p.duration].filter(Boolean).join(" · ");
      $("playerMedia").innerHTML = v.video_url
        ? `<video src="${esc(v.video_url)}" ${v.thumbnail_url ? `poster="${esc(v.thumbnail_url)}"` : ""} controls autoplay playsinline></video>`
        : placeholder(idx, "Example: your video plays here");
      $("playerVariants").querySelectorAll("button").forEach((b, j) => b.setAttribute("aria-selected", String(j === i)));
    }
    $("playerVariants").innerHTML = variants.length > 1
      ? variants.map((v, i) => `<button class="chip" role="tab" type="button" aria-selected="false">${esc(v.label || "Version " + (i + 1))}</button>`).join("")
      : "";
    $("playerVariants").querySelectorAll("button").forEach((b, i) => b.addEventListener("click", () => show(i)));
    show(0);
    if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
  }
  function closePlayer() { $("playerMedia").innerHTML = ""; dlg.close ? dlg.close() : dlg.removeAttribute("open"); }
  $("closePlayer").addEventListener("click", closePlayer);
  dlg.addEventListener("click", (e) => { if (e.target === dlg) closePlayer(); });
  dlg.addEventListener("close", () => ($("playerMedia").innerHTML = ""));

  // ---- Go ----
  load().then((data) => { projects = data; renderHero(); renderSection("realistic"); renderSection("animated"); });
})();
