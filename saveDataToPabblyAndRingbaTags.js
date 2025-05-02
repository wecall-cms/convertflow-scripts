(function (window, document) {
  const STORAGE_KEY = "quiz_tags";

  function sendSavedTags() {
    const savedTags = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

    window._rgba_tags = window._rgba_tags || [];
    Object.entries(savedTags).forEach(([key, value]) => {
      window._rgba_tags.push({ [key]: value });
    });

    fetch("https://server.adstiacms.com/api/pabbly", {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tags: { url: ENDPOINT, data: savedTags } }),
    });
  }

  const btn = document.getElementById("checkEligibility");
  if (btn) {
    btn.addEventListener("click", sendSavedTags);
  }
})(window, document);
