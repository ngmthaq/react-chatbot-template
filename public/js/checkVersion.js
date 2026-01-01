(async () => {
  try {
    const response = await fetch("/version.json");
    const versionInfo = await response.json();
    console.log("Application Version Information:", versionInfo);
  } catch (error) {
    console.error("Failed to load version info:", error);
  }
})();
