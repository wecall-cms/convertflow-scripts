fetch("https://api.ipify.org?format=json")
  .then((response) => response.json())
  .then((ipData) => {
    const userIp = ipData.ip;
    const apiKey = "krx8n0kjnnh701oo257z9u7ik";

    fetch("https://server.adstiacms.com/api/ip-address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ip: userIp,
        key: apiKey,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const savedTags = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            ...savedTags,
            CITY: data.data.city,
            COUNTRY: data.data.country,
            STATE: data.data.state,
            POSTAL_CODE: data.data.postalCode,
            IP_ADDRESS: data.data.ipAddress,
            COUNTRY_CODE: data.data.countryCode
          })
        );
        console.log("Response Data:", data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });

(function (window) {
  const STORAGE_KEY = "quiz_tags";

  function updateQuizTags(fields) {
    const savedTags = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    Object.entries(fields).forEach(([key, value]) => {
      savedTags[key] = value;
    });
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "quiz", data: savedTags });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedTags));
  }

  window.addEventListener("cfAnswer", (event) => {
    updateQuizTags(event.detail.fields.extra);
  });

  window.addEventListener("cfSubmit", (event) => {
    updateQuizTags(event.detail.fields);
  });
})(window);
