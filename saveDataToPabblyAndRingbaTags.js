(function (window, document) {
  const ENDPOINT = "https://webhook.site/0f654462-fa19-497a-a7de-44ade404e57c";
  const STORAGE_KEY = "quiz_tags";

  function sendSavedTags() {
    const savedTags = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

    window._rgba_tags = window._rgba_tags || [];
    Object.entries(savedTags).forEach(([key, value]) => {
      window._rgba_tags.push({ [key]: value });
    });

    fetch(ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tags: savedTags }),
    });
  }

  const btn = document.getElementById("checkEligibility");
  if (btn) {
    btn.addEventListener("click", sendSavedTags);
  }
})(window, document);
