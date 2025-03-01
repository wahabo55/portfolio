document.addEventListener('DOMContentLoaded', function() {
  // Contact Popup
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
      if (contactPopup && popupOverlay) {
          contactPopup.style.display = 'none';
          popupOverlay.style.display = 'none';
      }
  }

  if (closePopup) {
      closePopup.addEventListener('click', hidePopup);
  }
  if (popupOverlay) {
      popupOverlay.addEventListener('click', hidePopup);
  }

  // Improved accordion functionality
  const accordionCards = document.querySelectorAll('.accordion-card');
  
  function toggleAccordion(card, event) {
      // Prevent any default behavior
      event.preventDefault();
      event.stopPropagation();
      const chatWindow = document.querySelector('.chat-window');
      if (chatWindow && chatWindow.classList.contains('open')) {
          chatWindow.classList.remove('open');
          // Also remove expanded if set
          if (chatWindow.classList.contains('expanded')) {
              chatWindow.classList.remove('expanded');
          }
      }

      // Close other cards
      accordionCards.forEach(other => {
          if (other !== card) {
              other.classList.remove('active');
              // Reset height of other card contents
              const otherContent = other.querySelector('.accordion-content');
              if (otherContent) {
                  otherContent.style.maxHeight = '0';
              }
          }
      });

      // Toggle current card
      card.classList.toggle('active');
      
      // Handle content height
      const content = card.querySelector('.accordion-content');
      if (content) {
          if (card.classList.contains('active')) {
              content.style.maxHeight = content.scrollHeight + 'px';
              // Adjust card height to fit content
              card.style.height = 'auto';
          } else {
              content.style.maxHeight = '0';
              // Reset card height
              
          }
      }
  }

  // Add event listeners for both click and touch
  accordionCards.forEach(card => {
      const header = card.querySelector('.accordion-card-header');
      
      if (header) {
          // Combined event listener for both touch and click
          ['click', 'touchend'].forEach(eventType => {
              header.addEventListener(eventType, (e) => {
                  toggleAccordion(card, e);
              }, { passive: false });
          });
      }

      // Handle touch start to prevent scrolling when touching header
      header.addEventListener('touchstart', (e) => {
          e.preventDefault();
      }, { passive: false });
  });

  // Handle window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
          accordionCards.forEach(card => {
              const content = card.querySelector('.accordion-content');
              if (content && card.classList.contains('active')) {
                  content.style.maxHeight = content.scrollHeight + 'px';
              }
          });
      }, 250);
  });
});