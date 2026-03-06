import { track } from "@vercel/analytics";
import { getBucket } from "@/utils/getBucket";

let startTime = Date.now();
let hasFired = false;

function fireTimeOnPage() {
  if (hasFired) return;
  hasFired = true;

  const seconds = Math.round((Date.now() - startTime) / 1000);
  track("time_on_page", {
    path: window.location.pathname,
    duration: getBucket(seconds),
  });
}

function resetTimer() {
  startTime = Date.now();
  hasFired = false;
}

// Fire when tab becomes hidden (tab close, app switch, phone lock)
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    fireTimeOnPage();
  }
});

// Fire before Astro View Transition navigation
document.addEventListener("astro:before-preparation", () => {
  fireTimeOnPage();
});

// Reset timer on new page load (View Transitions)
document.addEventListener("astro:page-load", () => {
  resetTimer();
});
