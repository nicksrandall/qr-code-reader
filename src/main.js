import App from "./App.svelte";

const app = new App({
  target: document.getElementById("root"),
  props: {}
});

// Check that service workers are registered
if ("serviceWorker" in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}

export default app;
