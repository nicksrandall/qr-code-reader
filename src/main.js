import App from "./App.svelte";

const app = new App({
  target: document.getElementById("root"),
  props: {}
});

// Check that service workers are registered
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js");
}

export default app;
