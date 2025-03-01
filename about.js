// about.js

document.addEventListener('DOMContentLoaded', function() {
  // If you have a contact popup or any other global script logic, do it here
  // For example:
  const contactBtn = document.getElementById('nav-contact');
  const contactPopup = document.getElementById('contact-popup');
  const popupOverlay = document.getElementById('popup-overlay');
  const closePopup = document.querySelector('.close-popup');

  if (contactBtn) {
    contactBtn.addEventListener('click', function(e) {
      e.preventDefault();
      contactPopup.style.display = 'block';
      popupOverlay.style.display = 'block';
    });
  }
  function hidePopup() {
    contactPopup.style.display = 'none';
    popupOverlay.style.display = 'none';
  }
  if (closePopup) {
    closePopup.addEventListener('click', hidePopup);
  }
  if (popupOverlay) {
    popupOverlay.addEventListener('click', hidePopup);
  }
});