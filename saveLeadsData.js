(function (window, document) {
  const STORAGE_KEY = window.cf_variable.quiz_data_key;
  const savedTags = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

  fetch("http://localhost:8000/api/save-leads-data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: savedTags,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
})(window, document);
