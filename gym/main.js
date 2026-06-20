/**
 * KRAFT STRENGTH CLUB - INTERACTIVE SCRIPTS
 * Author: Antigravity Code Assistant
 * Description: Premium interactive scripts for custom scroll animation,
 * before/after drag, accordion heights, mobile drawer, and form submission.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. STICKY NAV DETECTOR
  // ==========================================================================
  const header = document.querySelector('.main-header');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check on load


  // ==========================================================================
  // 2. MOBILE DRAWER NAVIGATION
  // ==========================================================================
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerClose = document.querySelector('.drawer-close');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  const openDrawer = () => {
    mobileDrawer.classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop background scrolling
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable background scrolling
  };

  mobileToggle.addEventListener('click', openDrawer);
  drawerClose.addEventListener('click', closeDrawer);

  // Close drawer when clicking a link
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Close drawer if clicking outside the drawer contents
  document.addEventListener('click', (e) => {
    if (mobileDrawer.classList.contains('active')) {
      // Check if click was outside the drawer and not on the toggle button
      if (!mobileDrawer.contains(e.target) && !mobileToggle.contains(e.target)) {
        closeDrawer();
      }
    }
  });



  // ==========================================================================
  // 4. FAQ ACCORDION LOGIC
  // ==========================================================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const panel = item.querySelector('.faq-panel');

    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      // First collapse all other items (accordion behavior)
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('expanded')) {
          otherItem.classList.remove('expanded');
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          const otherPanel = otherItem.querySelector('.faq-panel');
          
          otherTrigger.setAttribute('aria-expanded', 'false');
          otherPanel.style.maxHeight = null;
        }
      });

      // Toggle current item
      if (isExpanded) {
        item.classList.remove('expanded');
        trigger.setAttribute('aria-expanded', 'false');
        panel.style.maxHeight = null;
      } else {
        item.classList.add('expanded');
        trigger.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  // Re-adjust accordion panels on window resize (fixes layout shifting bugs)
  window.addEventListener('resize', () => {
    faqItems.forEach(item => {
      if (item.classList.contains('expanded')) {
        const panel = item.querySelector('.faq-panel');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });


  // ==========================================================================
  // 5. INTERSECTION OBSERVER FOR REVEAL-ON-SCROLL
  // ==========================================================================
  const revealElements = document.querySelectorAll('.scroll-reveal');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // Triggers when 10% of element is visible
  };

  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once animated, stop observing for performance
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(revealCallback, observerOptions);

  revealElements.forEach(element => {
    observer.observe(element);
  });


  // ==========================================================================
  // 6. CONTACT FORM SUBMISSION STATE
  // ==========================================================================
  const bookingForm = document.getElementById('trial-booking-form');
  const successMessage = document.getElementById('form-success-message');
  const successUserName = document.getElementById('user-success-name');
  const resetBtn = document.getElementById('success-reset-btn');

  if (bookingForm && successMessage) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get values
      const nameInput = document.getElementById('form-name');
      const nameValue = nameInput ? nameInput.value.trim() : 'Athlete';

      // Set user name in success message
      if (successUserName) {
        // Extract first name for a more friendly, personalized tone
        const firstName = nameValue.split(' ')[0];
        successUserName.textContent = firstName;
      }

      // Hide form and show success state
      bookingForm.classList.add('hidden');
      successMessage.classList.add('active');

      // Scroll to the contact section so the user sees the success state clearly
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });

    // Reset Form button
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        bookingForm.reset();
        successMessage.classList.remove('active');
        bookingForm.classList.remove('hidden');
      });
    }
  }

});
