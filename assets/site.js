/* Mobile nav toggle + contact form submit. Small enough to stay dependency-free. */
(function () {
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('site-nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var form = document.getElementById('contact-form');
  if (!form) return;
  var status = document.getElementById('form-status');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var req = form.querySelectorAll('[required]');
    for (var i = 0; i < req.length; i++) {
      if (!req[i].checkValidity()) {
        status.className = 'form-status err';
        status.textContent = 'Please complete the highlighted fields.';
        req[i].focus();
        return;
      }
    }

    var btnEl = form.querySelector('button[type=submit]');
    var label = btnEl.textContent;
    btnEl.disabled = true;
    btnEl.textContent = 'Sending…';

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    })
      .then(function (r) {
        if (!r.ok) throw new Error('bad response');
        form.reset();
        status.className = 'form-status ok';
        status.textContent = 'Thanks — your message is through. I’ll get back to you shortly.';
      })
      .catch(function () {
        status.className = 'form-status err';
        status.innerHTML =
          'Something went wrong. Email me directly at <a href="mailto:colin@webthrive.io">colin@webthrive.io</a>.';
      })
      .then(function () {
        btnEl.disabled = false;
        btnEl.textContent = label;
      });
  });
})();
