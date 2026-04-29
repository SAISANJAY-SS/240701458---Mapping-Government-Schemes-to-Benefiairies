// =========================================
// SCHEME FINDER — app.js
// Module 7: Added scheme detail page click handler
// =========================================

let db = null;

// -----------------------------------------
// RENDER SCHEME CARDS
// -----------------------------------------
async function renderSchemes(schemes, query) {
  const grid = document.getElementById("schemes-grid");
  const countEl = document.getElementById("result-count");
  const title = document.querySelector(".schemes-title");
  
  const lang = getCurrentLanguage();
  const plural = schemes.length !== 1 ? (lang === "ta" ? "" : "s") : "";
  
  countEl.textContent = t("showingSchemes")
    .replace("{count}", schemes.length)
    .replace("{s}", plural);
  
  title.textContent = schemes.length === 0 ? t("noSchemesTitle") : t("matchingSchemesTitle");

  if (schemes.length === 0) {
    grid.innerHTML = `<div class="no-results">
      <p>🔎</p>
      <p style="font-size:18px;font-weight:600;color:#444;">${t("noResultsText")}</p>
      <p style="margin-top:6px;font-size:14px;">${t("noResultsSuggestion")}</p>
      <div class="suggestion-list">
        ${["Health","Education","Farmer","Women","Student","Disability","Minority","Housing"]
          .map(s=>`<button class="suggestion-chip" onclick="quickSearch('${s}')">${s}</button>`).join("")}
      </div>
    </div>`;
    return;
  }

  // Get saved IDs if user is logged in
  const user = getSession();
  let savedIds = [];
  if (user && db) savedIds = await getSavedSchemeIds(db, user.email);

  const q = (query || "").toLowerCase().trim();

  grid.innerHTML = schemes.map(s => {
    const isSaved = savedIds.includes(s.id);
    const titleHL = q ? highlight(s.title, q) : s.title;
    const descHL = q ? highlight(s.description, q) : s.description;

    return `
    <div class="scheme-card" data-id="${s.id}" onclick="showSchemeDetail(${s.id})">
      <div class="card-header">
        <span class="card-icon">${s.icon}</span>
        <div style="flex:1;">
          <div class="card-title">${titleHL}</div>
          <div class="card-ministry">${s.ministry}</div>
        </div>
        <button
          class="save-btn ${isSaved ? "saved" : ""}"
          data-id="${s.id}"
          title="${isSaved ? t("btnRemove") : "Save Scheme"}"
          onclick="event.stopPropagation(); toggleSaveScheme(${s.id}, this)">
          ${isSaved ? "❤️" : "🤍"}
        </button>
      </div>
      <p class="card-description">${descHL}</p>
      <div class="card-tags">
        ${s.tags.map(tag=>`<span class="tag tag-category">${tag}</span>`).join("")}
        ${s.minority    ? `<span class="tag" style="background:#fde8ff;color:#6b0e7a;">${t("checkMinority")}</span>`   : ""}
        ${s.disability  ? `<span class="tag" style="background:#e8f5e9;color:#1b5e20;">${t("checkDisability")}</span>` : ""}
        ${s.studentOnly ? `<span class="tag" style="background:#fff3e0;color:#e65100;">${t("checkStudent")}</span>`    : ""}
        ${s.area && s.area!=="both" ? `<span class="tag" style="background:#f0f4ff;color:#3a3a8a;">${s.area==="urban"? t("areaUrban") : t("areaRural")}</span>` : ""}
      </div>
      <div class="card-footer">
        <span class="card-benefit">💰 ${s.benefit}</span>
        <button class="btn-apply" onclick="event.stopPropagation(); window.open('${s.link}','_blank')">${t("btnApply")}</button>
      </div>
    </div>`;
  }).join("");
}

// Expose for auth.js to call after login/logout
window._refreshCards = () => runSearch();

// -----------------------------------------
// HIGHLIGHT
// -----------------------------------------
function highlight(text, query) {
  if (!query) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text.replace(new RegExp(`(${escaped})`, "gi"), "<mark>$1</mark>");
}

// -----------------------------------------
// FILTERS
// -----------------------------------------
function getFilters() {
  return {
    category: document.getElementById("filter-category").value,
    state: document.getElementById("filter-state").value,
    gender: document.getElementById("filter-gender").value,
    ageGroup: document.getElementById("filter-age").value,
    area: document.getElementById("filter-area").value,
    minority: document.getElementById("filter-minority").checked,
    disability: document.getElementById("filter-disability").checked,
    student: document.getElementById("filter-student").checked
  };
}

function updateActiveTags(filters, query) {
  const tagsEl = document.getElementById("active-tags");
  const badgeEl = document.getElementById("active-filter-count");
  const tags = [];
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

  if (query) tags.push({ label: `"${query}"`, clear: () => { document.getElementById("search-input").value=""; runSearch(); }});
  if (filters.category) tags.push({ label: `📂 ${cap(filters.category)}`, clear: () => { document.getElementById("filter-category").value=""; runSearch(); }});
  if (filters.state) tags.push({ label: `📍 ${cap(filters.state)}`, clear: () => { document.getElementById("filter-state").value=""; runSearch(); }});
  if (filters.gender) tags.push({ label: `👤 ${cap(filters.gender)}`, clear: () => { document.getElementById("filter-gender").value=""; runSearch(); }});
  if (filters.ageGroup) tags.push({ label: `🔢 ${cap(filters.ageGroup)}`, clear: () => { document.getElementById("filter-age").value=""; runSearch(); }});
  if (filters.area) tags.push({ label: filters.area==="urban"?"🏙️ Urban":"🌿 Rural", clear: () => { document.getElementById("filter-area").value=""; runSearch(); }});
  if (filters.minority) tags.push({ label: "🕌 Minority", clear: () => { document.getElementById("filter-minority").checked=false; runSearch(); }});
  if (filters.disability) tags.push({ label: "♿ Disability", clear: () => { document.getElementById("filter-disability").checked=false; runSearch(); }});
  if (filters.student) tags.push({ label: "🎒 Student", clear: () => { document.getElementById("filter-student").checked=false; runSearch(); }});

  tagsEl.innerHTML = "";
  tags.forEach(t => {
    const pill = document.createElement("span");
    pill.className = "active-tag";
    pill.innerHTML = `${t.label} <button title="Remove">✕</button>`;
    pill.querySelector("button").addEventListener("click", t.clear);
    tagsEl.appendChild(pill);
  });

  badgeEl.style.display = tags.length > 0 ? "inline-block" : "none";
  badgeEl.textContent = tags.length;
}

// -----------------------------------------
// RUN SEARCH
// -----------------------------------------
async function runSearch() {
  if (!db) return;
  const query = document.getElementById("search-input").value;
  const filters = getFilters();
  updateActiveTags(filters, query.trim());
  const results = await querySchemes(db, query, filters);
  await renderSchemes(results, query);
}

function quickSearch(term) {
  document.getElementById("search-input").value = term;
  clearFilters(false);
  runSearch();
}

function clearFilters(clearSearch = true) {
  if (clearSearch) document.getElementById("search-input").value = "";
  document.getElementById("filter-category").value = "";
  document.getElementById("filter-state").value = "";
  document.getElementById("filter-gender").value = "";
  document.getElementById("filter-age").value = "";
  document.getElementById("filter-area").value = "";
  document.getElementById("filter-minority").checked = false;
  document.getElementById("filter-disability").checked = false;
  document.getElementById("filter-student").checked = false;
}

// -----------------------------------------
// EVENT LISTENERS
// -----------------------------------------
document.getElementById("toggle-filters-btn").addEventListener("click", function () {
  const panel = document.getElementById("filter-panel");
  panel.classList.toggle("open");
  this.querySelector("span:first-child").textContent =
    panel.classList.contains("open") ? t("btnFiltersOpen") : t("btnFilters");
});

let searchTimer = null;
document.getElementById("search-input").addEventListener("input", function () {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(runSearch, 300);
});

document.getElementById("search-input").addEventListener("keydown", function (e) {
  if (e.key === "Enter") { clearTimeout(searchTimer); runSearch(); }
});

document.getElementById("search-btn").addEventListener("click", runSearch);
document.getElementById("apply-filter-btn").addEventListener("click", runSearch);

document.getElementById("clear-filter-btn").addEventListener("click", function () {
  clearFilters(true);
  runSearch();
});

// -----------------------------------------
// START APP
// -----------------------------------------
async function startApp() {
  try {
    db = await initDB();
    window._appDB = db; // share with auth.js and detail.js

    initAuth();            // set up login modal + restore session

    const all = await getAllSchemes(db);
    await renderSchemes(all, "");
  } catch (err) {
    console.error("Startup error:", err);
    document.getElementById("schemes-grid").innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;color:#c00;">
      <p style="font-size:20px;font-weight:600;">⚠️ Could not load database</p>
      <p style="margin-top:8px;font-size:14px;">${err}</p>
    </div>`;
  }
}

startApp();