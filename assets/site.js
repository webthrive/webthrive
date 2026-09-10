/* Mobile drawer nav + contact form submit */
(function () {
  'use strict';

  var btn     = document.querySelector('[data-menu-toggle]');
  var drawer  = document.getElementById('m-drawer');
  var overlay = document.getElementById('m-overlay');
  var closers = document.querySelectorAll('[data-menu-close]');

  function setMenu(open) {
    if (!drawer) return;
    drawer.classList.toggle('open', open);
    if (overlay) overlay.classList.toggle('open', open);
    if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  }

  if (btn) {
    btn.addEventListener('click', function () {
      setMenu(!drawer.classList.contains('open'));
    });
  }
  Array.prototype.forEach.call(closers, function (el) {
    el.addEventListener('click', function () { setMenu(false); });
  });
  if (overlay) overlay.addEventListener('click', function () { setMenu(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  /* Contact form — POST to Web3Forms, then land on the thank-you page. */
  var form = document.getElementById('contact-form');
  if (!form) return;

  var status = document.getElementById('form-status');
  var submit = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (status) { status.textContent = ''; status.className = 'form-status'; }
    if (submit) { submit.disabled = true; submit.textContent = 'Sending...'; }

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: new FormData(form)
    })
      .then(function (r) { return r.json(); })
      .then(function (result) {
        if (result && result.success) {
          window.location.href = '/submission-received';
        } else {
          throw new Error(result && result.message ? result.message : 'Submission failed');
        }
      })
      .catch(function () {
        if (status) {
          status.textContent = 'Something went wrong. Please try again, or email me directly at colin@webthrive.io.';
          status.className = 'form-status error';
        }
        if (submit) { submit.disabled = false; submit.textContent = 'Send Message'; }
      });
  });
})();
