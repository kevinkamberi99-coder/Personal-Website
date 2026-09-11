// Kevin Kamberi — Research :: shared behaviour

(function(){
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if(toggle && nav){
    toggle.addEventListener('click', function(){
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ nav.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); });
    });
  }

  // Research index filter tabs
  var tabs = document.querySelectorAll('.tab');
  var cards = document.querySelectorAll('[data-cat]');
  var countEl = document.querySelector('.result-count');
  if(tabs.length && cards.length){
    function applyFilter(cat){
      var visible = 0;
      cards.forEach(function(card){
        var show = (cat === 'all') || (card.getAttribute('data-cat') === cat);
        card.style.display = show ? '' : 'none';
        if(show) visible++;
      });
      if(countEl){
        countEl.textContent = visible + (visible === 1 ? ' publication' : ' publications');
      }
    }
    tabs.forEach(function(tab){
      tab.addEventListener('click', function(){
        tabs.forEach(function(t){ t.setAttribute('aria-pressed','false'); });
        tab.setAttribute('aria-pressed','true');
        applyFilter(tab.getAttribute('data-filter'));
      });
    });
  }

  // Scroll reveal
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && revealEls.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in'); });
  }
})();
