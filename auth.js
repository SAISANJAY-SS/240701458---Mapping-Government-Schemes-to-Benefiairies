// =========================================
// SCHEME FINDER — auth.js
// Module 8: Complete with dashboard integration
// =========================================

// -----------------------------------------
// SESSION HELPERS
// -----------------------------------------
function saveSession(user) {
  const safeUser = { email: user.email, name: user.name, state: user.state, gender: user.gender };
  sessionStorage.setItem("currentUser", JSON.stringify(safeUser));
}

function getSession() {
  const data = sessionStorage.getItem("currentUser");
  return data ? JSON.parse(data) : null;
}

function clearSession() {
  sessionStorage.removeItem("currentUser");
}

// -----------------------------------------
// UPDATE NAVBAR
// -----------------------------------------
function updateNavbar(user) {
  const loginBtn = document.getElementById("login-btn");
  if (user) {
    loginBtn.innerHTML = `<span class="nav-avatar">${user.name.charAt(0).toUpperCase()}</span>
      <span class="nav-username">${user.name.split(" ")[0]}</span>
      <span style="font-size:10px;margin-left:2px;">▼</span>`;
    loginBtn.classList.add("btn-user");
    loginBtn.onclick = toggleUserDropdown;

    if (!document.getElementById("user-dropdown")) {
      const dropdown = document.createElement("div");
      dropdown.id        = "user-dropdown";
      dropdown.className = "user-dropdown";
      dropdown.innerHTML = `
        <div class="dropdown-header">
          <div class="dropdown-avatar">${user.name.charAt(0).toUpperCase()}</div>
          <div>
            <div class="dropdown-name">${user.name}</div>
            <div class="dropdown-email">${user.email}</div>
          </div>
        </div>
        <hr class="dropdown-divider"/>
        <button class="dropdown-item" onclick="showDashboard();toggleUserDropdown();">${t("dropdownDashboard")}</button>
        <button class="dropdown-item" onclick="showProfile()">${t("dropdownProfile")}</button>
        <button class="dropdown-item" onclick="showSavedSchemes()">${t("dropdownSaved")}</button>
        <hr class="dropdown-divider"/>
        <button class="dropdown-item logout" onclick="logoutUser()">${t("dropdownLogout")}</button>`;
      document.querySelector(".nav-right").appendChild(dropdown);
    }
  } else {
    loginBtn.innerHTML = t("btnLogin");
    loginBtn.className = "btn-login";
    loginBtn.onclick = () => showAuthModal("login");
    const dropdown = document.getElementById("user-dropdown");
    if (dropdown) dropdown.remove();
  }
}

function toggleUserDropdown() {
  const d = document.getElementById("user-dropdown");
  if (d) d.classList.toggle("open");
}

document.addEventListener("click", function (e) {
  const d = document.getElementById("user-dropdown");
  if (d && !d.contains(e.target) && !document.getElementById("login-btn").contains(e.target)) {
    d.classList.remove("open");
  }
});

// -----------------------------------------
// SHOW AUTH MODAL
// -----------------------------------------
function showAuthModal(tab = "login") {
  const overlay = document.getElementById("modal-overlay");
  overlay.style.display = "flex";
  switchAuthTab(tab);
}

function switchAuthTab(tab) {
  document.getElementById("auth-login-tab").classList.toggle("active-tab", tab === "login");
  document.getElementById("auth-register-tab").classList.toggle("active-tab", tab === "register");
  document.getElementById("login-form").style.display = tab === "login" ? "block" : "none";
  document.getElementById("register-form").style.display = tab === "register" ? "block" : "none";
  clearAuthMessages();
}

function clearAuthMessages() {
  ["login-error", "register-error", "register-success"].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.textContent = ""; el.style.display = "none"; }
  });
}

function showAuthError(id, msg) {
  const el = document.getElementById(id);
  if (el) { el.textContent = msg; el.style.display = "block"; }
}

// -----------------------------------------
// LOGIN HANDLER
// -----------------------------------------
async function handleLogin() {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  if (!email || !password) {
    showAuthError("login-error", "Please fill in both fields.");
    return;
  }

  const btn = document.getElementById("login-submit");
  btn.textContent = "Logging in...";
  btn.disabled = true;

  const db = window._appDB;
  const result = await loginUser(db, email, password);

  btn.textContent = t("btnLoginSubmit");
  btn.disabled = false;

  if (!result.success) {
    showAuthError("login-error", result.message);
    return;
  }

  saveSession(result.user);
  document.getElementById("modal-overlay").style.display = "none";
  updateNavbar(result.user);
  showToast(t("toastWelcome").replace("{name}", result.user.name));

  if (window._refreshCards) window._refreshCards();
}

// -----------------------------------------
// REGISTER HANDLER
// -----------------------------------------
async function handleRegister() {
  const name = document.getElementById("reg-name").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value;
  const confirm = document.getElementById("reg-confirm").value;
  const state = document.getElementById("reg-state").value;
  const gender = document.getElementById("reg-gender").value;

  if (!name || !email || !password || !confirm) {
    showAuthError("register-error", "Please fill in all required fields.");
    return;
  }
  if (password.length < 6) {
    showAuthError("register-error", "Password must be at least 6 characters.");
    return;
  }
  if (password !== confirm) {
    showAuthError("register-error", "Passwords do not match.");
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showAuthError("register-error", "Please enter a valid email address.");
    return;
  }

  const btn = document.getElementById("register-submit");
  btn.textContent = "Registering...";
  btn.disabled = true;

  const db = window._appDB;
  const result = await registerUser(db, name, email, password, state, gender);

  btn.textContent = t("btnRegisterSubmit");
  btn.disabled = false;

  if (!result.success) {
    showAuthError("register-error", result.message);
    return;
  }

  const successEl = document.getElementById("register-success");
  successEl.textContent = `✅ Account created! You can now login, ${name}.`;
  successEl.style.display = "block";
  setTimeout(() => switchAuthTab("login"), 1800);
}

// -----------------------------------------
// LOGOUT
// -----------------------------------------
function logoutUser() {
  clearSession();
  updateNavbar(null);
  showToast(t("toastLogout"));
  const d = document.getElementById("user-dropdown");
  if (d) d.remove();
  
  // Close dashboard if open
  const dashboardContainer = document.getElementById('dashboard-container');
  if (dashboardContainer && dashboardContainer.style.display !== 'none') {
    closeDashboard();
  }
  
  if (window._refreshCards) window._refreshCards();
}

// -----------------------------------------
// PROFILE MODAL
// -----------------------------------------
async function showProfile() {
  const user = getSession();
  if (!user) return;

  const db = window._appDB;
  const saved = await getSavedSchemes(db, user.email);

  const overlay = document.getElementById("modal-overlay");
  const box = document.querySelector(".modal-box");

  box.innerHTML = `<button class="modal-close" onclick="closeModal()">✕</button>
    <div class="profile-header">
      <div class="profile-avatar">${user.name.charAt(0).toUpperCase()}</div>
      <div>
        <h2 class="profile-name">${user.name}</h2>
        <p class="profile-email">${user.email}</p>
      </div>
    </div>
    <div class="profile-stats">
      <div class="stat-box">
        <div class="stat-number">${saved.length}</div>
        <div class="stat-label">${t("statSavedSchemes")}</div>
      </div>
      <div class="stat-box">
        <div class="stat-number">${user.state ? user.state.charAt(0).toUpperCase() + user.state.slice(1) : "—"}</div>
        <div class="stat-label">${t("statState")}</div>
      </div>
      <div class="stat-box">
        <div class="stat-number">${user.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : "—"}</div>
        <div class="stat-label">${t("statGender")}</div>
      </div>
    </div>
    <button class="btn-modal-submit" style="background:#e53935;margin-top:10px;" onclick="logoutUser();closeModal()">${t("btnLogout")}</button>`;

  overlay.style.display = "flex";
  document.getElementById("user-dropdown").classList.remove("open");
}

// -----------------------------------------
// SAVED SCHEMES VIEW
// -----------------------------------------
async function showSavedSchemes() {
  const user = getSession();
  if (!user) return;

  const db = window._appDB;
  const saved = await getSavedSchemes(db, user.email);

  const overlay = document.getElementById("modal-overlay");
  const box = document.querySelector(".modal-box");

  box.innerHTML = `<button class="modal-close" onclick="closeModal()">✕</button>
    <h2 class="modal-title">${t("savedSchemesTitle")}</h2>
    ${saved.length === 0 ? `<div style="text-align:center;padding:30px;color:#888;">
      <p style="font-size:32px;">📭</p>
      <p style="margin-top:10px;">${t("noSavedText")}</p>
      <p style="font-size:13px;margin-top:6px;">${t("noSavedHint")}</p>
    </div>` : saved.map(s => `
      <div class="saved-scheme-row">
        <span class="saved-icon">${s.icon}</span>
        <div class="saved-info">
          <div class="saved-title">${s.title}</div>
          <div class="saved-benefit">💰 ${s.benefit}</div>
        </div>
        <div class="saved-actions">
          <button class="btn-mini-apply" onclick="window.open('${s.link}','_blank')">${t("btnApplyMini")}</button>
          <button class="btn-mini-remove" onclick="handleUnsave(${s.id}, this)">${t("btnRemove")}</button>
        </div>
      </div>`).join("")}`;

  overlay.style.display = "flex";
  document.getElementById("user-dropdown").classList.remove("open");
}

async function handleUnsave(schemeId, btn) {
  const user = getSession();
  if (!user) return;
  await unsaveScheme(window._appDB, user.email, schemeId);
  const row = btn.closest(".saved-scheme-row");
  if (row) row.remove();
  const cardBtn = document.querySelector(`.save-btn[data-id="${schemeId}"]`);
  if (cardBtn) { cardBtn.classList.remove("saved"); cardBtn.title = "Save Scheme"; cardBtn.textContent = "🤍"; }
  showToast(t("toastRemoved"));
}

// -----------------------------------------
// SAVE / UNSAVE FROM CARD
// -----------------------------------------
async function toggleSaveScheme(schemeId, btn) {
  const user = getSession();
  if (!user) {
    showToast(t("toastLoginRequired"), "warning");
    showAuthModal("login");
    return;
  }

  const db = window._appDB;

  if (btn.classList.contains("saved")) {
    await unsaveScheme(db, user.email, schemeId);
    btn.classList.remove("saved");
    btn.textContent = "🤍";
    btn.title = "Save Scheme";
    showToast(t("toastRemoved"));
  } else {
    const result = await saveScheme(db, user.email, schemeId);
    if (result.success) {
      btn.classList.add("saved");
      btn.textContent = "❤️";
      btn.title = t("btnRemove");
      showToast(t("toastSaved"));
    } else {
      showToast(result.message, "warning");
    }
  }
}

// -----------------------------------------
// CLOSE MODAL
// -----------------------------------------
function closeModal() {
  const overlay = document.getElementById("modal-overlay");
  overlay.style.display = "none";
  const box = document.querySelector(".modal-box");
  box.style.maxWidth = '420px'; // Reset width
  box.innerHTML = `
    <button class="modal-close" onclick="closeModal()">✕</button>
    <div class="auth-tabs">
      <button id="auth-login-tab" class="auth-tab active-tab" onclick="switchAuthTab('login')">${t("tabLogin")}</button>
      <button id="auth-register-tab" class="auth-tab" onclick="switchAuthTab('register')">${t("tabRegister")}</button>
    </div>

    <div id="login-form">
      <p id="login-error" class="auth-error" style="display:none;"></p>
      <input type="email" class="modal-input" placeholder="${t("phEmail")}" id="login-email"/>
      <input type="password" class="modal-input" placeholder="${t("phPassword")}" id="login-password"/>
      <button class="btn-modal-submit" id="login-submit" onclick="handleLogin()">${t("btnLoginSubmit")}</button>
      <p class="modal-switch">${t("authSwitchToRegister")}</p>
    </div>

    <div id="register-form" style="display:none;">
      <p id="register-error"   class="auth-error"   style="display:none;"></p>
      <p id="register-success" class="auth-success" style="display:none;"></p>
      <input type="text"     class="modal-input" placeholder="${t("phName")}"        id="reg-name"/>
      <input type="email"    class="modal-input" placeholder="${t("phEmail")}"    id="reg-email"/>
      <input type="password" class="modal-input" placeholder="${t("phPassword")}" id="reg-password"/>
      <input type="password" class="modal-input" placeholder="${t("phConfirmPassword")}" id="reg-confirm"/>
      <div style="display:flex;gap:10px;">
        <select class="modal-input" id="reg-state" style="flex:1;">
          <option value="">${t("phSelectState")}</option>
          <option value="central">Central</option>
          <option value="tamilnadu">Tamil Nadu</option>
          <option value="maharashtra">Maharashtra</option>
          <option value="karnataka">Karnataka</option>
          <option value="kerala">Kerala</option>
          <option value="delhi">Delhi</option>
          <option value="uttarpradesh">Uttar Pradesh</option>
          <option value="gujarat">Gujarat</option>
          <option value="rajasthan">Rajasthan</option>
          <option value="punjab">Punjab</option>
        </select>
        <select class="modal-input" id="reg-gender" style="flex:1;">
          <option value="">${t("phGender")}</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <button class="btn-modal-submit" id="register-submit" onclick="handleRegister()">${t("btnRegisterSubmit")}</button>
      <p class="modal-switch">${t("authSwitchToLogin")}</p>
    </div>`;
}

// -----------------------------------------
// TOAST NOTIFICATION
// -----------------------------------------
function showToast(message, type = "success") {
  const existing = document.getElementById("toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "toast";
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// -----------------------------------------
// INIT AUTH MODULE
// -----------------------------------------
function initAuth() {
  closeModal();
  document.getElementById("login-btn").onclick = () => showAuthModal("login");
  document.getElementById("modal-overlay").addEventListener("click", function (e) {
    if (e.target === this) closeModal();
  });

  const user = getSession();
  if (user) {
    updateNavbar(user);
  }
}