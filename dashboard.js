// =========================================
// SCHEME FINDER — dashboard.js
// Module 8: User Dashboard
// =========================================

let currentCompareSchemes = [];

// -----------------------------------------
// SHOW DASHBOARD
// -----------------------------------------
async function showDashboard() {
  const user = getSession();
  if (!user) {
    showToast(t("toastLoginRequired"), "warning");
    showAuthModal("login");
    return;
  }

  const db = window._appDB;
  
  // Get user data
  const savedSchemes = await getSavedSchemes(db, user.email);
  const applications = await getUserApplications(db, user.email);
  const recommendations = await getRecommendations(db, user);

  // Hide main content
  document.querySelector('.hero').style.display = 'none';
  document.querySelector('.filter-section').style.display = 'none';
  document.querySelector('.schemes-section').style.display = 'none';

  // Create dashboard container if it doesn't exist
  let dashboardContainer = document.getElementById('dashboard-container');
  if (!dashboardContainer) {
    dashboardContainer = document.createElement('div');
    dashboardContainer.id = 'dashboard-container';
    dashboardContainer.className = 'dashboard-container';
    document.querySelector('.schemes-section').parentNode.insertBefore(
      dashboardContainer,
      document.querySelector('.schemes-section')
    );
  }

  // Render dashboard
  dashboardContainer.innerHTML = `
    <div class="dashboard">
      <!-- Dashboard Header -->
      <div class="dashboard-header">
        <div>
          <h1 class="dashboard-title">${t('dashboardTitle')}</h1>
          <p class="dashboard-subtitle">${t('dashboardWelcome').replace('{name}', user.name)}</p>
        </div>
        <button class="btn-dashboard-close" onclick="closeDashboard()">
          ← ${t('dashboardBackToHome')}
        </button>
      </div>

      <!-- Stats Overview -->
      <div class="dashboard-stats">
        <div class="dashboard-stat-card">
          <div class="stat-icon">❤️</div>
          <div class="stat-content">
            <div class="stat-value">${savedSchemes.length}</div>
            <div class="stat-label">${t('dashboardSavedSchemes')}</div>
          </div>
        </div>

        <div class="dashboard-stat-card">
          <div class="stat-icon">📝</div>
          <div class="stat-content">
            <div class="stat-value">${applications.length}</div>
            <div class="stat-label">${t('dashboardApplications')}</div>
          </div>
        </div>

        <div class="dashboard-stat-card">
          <div class="stat-icon">✅</div>
          <div class="stat-content">
            <div class="stat-value">${applications.filter(a => a.status === 'approved').length}</div>
            <div class="stat-label">${t('dashboardApproved')}</div>
          </div>
        </div>

        <div class="dashboard-stat-card">
          <div class="stat-icon">💡</div>
          <div class="stat-content">
            <div class="stat-value">${recommendations.length}</div>
            <div class="stat-label">${t('dashboardRecommendations')}</div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="dashboard-section">
        <h2 class="dashboard-section-title">${t('dashboardQuickActions')}</h2>
        <div class="quick-actions">
          <button class="quick-action-btn" onclick="closeDashboard()">
            <span class="quick-action-icon">🔍</span>
            <span class="quick-action-text">${t('dashboardSearchSchemes')}</span>
          </button>
          <button class="quick-action-btn" onclick="showCompareModal()">
            <span class="quick-action-icon">⚖️</span>
            <span class="quick-action-text">${t('dashboardCompareSchemes')}</span>
          </button>
          <button class="quick-action-btn" onclick="showProfile()">
            <span class="quick-action-icon">👤</span>
            <span class="quick-action-text">${t('dashboardMyProfile')}</span>
          </button>
          <button class="quick-action-btn" onclick="window.print()">
            <span class="quick-action-icon">🖨️</span>
            <span class="quick-action-text">${t('dashboardPrintReport')}</span>
          </button>
        </div>
      </div>

      <!-- Two Column Layout -->
      <div class="dashboard-columns">
        
        <!-- Left Column -->
        <div class="dashboard-left">
          
          <!-- Saved Schemes -->
          <div class="dashboard-section">
            <h2 class="dashboard-section-title">❤️ ${t('dashboardSavedSchemes')}</h2>
            ${savedSchemes.length === 0 ? `
              <div class="dashboard-empty">
                <p>📭</p>
                <p>${t('noSavedText')}</p>
              </div>
            ` : `
              <div class="dashboard-scheme-list">
                ${savedSchemes.slice(0, 5).map(s => `
                  <div class="dashboard-scheme-item" onclick="showSchemeDetail(${s.id})">
                    <span class="dashboard-scheme-icon">${s.icon}</span>
                    <div class="dashboard-scheme-info">
                      <div class="dashboard-scheme-name">${s.title}</div>
                      <div class="dashboard-scheme-benefit">${s.benefit}</div>
                    </div>
                    <button class="btn-scheme-action" onclick="event.stopPropagation(); showSchemeDetail(${s.id})">
                      ${t('btnApply')} →
                    </button>
                  </div>
                `).join('')}
              </div>
              ${savedSchemes.length > 5 ? `
                <button class="btn-view-all" onclick="showSavedSchemes()">
                  ${t('dashboardViewAll')} (${savedSchemes.length})
                </button>
              ` : ''}
            `}
          </div>

          <!-- Applications -->
          <div class="dashboard-section">
            <h2 class="dashboard-section-title">📝 ${t('dashboardApplications')}</h2>
            ${applications.length === 0 ? `
              <div class="dashboard-empty">
                <p>📋</p>
                <p>${t('dashboardNoApplications')}</p>
              </div>
            ` : `
              <div class="application-timeline">
                ${applications.slice(0, 5).map(app => {
                  const scheme = savedSchemes.find(s => s.id === app.schemeId) || 
                                 { title: 'Unknown Scheme', icon: '📄' };
                  return `
                    <div class="application-item">
                      <div class="application-status ${app.status}">
                        ${getStatusIcon(app.status)}
                      </div>
                      <div class="application-content">
                        <div class="application-header">
                          <span class="application-icon">${scheme.icon}</span>
                          <div>
                            <div class="application-name">${scheme.title}</div>
                            <div class="application-date">${formatDate(app.appliedAt)}</div>
                          </div>
                        </div>
                        <div class="application-status-text">
                          ${t('dashboardStatus')}: <strong>${t('dashboardStatus' + capitalize(app.status))}</strong>
                        </div>
                        ${app.referenceNumber ? `
                          <div class="application-reference">
                            ${t('dashboardReference')}: <code>${app.referenceNumber}</code>
                          </div>
                        ` : ''}
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            `}
          </div>

        </div>

        <!-- Right Column -->
        <div class="dashboard-right">
          
          <!-- Recommendations -->
          <div class="dashboard-section">
            <h2 class="dashboard-section-title">💡 ${t('dashboardRecommendations')}</h2>
            ${recommendations.length === 0 ? `
              <div class="dashboard-empty">
                <p>💡</p>
                <p>${t('dashboardNoRecommendations')}</p>
              </div>
            ` : `
              <div class="recommendation-list">
                ${recommendations.slice(0, 3).map(s => `
                  <div class="recommendation-card" onclick="showSchemeDetail(${s.id})">
                    <div class="recommendation-header">
                      <span class="recommendation-icon">${s.icon}</span>
                      <span class="recommendation-badge">${t('dashboardRecommended')}</span>
                    </div>
                    <div class="recommendation-title">${s.title}</div>
                    <div class="recommendation-benefit">💰 ${s.benefit}</div>
                    <div class="recommendation-match">
                      ${t('dashboardMatchScore')}: <strong>${s.matchScore}%</strong>
                    </div>
                  </div>
                `).join('')}
              </div>
            `}
          </div>

          <!-- Profile Summary -->
          <div class="dashboard-section">
            <h2 class="dashboard-section-title">👤 ${t('dashboardProfileSummary')}</h2>
            <div class="profile-summary">
              <div class="profile-summary-item">
                <span class="profile-summary-label">${t('phName')}:</span>
                <span class="profile-summary-value">${user.name}</span>
              </div>
              <div class="profile-summary-item">
                <span class="profile-summary-label">${t('phEmail')}:</span>
                <span class="profile-summary-value">${user.email}</span>
              </div>
              ${user.state ? `
                <div class="profile-summary-item">
                  <span class="profile-summary-label">${t('detailState')}:</span>
                  <span class="profile-summary-value">${capitalize(user.state)}</span>
                </div>
              ` : ''}
              ${user.gender ? `
                <div class="profile-summary-item">
                  <span class="profile-summary-label">${t('detailGender')}:</span>
                  <span class="profile-summary-value">${capitalize(user.gender)}</span>
                </div>
              ` : ''}
              <button class="btn-edit-profile" onclick="showProfile()">
                ${t('dashboardEditProfile')}
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  `;

  dashboardContainer.style.display = 'block';
  window.scrollTo(0, 0);
}

// -----------------------------------------
// CLOSE DASHBOARD
// -----------------------------------------
function closeDashboard() {
  const dashboardContainer = document.getElementById('dashboard-container');
  if (dashboardContainer) {
    dashboardContainer.style.display = 'none';
  }
  
  document.querySelector('.hero').style.display = 'block';
  document.querySelector('.filter-section').style.display = 'block';
  document.querySelector('.schemes-section').style.display = 'block';
  
  window.scrollTo(0, 0);
}

// -----------------------------------------
// GET RECOMMENDATIONS
// -----------------------------------------
async function getRecommendations(db, user) {
  const allSchemes = await getAllSchemes(db);
  const savedIds = await getSavedSchemeIds(db, user.email);
  const applications = await getUserApplications(db, user.email);
  const appliedIds = applications.map(a => a.schemeId);

  // Filter schemes user hasn't saved or applied to
  let recommendations = allSchemes.filter(s => 
    !savedIds.includes(s.id) && !appliedIds.includes(s.id)
  );

  // Score schemes based on user profile
  recommendations = recommendations.map(s => {
    let score = 50; // Base score

    // Match state
    if (user.state && (s.state === user.state || s.state === 'central')) {
      score += 20;
    }

    // Match gender
    if (user.gender && (s.gender === user.gender || s.gender === 'all')) {
      score += 15;
    }

    // Boost popular categories
    if (['education', 'health', 'employment'].includes(s.category)) {
      score += 10;
    }

    // Cap at 100
    score = Math.min(100, score);

    return { ...s, matchScore: score };
  });

  // Sort by match score
  recommendations.sort((a, b) => b.matchScore - a.matchScore);

  return recommendations.slice(0, 10);
}

// -----------------------------------------
// APPLICATION TRACKING
// -----------------------------------------
async function markAsApplied(schemeId, referenceNumber = '') {
  const user = getSession();
  if (!user) {
    showToast(t("toastLoginRequired"), "warning");
    return { success: false };
  }

  const db = window._appDB;
  const result = await addApplication(db, user.email, schemeId, referenceNumber);
  
  if (result.success) {
    showToast(t('dashboardApplicationAdded'), 'success');
  }
  
  return result;
}

// -----------------------------------------
// SCHEME COMPARISON
// -----------------------------------------
function showCompareModal() {
  const user = getSession();
  if (!user) {
    showToast(t("toastLoginRequired"), "warning");
    showAuthModal("login");
    return;
  }

  getSavedSchemes(window._appDB, user.email).then(savedSchemes => {
    if (savedSchemes.length < 2) {
      showToast(t('dashboardNeedTwoSchemes'), 'warning');
      return;
    }

    const overlay = document.getElementById("modal-overlay");
    const box = document.querySelector(".modal-box");

    box.innerHTML = `
      <button class="modal-close" onclick="closeModal()">✕</button>
      <h2 class="modal-title">⚖️ ${t('dashboardCompareSchemes')}</h2>
      <p style="color:#666;font-size:14px;margin-bottom:20px;">
        ${t('dashboardCompareInstructions')}
      </p>

      <div class="compare-select-list">
        ${savedSchemes.map(s => `
          <label class="compare-select-item">
            <input 
              type="checkbox" 
              value="${s.id}" 
              onchange="updateCompareSelection(${s.id}, this.checked)"
              ${currentCompareSchemes.includes(s.id) ? 'checked' : ''}
            />
            <span class="compare-scheme-icon">${s.icon}</span>
            <span class="compare-scheme-name">${s.title}</span>
          </label>
        `).join('')}
      </div>

      <div style="margin-top:20px;text-align:center;color:#888;font-size:13px;">
        ${t('dashboardSelected')}: <strong id="compare-count">${currentCompareSchemes.length}</strong>/3
      </div>

      <button 
        class="btn-modal-submit" 
        id="compare-submit-btn"
        onclick="showComparisonTable()"
        ${currentCompareSchemes.length < 2 ? 'disabled' : ''}
        style="${currentCompareSchemes.length < 2 ? 'opacity:0.5;cursor:not-allowed;' : ''}"
      >
        ${t('dashboardCompareButton')}
      </button>
    `;

    overlay.style.display = "flex";
  });
}

function updateCompareSelection(schemeId, isChecked) {
  if (isChecked) {
    if (currentCompareSchemes.length >= 3) {
      showToast(t('dashboardMaxThreeSchemes'), 'warning');
      event.target.checked = false;
      return;
    }
    currentCompareSchemes.push(schemeId);
  } else {
    currentCompareSchemes = currentCompareSchemes.filter(id => id !== schemeId);
  }

  // Update UI
  const countEl = document.getElementById('compare-count');
  const submitBtn = document.getElementById('compare-submit-btn');
  
  if (countEl) countEl.textContent = currentCompareSchemes.length;
  
  if (submitBtn) {
    if (currentCompareSchemes.length >= 2) {
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
      submitBtn.style.cursor = 'pointer';
    } else {
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.5';
      submitBtn.style.cursor = 'not-allowed';
    }
  }
}

async function showComparisonTable() {
  const db = window._appDB;
  const schemes = await Promise.all(
    currentCompareSchemes.map(id => getSchemeById(db, id))
  );

  const overlay = document.getElementById("modal-overlay");
  const box = document.querySelector(".modal-box");
  box.style.maxWidth = '900px';

  box.innerHTML = `
    <button class="modal-close" onclick="closeModal();currentCompareSchemes=[];">✕</button>
    <h2 class="modal-title">⚖️ ${t('dashboardSchemeComparison')}</h2>

    <div class="comparison-table">
      <table>
        <thead>
          <tr>
            <th>${t('dashboardCompareFeature')}</th>
            ${schemes.map(s => `<th>${s.icon} ${s.title}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>${t('detailBenefit')}</strong></td>
            ${schemes.map(s => `<td>${s.benefit}</td>`).join('')}
          </tr>
          <tr>
            <td><strong>${t('labelCategory')}</strong></td>
            ${schemes.map(s => `<td>${capitalize(s.category)}</td>`).join('')}
          </tr>
          <tr>
            <td><strong>${t('detailState')}</strong></td>
            ${schemes.map(s => `<td>${formatState(s.state)}</td>`).join('')}
          </tr>
          <tr>
            <td><strong>${t('detailGender')}</strong></td>
            ${schemes.map(s => `<td>${formatGender(s.gender)}</td>`).join('')}
          </tr>
          <tr>
            <td><strong>${t('detailAge')}</strong></td>
            ${schemes.map(s => `<td>${formatAgeGroup(s.ageGroup)}</td>`).join('')}
          </tr>
          <tr>
            <td><strong>${t('labelArea')}</strong></td>
            ${schemes.map(s => `<td>${s.area === 'both' ? t('optUrbanRural') : capitalize(s.area)}</td>`).join('')}
          </tr>
          <tr>
            <td><strong>${t('detailEligibility')}</strong></td>
            ${schemes.map(s => `<td style="font-size:12px;">${s.eligibility.substring(0, 100)}...</td>`).join('')}
          </tr>
        </tbody>
      </table>
    </div>

    <div class="comparison-actions">
      ${schemes.map(s => `
        <button class="btn-comparison-action" onclick="showSchemeDetail(${s.id});closeModal();">
          ${t('btnApply')} ${s.title.substring(0, 20)}...
        </button>
      `).join('')}
    </div>
  `;

  overlay.style.display = "flex";
}

// -----------------------------------------
// HELPER FUNCTIONS
// -----------------------------------------
function getStatusIcon(status) {
  const icons = {
    pending: '🕐',
    approved: '✅',
    rejected: '❌',
    review: '🔍'
  };
  return icons[status] || '📋';
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return t('dashboardToday');
  if (diffDays === 1) return t('dashboardYesterday');
  if (diffDays < 7) return `${diffDays} ${t('dashboardDaysAgo')}`;
  
  return date.toLocaleDateString();
}

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Expose functions globally
window.showDashboard = showDashboard;
window.closeDashboard = closeDashboard;
window.showCompareModal = showCompareModal;
window.updateCompareSelection = updateCompareSelection;
window.showComparisonTable = showComparisonTable;
window.markAsApplied = markAsApplied;