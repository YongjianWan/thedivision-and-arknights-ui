let overlayCount = 0;

export function lockOverlay() {
  overlayCount += 1;
  document.body.dataset.overlayOpen = 'true';
}

export function unlockOverlay() {
  overlayCount = Math.max(0, overlayCount - 1);
  if (overlayCount === 0) {
    delete document.body.dataset.overlayOpen;
  }
}
