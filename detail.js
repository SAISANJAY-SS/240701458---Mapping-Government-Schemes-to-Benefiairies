// =========================================
// SCHEME FINDER — detail.js
// Module 8: Complete with Mark as Applied feature
// =========================================

// -----------------------------------------
// SHOW SCHEME DETAIL MODAL
// -----------------------------------------
async function showSchemeDetail(schemeId) {
  const db = window._appDB;
  const scheme = await getSchemeById(db, schemeId);
  
  if (!scheme) {
    showToast("Scheme not found", "error");
    return;
  }

  const user = getSession();
  let isSaved = false;
  if (user && db) {
    const savedIds = await getSavedSchemeIds(db, user.email);
    isSaved = savedIds.includes(schemeId);
  }

  const overlay = document.getElementById("detail-overlay");
  const container = document.getElementById("detail-container");

  container.innerHTML = `
    <div class="detail-page">
      <div class="detail-header">
        <div class="detail-header-left">
          <span class="detail-icon">${scheme.icon}</span>
          <div>
            <h1 class="detail-title">${scheme.title}</h1>
            <p class="detail-ministry">${scheme.ministry}</p>
          </div>
        </div>
        <div class="detail-header-right">
          <button class="btn-detail-action" onclick="shareScheme(${scheme.id})" title="${t('detailShare')}">
            📤 ${t('detailShare')}
          </button>
          <button class="btn-detail-action" onclick="printScheme()" title="${t('detailPrint')}">
            🖨️ ${t('detailPrint')}
          </button>
          <button class="btn-detail-close" onclick="closeSchemeDetail()">✕</button>
        </div>
      </div>

      <div class="detail-content">
        
        <div class="detail-section">
          <h2 class="detail-section-title">📋 ${t('detailOverview')}</h2>
          <p class="detail-description">${scheme.description}</p>
          
          <div class="detail-tags">
            ${scheme.tags.map(tag => `<span class="detail-tag">${tag}</span>`).join('')}
            ${scheme.minority ? `<span class="detail-tag tag-special">${t('checkMinority')}</span>` : ''}
            ${scheme.disability ? `<span class="detail-tag tag-special">${t('checkDisability')}</span>` : ''}
            ${scheme.studentOnly ? `<span class="detail-tag tag-special">${t('checkStudent')}</span>` : ''}
          </div>
        </div>

        <div class="detail-info-grid">
          <div class="detail-info-card">
            <span class="detail-info-icon">💰</span>
            <div>
              <div class="detail-info-label">${t('detailBenefit')}</div>
              <div class="detail-info-value">${scheme.benefit}</div>
            </div>
          </div>
          
          <div class="detail-info-card">
            <span class="detail-info-icon">📍</span>
            <div>
              <div class="detail-info-label">${t('detailState')}</div>
              <div class="detail-info-value">${formatState(scheme.state)}</div>
            </div>
          </div>
          
          <div class="detail-info-card">
            <span class="detail-info-icon">👥</span>
            <div>
              <div class="detail-info-label">${t('detailGender')}</div>
              <div class="detail-info-value">${formatGender(scheme.gender)}</div>
            </div>
          </div>
          
          <div class="detail-info-card">
            <span class="detail-info-icon">🎂</span>
            <div>
              <div class="detail-info-label">${t('detailAge')}</div>
              <div class="detail-info-value">${formatAgeGroup(scheme.ageGroup)}</div>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <h2 class="detail-section-title">✅ ${t('detailEligibility')}</h2>
          <div class="detail-eligibility">
            ${scheme.eligibility.split('.').filter(e => e.trim()).map(criteria => 
              `<div class="eligibility-item">
                <span class="eligibility-check">✓</span>
                <span>${criteria.trim()}</span>
              </div>`
            ).join('')}
          </div>
        </div>

        <div class="detail-section">
          <h2 class="detail-section-title">📄 ${t('detailDocuments')}</h2>
          <div class="detail-documents">
            ${(scheme.documents || getDefaultDocuments(scheme.category)).map(doc => 
              `<div class="document-item">
                <span class="document-icon">📎</span>
                <span>${doc}</span>
              </div>`
            ).join('')}
          </div>
        </div>

        <div class="detail-section">
          <h2 class="detail-section-title">📝 ${t('detailHowToApply')}</h2>
          <div class="detail-steps">
            ${(scheme.applicationSteps || getDefaultSteps()).map((step, index) => 
              `<div class="application-step">
                <div class="step-number">${index + 1}</div>
                <div class="step-content">${step}</div>
              </div>`
            ).join('')}
          </div>
        </div>

        <div class="detail-section">
          <h2 class="detail-section-title">🔗 ${t('detailLinks')}</h2>
          <div class="detail-links">
            <a href="${scheme.link}" target="_blank" class="detail-link">
              <span>🌐</span>
              <span>${t('detailOfficialWebsite')}</span>
            </a>
            ${scheme.helpline ? `
              <div class="detail-link">
                <span>📞</span>
                <span>${t('detailHelpline')}: ${scheme.helpline}</span>
              </div>
            ` : ''}
          </div>
        </div>

      </div>

      <div class="detail-footer">
        <button 
          class="btn-detail-save ${isSaved ? 'saved' : ''}" 
          onclick="toggleSaveFromDetail(${scheme.id}, this)">
          ${isSaved ? '❤️' : '🤍'} ${isSaved ? t('btnRemove') : t('detailSaveScheme')}
        </button>
        <button 
          class="btn-detail-mark-applied" 
          onclick="handleMarkAsApplied(${scheme.id})">
          ✓ ${t('detailMarkApplied')}
        </button>
        <button class="btn-detail-apply" onclick="window.open('${scheme.link}', '_blank')">
          ${t('btnApply')} →
        </button>
      </div>
    </div>
  `;

  overlay.style.display = "flex";
  document.body.style.overflow = "hidden";
}

// -----------------------------------------
// CLOSE DETAIL MODAL
// -----------------------------------------
function closeSchemeDetail() {
  const overlay = document.getElementById("detail-overlay");
  overlay.style.display = "none";
  document.body.style.overflow = "auto";
}

// -----------------------------------------
// SHARE SCHEME
// -----------------------------------------
function shareScheme(schemeId) {
  const url = `${window.location.origin}${window.location.pathname}?scheme=${schemeId}`;
  
  if (navigator.share) {
    navigator.share({
      title: document.querySelector('.detail-title').textContent,
      text: t('detailShareText'),
      url: url
    }).then(() => {
      showToast(t('detailShareSuccess'), 'success');
    }).catch(() => {
      copyToClipboard(url);
    });
  } else {
    copyToClipboard(url);
  }
}

function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(t('detailCopySuccess'), 'success');
    }).catch(() => {
      showToast(t('detailCopyError'), 'error');
    });
  } else {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showToast(t('detailCopySuccess'), 'success');
    } catch (err) {
      showToast(t('detailCopyError'), 'error');
    }
    document.body.removeChild(textarea);
  }
}

// -----------------------------------------
// PRINT SCHEME
// -----------------------------------------
function printScheme() {
  window.print();
}

// -----------------------------------------
// SAVE/UNSAVE FROM DETAIL PAGE
// -----------------------------------------
async function toggleSaveFromDetail(schemeId, btn) {
  const user = getSession();
  if (!user) {
    showToast(t("toastLoginRequired"), "warning");
    closeSchemeDetail();
    showAuthModal("login");
    return;
  }

  const db = window._appDB;
  const isSaved = btn.classList.contains('saved');

  if (isSaved) {
    await unsaveScheme(db, user.email, schemeId);
    btn.classList.remove('saved');
    btn.innerHTML = `🤍 ${t('detailSaveScheme')}`;
    showToast(t("toastRemoved"));
  } else {
    const result = await saveScheme(db, user.email, schemeId);
    if (result.success) {
      btn.classList.add('saved');
      btn.innerHTML = `❤️ ${t('btnRemove')}`;
      showToast(t("toastSaved"));
    }
  }

  const cardBtn = document.querySelector(`.save-btn[data-id="${schemeId}"]`);
  if (cardBtn) {
    if (isSaved) {
      cardBtn.classList.remove("saved");
      cardBtn.textContent = "🤍";
    } else {
      cardBtn.classList.add("saved");
      cardBtn.textContent = "❤️";
    }
  }
}

// -----------------------------------------
// MARK AS APPLIED
// -----------------------------------------
async function handleMarkAsApplied(schemeId) {
  const user = getSession();
  if (!user) {
    showToast(t("toastLoginRequired"), "warning");
    closeSchemeDetail();
    showAuthModal("login");
    return;
  }

  const refNumber = prompt(t('dashboardReference') + ':', '');
  
  const result = await markAsApplied(schemeId, refNumber);
  
  if (result.success) {
    showToast(t('dashboardApplicationAdded'), 'success');
  }
}

// -----------------------------------------
// FORMAT HELPERS
// -----------------------------------------
function formatState(state) {
  const stateMap = {
    central: t('stateCentral'),
    tamilnadu: t('stateTN'),
    maharashtra: t('stateMH'),
    karnataka: t('stateKA'),
    kerala: t('stateKL')
  };
  return stateMap[state] || state.charAt(0).toUpperCase() + state.slice(1);
}

function formatGender(gender) {
  if (gender === 'all') return t('optAllGenders');
  if (gender === 'male') return t('genderMale');
  if (gender === 'female') return t('genderFemale');
  return gender;
}

function formatAgeGroup(age) {
  const ageMap = {
    child: t('ageChild'),
    youth: t('ageYouth'),
    adult: t('ageAdult'),
    senior: t('ageSenior')
  };
  return ageMap[age] || t('optAllAges');
}

// -----------------------------------------
// DEFAULT DOCUMENTS & STEPS
// -----------------------------------------
function getDefaultDocuments(category) {
  const lang = getCurrentLanguage();
  
  const docs = {
    en: [
      "Aadhaar Card",
      "Income Certificate",
      "Address Proof (Ration Card / Utility Bill)",
      "Bank Account Details (Passbook / Cancelled Cheque)",
      "Passport Size Photographs",
      "Category certificates if applicable (SC/ST/OBC/EWS)"
    ],
    hi: [
      "आधार कार्ड",
      "आय प्रमाण पत्र",
      "पता प्रमाण (राशन कार्ड / उपयोगिता बिल)",
      "बैंक खाता विवरण (पासबुक / रद्द चेक)",
      "पासपोर्ट साइज फोटो",
      "श्रेणी प्रमाणपत्र यदि लागू हो (एससी/एसटी/ओबीसी/ईडब्ल्यूएस)"
    ],
    ta: [
      "ஆதார் அட்டை",
      "வருமான சான்றிதழ்",
      "முகவரி சான்று (ரேஷன் அட்டை / பயன்பாட்டு பில்)",
      "வங்கி கணக்கு விவரங்கள் (பாஸ்புக் / ரத்து செய்யப்பட்ட காசோலை)",
      "பாஸ்போர்ட் அளவு புகைப்படங்கள்",
      "பிரிவு சான்றிதழ்கள் பொருந்தினால் (SC/ST/OBC/EWS)"
    ]
  };
  
  return docs[lang] || docs.en;
}

function getDefaultSteps() {
  const lang = getCurrentLanguage();
  
  const steps = {
    en: [
      "Visit the official scheme website using the link provided above",
      "Click on 'Apply Now' or 'Register' button",
      "Fill in the application form with accurate details",
      "Upload all required documents (scanned copies)",
      "Review your application carefully before submitting",
      "Submit the application and note down the reference/application number",
      "Track your application status using the reference number"
    ],
    hi: [
      "ऊपर दिए गए लिंक का उपयोग करके आधिकारिक योजना वेबसाइट पर जाएं",
      "'अभी आवेदन करें' या 'रजिस्टर' बटन पर क्लिक करें",
      "सटीक विवरण के साथ आवेदन पत्र भरें",
      "सभी आवश्यक दस्तावेज अपलोड करें (स्कैन की गई प्रतियां)",
      "सबमिट करने से पहले अपने आवेदन की सावधानीपूर्वक समीक्षा करें",
      "आवेदन जमा करें और संदर्भ/आवेदन संख्या नोट करें",
      "संदर्भ संख्या का उपयोग करके अपने आवेदन की स्थिति ट्रैक करें"
    ],
    ta: [
      "மேலே வழங்கப்பட்ட இணைப்பைப் பயன்படுத்தி அதிகாரப்பூர்வ திட்ட வலைதளத்தைப் பார்வையிடவும்",
      "'இப்போது விண்ணப்பிக்கவும்' அல்லது 'பதிவு செய்க' பொத்தானைக் கிளிக் செய்யவும்",
      "துல்லியமான விவரங்களுடன் விண்ணப்ப படிவத்தை நிரப்பவும்",
      "அனைத்து தேவையான ஆவணங்களையும் பதிவேற்றவும் (ஸ்கேன் செய்யப்பட்ட நகல்கள்)",
      "சமர்ப்பிப்பதற்கு முன் உங்கள் விண்ணப்பத்தை கவனமாக மதிப்பாய்வு செய்யவும்",
      "விண்ணப்பத்தை சமர்ப்பித்து குறிப்பு/விண்ணப்ப எண்ணை குறிப்பெடுக்கவும்",
      "குறிப்பு எண்ணைப் பயன்படுத்தி உங்கள் விண்ணப்ப நிலையைக் கண்காணிக்கவும்"
    ]
  };
  
  return steps[lang] || steps.en;
}

// -----------------------------------------
// INIT: Check for direct scheme link
// -----------------------------------------
function initSchemeDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const schemeId = urlParams.get('scheme');
  
  if (schemeId) {
    const checkDB = setInterval(() => {
      if (window._appDB) {
        clearInterval(checkDB);
        showSchemeDetail(parseInt(schemeId));
      }
    }, 100);
  }
  
  document.getElementById('detail-overlay').addEventListener('click', function(e) {
    if (e.target === this) {
      closeSchemeDetail();
    }
  });
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.getElementById('detail-overlay').style.display === 'flex') {
      closeSchemeDetail();
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSchemeDetail);
} else {
  initSchemeDetail();
}

window.handleMarkAsApplied = handleMarkAsApplied;