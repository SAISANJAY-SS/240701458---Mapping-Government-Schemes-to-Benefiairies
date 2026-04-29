// =========================================
// SCHEME FINDER — lang.js
// Module 8: Added dashboard translations
// =========================================

const TRANSLATIONS = {
  en: {
    // ... (all previous translations from Module 7)
    // Navbar
    navHome: "Home",
    navSchemes: "Schemes",
    navAbout: "About",
    btnLogin: "Login",
    
    // Hero
    heroTitle: "Find Government Schemes For You",
    heroSubtitle: "Search from 500+ central and state government schemes based on your eligibility",
    searchPlaceholder: "Search schemes (e.g. education, farmer, housing...)",
    btnSearch: "Search",
    
    // Filters
    btnFilters: "⚙️ Filters",
    btnFiltersOpen: "⬆️ Filters",
    btnClearAll: "✕ Clear All",
    btnApplyFilters: "🔍 Apply Filters",
    
    labelCategory: "Category",
    labelState: "State / Level",
    labelGender: "Gender",
    labelAge: "Age Group",
    labelArea: "Area",
    labelSpecialGroups: "Special Groups:",
    
    optAllCategories: "All Categories",
    optAllStates: "All States",
    optAllGenders: "All Genders",
    optAllAges: "All Ages",
    optUrbanRural: "Urban + Rural",
    
    // Categories
    catEducation: "🎓 Education",
    catAgriculture: "🌾 Agriculture",
    catHousing: "🏠 Housing",
    catHealth: "🏥 Health",
    catWomen: "👩 Women Welfare",
    catEmployment: "💼 Employment",
    catPension: "🧓 Pension",
    catDisability: "♿ Disability",
    catElectricity: "💡 Electricity",
    
    // States
    stateCentral: "🇮🇳 Central Government",
    stateTN: "Tamil Nadu",
    stateMH: "Maharashtra",
    stateKA: "Karnataka",
    stateKL: "Kerala",
    
    // Gender
    genderMale: "👨 Male",
    genderFemale: "👩 Female",
    
    // Age groups
    ageChild: "👶 Child (0–18)",
    ageYouth: "🧑 Youth (18–35)",
    ageAdult: "🧔 Adult (35–60)",
    ageSenior: "👴 Senior (60+)",
    
    // Area
    areaUrban: "🏙️ Urban",
    areaRural: "🌿 Rural",
    
    // Special groups
    checkMinority: "🕌 Minority",
    checkDisability: "♿ Disability",
    checkStudent: "🎒 Students Only",
    
    // Scheme cards
    schemesTitle: "Popular Schemes",
    matchingSchemesTitle: "Matching Schemes",
    noSchemesTitle: "No Schemes Found",
    showingSchemes: "Showing {count} scheme{s}",
    btnApply: "Apply Now",
    
    // No results
    noResultsText: "No schemes match your filters",
    noResultsSuggestion: "Try one of these popular searches:",
    
    // Auth
    tabLogin: "Login",
    tabRegister: "Register",
    phEmail: "Email address",
    phPassword: "Password",
    phName: "Full name *",
    phConfirmPassword: "Confirm password *",
    phSelectState: "Select state",
    phGender: "Gender",
    btnLoginSubmit: "Login",
    btnRegisterSubmit: "Create Account",
    authSwitchToRegister: "New here? <a href='#' onclick='switchAuthTab(\"register\");return false;'>Create an account</a>",
    authSwitchToLogin: "Already registered? <a href='#' onclick='switchAuthTab(\"login\");return false;'>Login</a>",
    
    // Profile
    profileTitle: "👤 My Profile",
    savedSchemesTitle: "❤️ My Saved Schemes",
    statSavedSchemes: "Saved Schemes",
    statState: "State",
    statGender: "Gender",
    btnLogout: "🚪 Logout",
    btnRemove: "Remove",
    btnApplyMini: "Apply",
    
    dropdownProfile: "👤 My Profile",
    dropdownSaved: "❤️ Saved Schemes",
    dropdownLogout: "🚪 Logout",
    dropdownDashboard: "📊 Dashboard", // ⭐ NEW
    
    noSavedText: "You haven't saved any schemes yet.",
    noSavedHint: "Click the ❤️ button on any scheme card to save it.",
    
    // Toast messages
    toastWelcome: "Welcome back, {name}! 👋",
    toastLogout: "You have been logged out.",
    toastSaved: "Scheme saved! ❤️",
    toastRemoved: "Removed from saved schemes.",
    toastLoginRequired: "Please login to save schemes.",
    
    // Voice search
    voiceButtonTitle: "Voice Search - Click and speak",
    voiceListening: "🎤 Listening... speak now",
    voiceSearchComplete: "Voice search complete!",
    voiceNoInput: "No speech detected. Please try again.",
    voiceNoSpeech: "No speech was detected. Please try again.",
    voiceNoMic: "No microphone found. Please check your device.",
    voiceMicBlocked: "Microphone access denied. Please allow microphone access.",
    voiceNetworkError: "Network error. Please check your connection.",
    voiceError: "Voice search failed. Please try again.",
    voiceNotSupported: "Voice search is not supported in this browser.",
    
    // Detail page
    detailOverview: "Overview",
    detailBenefit: "Benefit",
    detailState: "State/Level",
    detailGender: "Gender",
    detailAge: "Age Group",
    detailEligibility: "Eligibility Criteria",
    detailDocuments: "Documents Required",
    detailHowToApply: "How to Apply",
    detailLinks: "Important Links",
    detailOfficialWebsite: "Official Website",
    detailHelpline: "Helpline",
    detailSaveScheme: "Save Scheme",
    detailShare: "Share",
    detailPrint: "Print",
    detailMarkApplied: "Mark as Applied", // ⭐ NEW
    detailShareText: "Check out this government scheme",
    detailShareSuccess: "Shared successfully!",
    detailCopySuccess: "Link copied to clipboard!",
    detailCopyError: "Could not copy link. Please copy manually.",
    
    // ⭐ Dashboard (NEW)
    dashboardTitle: "My Dashboard",
    dashboardWelcome: "Welcome back, {name}!",
    dashboardBackToHome: "Back to Home",
    dashboardSavedSchemes: "Saved Schemes",
    dashboardApplications: "Applications",
    dashboardApproved: "Approved",
    dashboardRecommendations: "Recommendations",
    dashboardQuickActions: "Quick Actions",
    dashboardSearchSchemes: "Search Schemes",
    dashboardCompareSchemes: "Compare Schemes",
    dashboardMyProfile: "My Profile",
    dashboardPrintReport: "Print Report",
    dashboardViewAll: "View All",
    dashboardNoApplications: "No applications yet. Start applying to schemes!",
    dashboardNoRecommendations: "Check back later for personalized recommendations.",
    dashboardRecommended: "Recommended",
    dashboardMatchScore: "Match Score",
    dashboardProfileSummary: "Profile Summary",
    dashboardEditProfile: "Edit Profile",
    dashboardStatus: "Status",
    dashboardReference: "Reference",
    dashboardToday: "Today",
    dashboardYesterday: "Yesterday",
    dashboardDaysAgo: "days ago",
    dashboardStatusPending: "Pending Review",
    dashboardStatusApproved: "Approved ✅",
    dashboardStatusRejected: "Rejected ❌",
    dashboardStatusReview: "Under Review",
    dashboardApplicationAdded: "Application tracked successfully!",
    dashboardNeedTwoSchemes: "Please save at least 2 schemes to compare.",
    dashboardCompareInstructions: "Select 2-3 schemes to compare side by side:",
    dashboardSelected: "Selected",
    dashboardCompareButton: "Compare Selected Schemes",
    dashboardMaxThreeSchemes: "You can compare maximum 3 schemes at a time.",
    dashboardSchemeComparison: "Scheme Comparison",
    dashboardCompareFeature: "Feature",
    
    // Footer
    footerCopyright: "© 2025 SchemeFinder | Built for citizens of India",
    footerSource: "Data sourced from official government portals"
  },
  
  hi: {
    // ... (all previous Hindi translations)
    // I'll show only the NEW dashboard ones for brevity
    navHome: "होम",
    navSchemes: "योजनाएं",
    navAbout: "हमारे बारे में",
    btnLogin: "लॉगिन",
    
    heroTitle: "अपने लिए सरकारी योजनाएं खोजें",
    heroSubtitle: "अपनी पात्रता के आधार पर 500+ केंद्रीय और राज्य सरकार की योजनाओं में खोजें",
    searchPlaceholder: "योजना खोजें (जैसे शिक्षा, किसान, आवास...)",
    btnSearch: "खोजें",
    
    btnFilters: "⚙️ फ़िल्टर",
    btnFiltersOpen: "⬆️ फ़िल्टर",
    btnClearAll: "✕ सभी हटाएं",
    btnApplyFilters: "🔍 फ़िल्टर लागू करें",
    
    labelCategory: "श्रेणी",
    labelState: "राज्य / स्तर",
    labelGender: "लिंग",
    labelAge: "आयु वर्ग",
    labelArea: "क्षेत्र",
    labelSpecialGroups: "विशेष समूह:",
    
    optAllCategories: "सभी श्रेणियाँ",
    optAllStates: "सभी राज्य",
    optAllGenders: "सभी लिंग",
    optAllAges: "सभी आयु",
    optUrbanRural: "शहरी + ग्रामीण",
    
    catEducation: "🎓 शिक्षा",
    catAgriculture: "🌾 कृषि",
    catHousing: "🏠 आवास",
    catHealth: "🏥 स्वास्थ्य",
    catWomen: "👩 महिला कल्याण",
    catEmployment: "💼 रोजगार",
    catPension: "🧓 पेंशन",
    catDisability: "♿ विकलांगता",
    catElectricity: "💡 बिजली",
    
    stateCentral: "🇮🇳 केंद्र सरकार",
    stateTN: "तमिलनाडु",
    stateMH: "महाराष्ट्र",
    stateKA: "कर्नाटक",
    stateKL: "केरल",
    
    genderMale: "👨 पुरुष",
    genderFemale: "👩 महिला",
    
    ageChild: "👶 बच्चे (0–18)",
    ageYouth: "🧑 युवा (18–35)",
    ageAdult: "🧔 वयस्क (35–60)",
    ageSenior: "👴 वरिष्ठ (60+)",
    
    areaUrban: "🏙️ शहरी",
    areaRural: "🌿 ग्रामीण",
    
    checkMinority: "🕌 अल्पसंख्यक",
    checkDisability: "♿ विकलांगता",
    checkStudent: "🎒 केवल छात्र",
    
    schemesTitle: "लोकप्रिय योजनाएं",
    matchingSchemesTitle: "मिलान योजनाएं",
    noSchemesTitle: "कोई योजना नहीं मिली",
    showingSchemes: "{count} योजना{s} दिखा रहे हैं",
    btnApply: "आवेदन करें",
    
    noResultsText: "आपके फ़िल्टर से कोई योजना मेल नहीं खाती",
    noResultsSuggestion: "इनमें से कोई एक लोकप्रिय खोज आज़माएं:",
    
    tabLogin: "लॉगिन",
    tabRegister: "रजिस्टर",
    phEmail: "ईमेल पता",
    phPassword: "पासवर्ड",
    phName: "पूरा नाम *",
    phConfirmPassword: "पासवर्ड की पुष्टि करें *",
    phSelectState: "राज्य चुनें",
    phGender: "लिंग",
    btnLoginSubmit: "लॉगिन करें",
    btnRegisterSubmit: "खाता बनाएं",
    authSwitchToRegister: "नए हैं? <a href='#' onclick='switchAuthTab(\"register\");return false;'>खाता बनाएं</a>",
    authSwitchToLogin: "पहले से रजिस्टर्ड? <a href='#' onclick='switchAuthTab(\"login\");return false;'>लॉगिन करें</a>",
    
    profileTitle: "👤 मेरी प्रोफ़ाइल",
    savedSchemesTitle: "❤️ मेरी सहेजी गई योजनाएं",
    statSavedSchemes: "सहेजी गई योजनाएं",
    statState: "राज्य",
    statGender: "लिंग",
    btnLogout: "🚪 लॉगआउट",
    btnRemove: "हटाएं",
    btnApplyMini: "आवेदन करें",
    
    dropdownProfile: "👤 मेरी प्रोफ़ाइल",
    dropdownSaved: "❤️ सहेजी गई योजनाएं",
    dropdownLogout: "🚪 लॉगआउट",
    dropdownDashboard: "📊 डैशबोर्ड",
    
    noSavedText: "आपने अभी तक कोई योजना सहेजी नहीं है।",
    noSavedHint: "इसे सहेजने के लिए किसी भी योजना कार्ड पर ❤️ बटन क्लिक करें।",
    
    toastWelcome: "वापसी पर स्वागत है, {name}! 👋",
    toastLogout: "आप लॉग आउट हो गए हैं।",
    toastSaved: "योजना सहेजी गई! ❤️",
    toastRemoved: "सहेजी गई योजनाओं से हटाया गया।",
    toastLoginRequired: "योजनाओं को सहेजने के लिए कृपया लॉगिन करें।",
    
    voiceButtonTitle: "आवाज खोज - क्लिक करें और बोलें",
    voiceListening: "🎤 सुन रहे हैं... अब बोलें",
    voiceSearchComplete: "आवाज खोज पूर्ण!",
    voiceNoInput: "कोई आवाज नहीं मिली। कृपया पुनः प्रयास करें।",
    voiceNoSpeech: "कोई वाणी नहीं मिली। कृपया पुनः प्रयास करें।",
    voiceNoMic: "कोई माइक्रोफ़ोन नहीं मिला। कृपया अपना डिवाइस जांचें।",
    voiceMicBlocked: "माइक्रोफ़ोन एक्सेस अस्वीकृत। कृपया माइक्रोफ़ोन एक्सेस की अनुमति दें।",
    voiceNetworkError: "नेटवर्क त्रुटि। कृपया अपना कनेक्शन जांचें।",
    voiceError: "आवाज खोज विफल। कृपया पुनः प्रयास करें।",
    voiceNotSupported: "इस ब्राउज़र में आवाज खोज समर्थित नहीं है।",
    
    detailOverview: "अवलोकन",
    detailBenefit: "लाभ",
    detailState: "राज्य/स्तर",
    detailGender: "लिंग",
    detailAge: "आयु वर्ग",
    detailEligibility: "पात्रता मानदंड",
    detailDocuments: "आवश्यक दस्तावेज",
    detailHowToApply: "आवेदन कैसे करें",
    detailLinks: "महत्वपूर्ण लिंक",
    detailOfficialWebsite: "आधिकारिक वेबसाइट",
    detailHelpline: "हेल्पलाइन",
    detailSaveScheme: "योजना सहेजें",
    detailShare: "साझा करें",
    detailPrint: "प्रिंट करें",
    detailMarkApplied: "आवेदित के रूप में चिह्नित करें",
    detailShareText: "इस सरकारी योजना को देखें",
    detailShareSuccess: "सफलतापूर्वक साझा किया गया!",
    detailCopySuccess: "लिंक क्लिपबोर्ड पर कॉपी किया गया!",
    detailCopyError: "लिंक कॉपी नहीं हो सका। कृपया मैन्युअल रूप से कॉपी करें।",
    
    // Dashboard
    dashboardTitle: "मेरा डैशबोर्ड",
    dashboardWelcome: "वापसी पर स्वागत है, {name}!",
    dashboardBackToHome: "होम पर वापस जाएं",
    dashboardSavedSchemes: "सहेजी गई योजनाएं",
    dashboardApplications: "आवेदन",
    dashboardApproved: "स्वीकृत",
    dashboardRecommendations: "सिफारिशें",
    dashboardQuickActions: "त्वरित क्रियाएं",
    dashboardSearchSchemes: "योजनाएं खोजें",
    dashboardCompareSchemes: "योजनाओं की तुलना करें",
    dashboardMyProfile: "मेरी प्रोफ़ाइल",
    dashboardPrintReport: "रिपोर्ट प्रिंट करें",
    dashboardViewAll: "सभी देखें",
    dashboardNoApplications: "अभी तक कोई आवेदन नहीं। योजनाओं के लिए आवेदन करना शुरू करें!",
    dashboardNoRecommendations: "व्यक्तिगत सिफारिशों के लिए बाद में देखें।",
    dashboardRecommended: "अनुशंसित",
    dashboardMatchScore: "मिलान स्कोर",
    dashboardProfileSummary: "प्रोफ़ाइल सारांश",
    dashboardEditProfile: "प्रोफ़ाइल संपादित करें",
    dashboardStatus: "स्थिति",
    dashboardReference: "संदर्भ",
    dashboardToday: "आज",
    dashboardYesterday: "कल",
    dashboardDaysAgo: "दिन पहले",
    dashboardStatusPending: "समीक्षाधीन",
    dashboardStatusApproved: "स्वीकृत ✅",
    dashboardStatusRejected: "अस्वीकृत ❌",
    dashboardStatusReview: "समीक्षा के तहत",
    dashboardApplicationAdded: "आवेदन सफलतापूर्वक ट्रैक किया गया!",
    dashboardNeedTwoSchemes: "तुलना करने के लिए कृपया कम से कम 2 योजनाएं सहेजें।",
    dashboardCompareInstructions: "साइड बाय साइड तुलना के लिए 2-3 योजनाएं चुनें:",
    dashboardSelected: "चयनित",
    dashboardCompareButton: "चयनित योजनाओं की तुलना करें",
    dashboardMaxThreeSchemes: "आप एक समय में अधिकतम 3 योजनाओं की तुलना कर सकते हैं।",
    dashboardSchemeComparison: "योजना तुलना",
    dashboardCompareFeature: "विशेषता",
    
    footerCopyright: "© 2025 SchemeFinder | भारत के नागरिकों के लिए बनाया गया",
    footerSource: "आधिकारिक सरकारी पोर्टलों से डेटा प्राप्त किया गया"
  },
  
  ta: {
    // ... (all previous Tamil translations + new dashboard ones)
    navHome: "முகப்பு",
    navSchemes: "திட்டங்கள்",
    navAbout: "பற்றி",
    btnLogin: "உள்நுழை",
    
    heroTitle: "உங்களுக்கான அரசாங்க திட்டங்களைக் கண்டறியுங்கள்",
    heroSubtitle: "உங்கள் தகுதியின் அடிப்படையில் 500+ மத்திய மற்றும் மாநில அரசு திட்டங்களைத் தேடுங்கள்",
    searchPlaceholder: "திட்டங்களைத் தேடுங்கள் (எ.கா. கல்வி, விவசாயி, வீட்டுவசதி...)",
    btnSearch: "தேடு",
    
    btnFilters: "⚙️ வடிகட்டிகள்",
    btnFiltersOpen: "⬆️ வடிகட்டிகள்",
    btnClearAll: "✕ அனைத்தையும் அழி",
    btnApplyFilters: "🔍 வடிகட்டிகளைப் பயன்படுத்து",
    
    labelCategory: "வகை",
    labelState: "மாநிலம் / நிலை",
    labelGender: "பாலினம்",
    labelAge: "வயது குழு",
    labelArea: "பகுதி",
    labelSpecialGroups: "சிறப்பு குழுக்கள்:",
    
    optAllCategories: "அனைத்து வகைகள்",
    optAllStates: "அனைத்து மாநிலங்கள்",
    optAllGenders: "அனைத்து பாலினங்கள்",
    optAllAges: "அனைத்து வயதினர்",
    optUrbanRural: "நகர்ப்புற + கிராமப்புற",
    
    catEducation: "🎓 கல்வி",
    catAgriculture: "🌾 விவசாயம்",
    catHousing: "🏠 வீட்டுவசதி",
    catHealth: "🏥 சுகாதாரம்",
    catWomen: "👩 மகளிர் நலன்",
    catEmployment: "💼 வேலைவாய்ப்பு",
    catPension: "🧓 ஓய்வூதியம்",
    catDisability: "♿ மாற்றுத்திறன்",
    catElectricity: "💡 மின்சாரம்",
    
    stateCentral: "🇮🇳 மத்திய அரசு",
    stateTN: "தமிழ்நாடு",
    stateMH: "மகாராஷ்டிரா",
    stateKA: "கர்நாடகா",
    stateKL: "கேரளா",
    
    genderMale: "👨 ஆண்",
    genderFemale: "👩 பெண்",
    
    ageChild: "👶 குழந்தை (0–18)",
    ageYouth: "🧑 இளைஞர் (18–35)",
    ageAdult: "🧔 வயது வந்தோர் (35–60)",
    ageSenior: "👴 மூத்தோர் (60+)",
    
    areaUrban: "🏙️ நகர்ப்புறம்",
    areaRural: "🌿 கிராமப்புறம்",
    
    checkMinority: "🕌 சிறுபான்மையினர்",
    checkDisability: "♿ மாற்றுத்திறன்",
    checkStudent: "🎒 மாணவர்கள் மட்டும்",
    
    schemesTitle: "பிரபலமான திட்டங்கள்",
    matchingSchemesTitle: "பொருந்தும் திட்டங்கள்",
    noSchemesTitle: "திட்டங்கள் எதுவும் இல்லை",
    showingSchemes: "{count} திட்டங்கள்{s} காட்டப்படுகின்றன",
    btnApply: "இப்போது விண்ணப்பிக்கவும்",
    
    noResultsText: "உங்கள் வடிகட்டிகளுக்கு எந்த திட்டமும் பொருந்தவில்லை",
    noResultsSuggestion: "இந்த பிரபலமான தேடல்களில் ஒன்றை முயற்சிக்கவும்:",
    
    tabLogin: "உள்நுழைக",
    tabRegister: "பதிவு செய்க",
    phEmail: "மின்னஞ்சல் முகவரி",
    phPassword: "கடவுச்சொல்",
    phName: "முழு பெயர் *",
    phConfirmPassword: "கடவுச்சொல்லை உறுதிப்படுத்தவும் *",
    phSelectState: "மாநிலத்தைத் தேர்ந்தெடுக்கவும்",
    phGender: "பாலினம்",
    btnLoginSubmit: "உள்நுழைக",
    btnRegisterSubmit: "கணக்கை உருவாக்கு",
    authSwitchToRegister: "புதியதா? <a href='#' onclick='switchAuthTab(\"register\");return false;'>கணக்கை உருவாக்கு</a>",
    authSwitchToLogin: "ஏற்கனவே பதிவு செய்துள்ளீர்களா? <a href='#' onclick='switchAuthTab(\"login\");return false;'>உள்நுழைக</a>",
    
    profileTitle: "👤 எனது சுயவிவரம்",
    savedSchemesTitle: "❤️ எனது சேமித்த திட்டங்கள்",
    statSavedSchemes: "சேமித்த திட்டங்கள்",
    statState: "மாநிலம்",
    statGender: "பாலினம்",
    btnLogout: "🚪 வெளியேறு",
    btnRemove: "அகற்று",
    btnApplyMini: "விண்ணப்பிக்கவும்",
    
    dropdownProfile: "👤 எனது சுயவிவரம்",
    dropdownSaved: "❤️ சேமித்த திட்டங்கள்",
    dropdownLogout: "🚪 வெளியேறு",
    dropdownDashboard: "📊 டாஷ்போர்டு",
    
    noSavedText: "நீங்கள் இன்னும் எந்த திட்டத்தையும் சேமிக்கவில்லை.",
    noSavedHint: "அதை சேமிக்க எந்த திட்ட அட்டையிலும் ❤️ பொத்தானைக் கிளிக் செய்யவும்.",
    
    toastWelcome: "மீண்டும் வரவேற்கிறோம், {name}! 👋",
    toastLogout: "நீங்கள் வெளியேற்றப்பட்டீர்கள்.",
    toastSaved: "திட்டம் சேமிக்கப்பட்டது! ❤️",
    toastRemoved: "சேமித்த திட்டங்களிலிருந்து அகற்றப்பட்டது.",
    toastLoginRequired: "திட்டங்களைச் சேமிக்க உள்நுழையவும்.",
    
    voiceButtonTitle: "குரல் தேடல் - கிளிக் செய்து பேசுங்கள்",
    voiceListening: "🎤 கேட்கிறது... இப்போது பேசுங்கள்",
    voiceSearchComplete: "குரல் தேடல் முடிந்தது!",
    voiceNoInput: "எந்த பேச்சும் கண்டறியப்படவில்லை. மீண்டும் முயற்சிக்கவும்.",
    voiceNoSpeech: "எந்த பேச்சும் கண்டறியப்படவில்லை. மீண்டும் முயற்சிக்கவும்.",
    voiceNoMic: "மைக்ரோஃபோன் இல்லை. உங்கள் சாதனத்தைச் சரிபார்க்கவும்.",
    voiceMicBlocked: "மைக்ரோஃபோன் அணுகல் மறுக்கப்பட்டது. மைக்ரோஃபோன் அணுகலை அனுமதிக்கவும்.",
    voiceNetworkError: "நெட்வொர்க் பிழை. உங்கள் இணைப்பைச் சரிபார்க்கவும்.",
    voiceError: "குரல் தேடல் தோல்வியடைந்தது. மீண்டும் முயற்சிக்கவும்.",
    voiceNotSupported: "இந்த உலாவியில் குரல் தேடல் ஆதரிக்கப்படவில்லை.",
    
    detailOverview: "மேலோட்டம்",
    detailBenefit: "பலன்",
    detailState: "மாநிலம்/நிலை",
    detailGender: "பாலினம்",
    detailAge: "வயது குழு",
    detailEligibility: "தகுதி விதிமுறைகள்",
    detailDocuments: "தேவையான ஆவணங்கள்",
    detailHowToApply: "எவ்வாறு விண்ணப்பிக்க வேண்டும்",
    detailLinks: "முக்கியமான இணைப்புகள்",
    detailOfficialWebsite: "அதிகாரப்பூர்வ இணையதளம்",
    detailHelpline: "உதவி எண்",
    detailSaveScheme: "திட்டத்தைச் சேமிக்கவும்",
    detailShare: "பகிர்",
    detailPrint: "அச்சிடு",
    detailMarkApplied: "விண்ணப்பித்ததாகக் குறிக்கவும்",
    detailShareText: "இந்த அரசாங்க திட்டத்தைப் பாருங்கள்",
    detailShareSuccess: "வெற்றிகரமாகப் பகிரப்பட்டது!",
    detailCopySuccess: "இணைப்பு கிளிப்போர்டுக்கு நகலெடுக்கப்பட்டது!",
    detailCopyError: "இணைப்பை நகலெடுக்க முடியவில்லை. கைமுறையாக நகலெடுக்கவும்.",
    
    // Dashboard
    dashboardTitle: "எனது டாஷ்போர்டு",
    dashboardWelcome: "மீண்டும் வரவேற்கிறோம், {name}!",
    dashboardBackToHome: "முகப்புக்குத் திரும்பு",
    dashboardSavedSchemes: "சேமித்த திட்டங்கள்",
    dashboardApplications: "விண்ணப்பங்கள்",
    dashboardApproved: "அங்கீகரிக்கப்பட்டது",
    dashboardRecommendations: "பரிந்துரைகள்",
    dashboardQuickActions: "விரைவு செயல்கள்",
    dashboardSearchSchemes: "திட்டங்களைத் தேடு",
    dashboardCompareSchemes: "திட்டங்களை ஒப்பிடு",
    dashboardMyProfile: "எனது சுயவிவரம்",
    dashboardPrintReport: "அறிக்கையை அச்சிடு",
    dashboardViewAll: "அனைத்தையும் பார்",
    dashboardNoApplications: "இன்னும் விண்ணப்பங்கள் இல்லை. திட்டங்களுக்கு விண்ணப்பிக்கத் தொடங்குங்கள்!",
    dashboardNoRecommendations: "தனிப்பட்ட பரிந்துரைகளுக்கு பின்னர் சரிபார்க்கவும்.",
    dashboardRecommended: "பரிந்துரைக்கப்பட்டது",
    dashboardMatchScore: "பொருத்த மதிப்பெண்",
    dashboardProfileSummary: "சுயவிவர சுருக்கம்",
    dashboardEditProfile: "சுயவிவரத்தைத் திருத்து",
    dashboardStatus: "நிலை",
    dashboardReference: "குறிப்பு",
    dashboardToday: "இன்று",
    dashboardYesterday: "நேற்று",
    dashboardDaysAgo: "நாட்களுக்கு முன்பு",
    dashboardStatusPending: "மதிப்பாய்வு நிலுவையில்",
    dashboardStatusApproved: "அங்கீகரிக்கப்பட்டது ✅",
    dashboardStatusRejected: "நிராகரிக்கப்பட்டது ❌",
    dashboardStatusReview: "மதிப்பாய்வில் உள்ளது",
    dashboardApplicationAdded: "விண்ணப்பம் வெற்றிகரமாகக் கண்காணிக்கப்பட்டது!",
    dashboardNeedTwoSchemes: "ஒப்பிட குறைந்தபட்சம் 2 திட்டங்களைச் சேமிக்கவும்.",
    dashboardCompareInstructions: "அருகருகே ஒப்பிட 2-3 திட்டங்களைத் தேர்ந்தெடுக்கவும்:",
    dashboardSelected: "தேர்ந்தெடுக்கப்பட்டது",
    dashboardCompareButton: "தேர்ந்தெடுத்த திட்டங்களை ஒப்பிடு",
    dashboardMaxThreeSchemes: "நீங்கள் ஒரு நேரத்தில் அதிகபட்சம் 3 திட்டங்களை ஒப்பிடலாம்.",
    dashboardSchemeComparison: "திட்ட ஒப்பீடு",
    dashboardCompareFeature: "அம்சம்",
    
    footerCopyright: "© 2025 SchemeFinder | இந்திய குடிமக்களுக்காக உருவாக்கப்பட்டது",
    footerSource: "அதிகாரப்பூர்வ அரசு போர்ட்டல்களிலிருந்து பெறப்பட்ட தரவு"
  }
};

// ... (rest of lang.js stays the same - getCurrentLanguage, setLanguage, applyTranslations, etc.)

function getCurrentLanguage() {
  return localStorage.getItem("lang") || "en";
}

function setLanguage(lang) {
  if (!TRANSLATIONS[lang]) lang = "en";
  localStorage.setItem("lang", lang);
  document.getElementById("lang-select").value = lang;
  applyTranslations(lang);
  
  if (window._updateVoiceLanguage) window._updateVoiceLanguage();
}

function applyTranslations(lang) {
  const t = TRANSLATIONS[lang];
  
  setText("nav-home", t.navHome);
  setText("nav-schemes", t.navSchemes);
  setText("nav-about", t.navAbout);
  
  const user = getSession();
  if (!user) {
    setText("login-btn", t.btnLogin);
  }
  
  setText("hero-title", t.heroTitle);
  setText("hero-subtitle", t.heroSubtitle);
  setPlaceholder("search-input", t.searchPlaceholder);
  setText("search-btn", t.btnSearch);
  
  setText("filter-label-category", t.labelCategory);
  setText("filter-label-state", t.labelState);
  setText("filter-label-gender", t.labelGender);
  setText("filter-label-age", t.labelAge);
  setText("filter-label-area", t.labelArea);
  setText("filter-label-special", t.labelSpecialGroups);
  
  setOptionText("filter-category", "", t.optAllCategories);
  setOptionText("filter-category", "education", t.catEducation);
  setOptionText("filter-category", "agriculture", t.catAgriculture);
  setOptionText("filter-category", "housing", t.catHousing);
  setOptionText("filter-category", "health", t.catHealth);
  setOptionText("filter-category", "women", t.catWomen);
  setOptionText("filter-category", "employment", t.catEmployment);
  setOptionText("filter-category", "pension", t.catPension);
  setOptionText("filter-category", "disability", t.catDisability);
  setOptionText("filter-category", "electricity", t.catElectricity);
  
  setOptionText("filter-state", "", t.optAllStates);
  setOptionText("filter-state", "central", t.stateCentral);
  setOptionText("filter-state", "tamilnadu", t.stateTN);
  setOptionText("filter-state", "maharashtra", t.stateMH);
  setOptionText("filter-state", "karnataka", t.stateKA);
  setOptionText("filter-state", "kerala", t.stateKL);
  
  setOptionText("filter-gender", "", t.optAllGenders);
  setOptionText("filter-gender", "male", t.genderMale);
  setOptionText("filter-gender", "female", t.genderFemale);
  
  setOptionText("filter-age", "", t.optAllAges);
  setOptionText("filter-age", "child", t.ageChild);
  setOptionText("filter-age", "youth", t.ageYouth);
  setOptionText("filter-age", "adult", t.ageAdult);
  setOptionText("filter-age", "senior", t.ageSenior);
  
  setOptionText("filter-area", "", t.optUrbanRural);
  setOptionText("filter-area", "urban", t.areaUrban);
  setOptionText("filter-area", "rural", t.areaRural);
  
  setLabelText("filter-minority", t.checkMinority);
  setLabelText("filter-disability", t.checkDisability);
  setLabelText("filter-student", t.checkStudent);
  
  const toggleBtn = document.getElementById("toggle-filters-btn");
  if (toggleBtn) {
    const isOpen = document.getElementById("filter-panel").classList.contains("open");
    toggleBtn.querySelector("span:first-child").textContent = isOpen ? t.btnFiltersOpen : t.btnFilters;
  }
  
  setText("apply-filter-btn", t.btnApplyFilters);
  setText("clear-filter-btn", t.btnClearAll);
  
  const voiceBtn = document.getElementById("voice-btn");
  if (voiceBtn && voiceBtn.title !== "Voice search not supported in this browser") {
    voiceBtn.title = t.voiceButtonTitle;
  }
  
  const footerP = document.querySelectorAll(".footer p");
  if (footerP[0]) footerP[0].textContent = t.footerCopyright;
  if (footerP[1]) footerP[1].textContent = t.footerSource;
  
  if (window._refreshCards) window._refreshCards();
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function setPlaceholder(id, text) {
  const el = document.getElementById(id);
  if (el) el.placeholder = text;
}

function setOptionText(selectId, value, text) {
  const select = document.getElementById(selectId);
  if (!select) return;
  const option = select.querySelector(`option[value="${value}"]`);
  if (option) option.textContent = text;
}

function setLabelText(inputId, text) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const label = input.closest("label");
  if (label) {
    const span = label.querySelector("span");
    if (span) span.textContent = text;
  }
}

function t(key) {
  const lang = getCurrentLanguage();
  return TRANSLATIONS[lang][key] || TRANSLATIONS.en[key] || key;
}

function initLanguage() {
  const savedLang = getCurrentLanguage();
  document.getElementById("lang-select").value = savedLang;
  applyTranslations(savedLang);
  
  document.getElementById("lang-select").addEventListener("change", function() {
    setLanguage(this.value);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLanguage);
} else {
  initLanguage();
}