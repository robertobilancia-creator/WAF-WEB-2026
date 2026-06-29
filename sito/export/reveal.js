/* Entrance reveal — block-level, light. Pairs with .js-reveal CSS in fiber-tokens.css. */
(function () {
  if (!document.documentElement.classList.contains('js-reveal')) return; // reduced-motion / opted out
  var els = document.querySelectorAll('.js-reveal section > div > *');
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (e) { e.classList.add('is-in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });
  els.forEach(function (e) { io.observe(e); });
})();
