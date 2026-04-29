// =========================================
// SCHEME FINDER — voice.js
// Module 6: Voice Search with Speech Recognition
// =========================================

let recognition = null;
let isListening = false;

// -----------------------------------------
// INIT VOICE RECOGNITION
// -----------------------------------------
function initVoiceSearch() {
  // Check browser support
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    console.warn("⚠️ Speech Recognition not supported in this browser");
    return;
  }

  recognition = new SpeechRecognition();
  
  // Configure recognition
  recognition.continuous = false;          // Stop after user finishes speaking
  recognition.interimResults = true;       // Show results while speaking
  recognition.maxAlternatives = 1;

  // Set language based on current UI language
  updateVoiceLanguage();

  // -----------------------------------------
  // EVENT: Recognition starts
  // -----------------------------------------
  recognition.onstart = function() {
    isListening = true;
    const voiceBtn = document.getElementById("voice-btn");
    const searchInput = document.getElementById("search-input");
    
    voiceBtn.classList.add("listening");
    searchInput.placeholder = t("voiceListening");
    searchInput.value = "";
  };

  // -----------------------------------------
  // EVENT: Recognition result (interim or final)
  // -----------------------------------------
  recognition.onresult = function(event) {
    const searchInput = document.getElementById("search-input");
    let transcript = "";
    
    // Get the latest result
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript = event.results[i][0].transcript;
      
      if (event.results[i].isFinal) {
        // Final result - trigger search
        searchInput.value = transcript.trim();
        console.log("🎤 Final transcript:", transcript);
      } else {
        // Interim result - show in real-time
        searchInput.value = transcript;
      }
    }
  };

  // -----------------------------------------
  // EVENT: Recognition ends
  // -----------------------------------------
  recognition.onend = function() {
    isListening = false;
    const voiceBtn = document.getElementById("voice-btn");
    const searchInput = document.getElementById("search-input");
    
    voiceBtn.classList.remove("listening");
    
    // If we got a search query, run the search
    if (searchInput.value.trim()) {
      searchInput.placeholder = t("searchPlaceholder");
      runSearch();
      showToast(t("voiceSearchComplete"), "success");
    } else {
      searchInput.placeholder = t("searchPlaceholder");
      showToast(t("voiceNoInput"), "warning");
    }
  };

  // -----------------------------------------
  // EVENT: Recognition error
  // -----------------------------------------
  recognition.onerror = function(event) {
    isListening = false;
    const voiceBtn = document.getElementById("voice-btn");
    const searchInput = document.getElementById("search-input");
    
    voiceBtn.classList.remove("listening");
    searchInput.placeholder = t("searchPlaceholder");

    console.error("Speech recognition error:", event.error);

    // Show user-friendly error messages
    switch(event.error) {
      case 'no-speech':
        showToast(t("voiceNoSpeech"), "warning");
        break;
      case 'audio-capture':
        showToast(t("voiceNoMic"), "error");
        break;
      case 'not-allowed':
        showToast(t("voiceMicBlocked"), "error");
        break;
      case 'network':
        showToast(t("voiceNetworkError"), "error");
        break;
      default:
        showToast(t("voiceError"), "error");
    }
  };

  console.log("✅ Voice search initialized");
}

// -----------------------------------------
// UPDATE LANGUAGE FOR VOICE RECOGNITION
// -----------------------------------------
function updateVoiceLanguage() {
  if (!recognition) return;
  
  const lang = getCurrentLanguage();
  
  // Map UI language to speech recognition language codes
  const langMap = {
    en: "en-IN",    // English (India)
    hi: "hi-IN",    // Hindi (India)
    ta: "ta-IN"     // Tamil (India)
  };
  
  recognition.lang = langMap[lang] || "en-IN";
  console.log("🎤 Voice language set to:", recognition.lang);
}

// -----------------------------------------
// START VOICE SEARCH
// -----------------------------------------
function startVoiceSearch() {
  // Check if recognition is initialized
  if (!recognition) {
    showToast(t("voiceNotSupported"), "error");
    return;
  }

  // If already listening, stop
  if (isListening) {
    recognition.stop();
    return;
  }

  // Update language before starting (in case user switched UI language)
  updateVoiceLanguage();

  // Start listening
  try {
    recognition.start();
    console.log("🎤 Started listening...");
  } catch (error) {
    console.error("Error starting recognition:", error);
    showToast(t("voiceError"), "error");
  }
}

// -----------------------------------------
// WIRE VOICE BUTTON
// -----------------------------------------
function initVoiceButton() {
  const voiceBtn = document.getElementById("voice-btn");
  
  if (!voiceBtn) {
    console.warn("Voice button not found");
    return;
  }

  // Remove old placeholder listener
  voiceBtn.onclick = null;
  
  // Add new voice search listener
  voiceBtn.addEventListener("click", startVoiceSearch);
  
  // Check if speech recognition is supported
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    voiceBtn.style.opacity = "0.4";
    voiceBtn.style.cursor = "not-allowed";
    voiceBtn.title = "Voice search not supported in this browser";
  } else {
    voiceBtn.title = t("voiceButtonTitle");
  }
}

// -----------------------------------------
// INIT MODULE
// -----------------------------------------
function initVoice() {
  initVoiceSearch();
  initVoiceButton();
}

// Auto-init when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initVoice);
} else {
  initVoice();
}

// Expose function to update language when UI language changes
window._updateVoiceLanguage = updateVoiceLanguage;