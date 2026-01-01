(async () => {
  try {
    const response = await fetch("/env.json");
    const envConfig = await response.json();

    for (const [key, value] of Object.entries(envConfig)) {
      if (!window["__ENV__"]) window["__ENV__"] = {};
      window["__ENV__"][key] = value;
    }
  } catch (error) {
    console.error("Error setting up environment:", error);
  }
})();
