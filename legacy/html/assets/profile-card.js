(() => {
  const root = document.querySelector('[data-profile-reveal]');
  if (!root) return;
  const cover = root.querySelector('.profile-cover');
  const nav = root.querySelector('.profile-socials');
  let pinned = false;
  let gesture = null;
  let dragged = false;
  function show(open) {
    root.classList.toggle('is-open', open);
    cover.setAttribute('aria-expanded', String(open));
    nav.inert = !open;
    nav.setAttribute('aria-hidden', String(!open));
  }
  root.addEventListener('pointerenter', event => {
    if (event.pointerType === 'mouse') show(true);
  });
  root.addEventListener('pointerleave', () => {
    if (!pinned && !gesture && !root.contains(document.activeElement)) show(false);
  });
  root.addEventListener('focusin', () => show(true));
  root.addEventListener('focusout', event => {
    if (!root.contains(event.relatedTarget) && !pinned && !root.matches(':hover')) show(false);
  });
  cover.addEventListener('pointerdown', event => {
    if (!event.isPrimary || event.button !== 0) return;
    dragged = false;
    gesture = {id:event.pointerId, x:event.clientX};
    cover.setPointerCapture(event.pointerId);
    cover.classList.add('is-dragging');
  });
  cover.addEventListener('pointermove', event => {
    if (gesture?.id !== event.pointerId) return;
    const distance = Math.max(-40, Math.min(40, event.clientX - gesture.x));
    cover.style.transform = `translateX(calc(-50% + ${distance}px)) rotate(${distance / 10}deg)`;
    if (Math.abs(event.clientX - gesture.x) >= 12) {
      dragged = true;
      show(true);
    }
  });
  function finish(event) {
    if (gesture?.id !== event.pointerId) return;
    gesture = null;
    cover.classList.remove('is-dragging');
    cover.style.removeProperty('transform');
    if (event.type === 'pointerup' && dragged) pinned = true;
    if (event.type !== 'pointerup') show(pinned);
    if (cover.hasPointerCapture(event.pointerId)) cover.releasePointerCapture(event.pointerId);
  }
  cover.addEventListener('pointerup', finish);
  cover.addEventListener('pointercancel', finish);
  cover.addEventListener('lostpointercapture', finish);
  cover.addEventListener('click', event => {
    if (dragged && event.detail !== 0) { dragged = false; return; }
    pinned = !pinned;
    show(pinned);
  });
  document.addEventListener('pointerdown', event => {
    if (!root.contains(event.target)) { pinned = false; show(false); }
  });
  root.addEventListener('keydown', event => {
    if (event.key === 'Escape') { pinned = false; cover.focus({preventScroll:true}); show(false); }
  });
  show(false);
})();
