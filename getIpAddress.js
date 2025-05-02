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
        console.log("Response Data:", data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });
