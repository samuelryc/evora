(function () {
    var SECTION_TOP_PADDING = 30;

    var imageList = {
        'tree-1': 'images/tree1.jpg',
        'tree-2': 'images/tree2.jpg',
        'tree-3': 'images/tree3.jpg',
        'contact': 'images/tree4.jpg'
    };

    var scroller = document.querySelector('.scrollable-content');
    var background = document.querySelector('.background-container');
    var stickyTop = document.querySelector('.sticky-top');
    var stickyBottom = document.querySelector('.sticky-bottom');
    var navCollapse = document.getElementById('navbarNavAltMarkup');

    function isInView(section) {
        var scrollerRect = scroller.getBoundingClientRect();
        var rect = section.getBoundingClientRect();
        var topOffset = stickyTop ? stickyTop.offsetHeight : 0;
        var bottomOffset = stickyBottom ? stickyBottom.offsetHeight : 0;

        return rect.bottom >= scrollerRect.top + topOffset &&
            rect.top <= scrollerRect.bottom - bottomOffset;
    }

    function syncActiveSection() {
        Object.keys(imageList).forEach(function (sectionName) {
            var section = document.getElementById(sectionName);
            var link = document.getElementById('navlink-' + sectionName);
            if (!section || !link) {
                return;
            }

            if (isInView(section)) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'true');
                if (background) {
                    background.style.backgroundImage = 'url("' + imageList[sectionName] + '")';
                }
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });
    }

    if (scroller) {
        scroller.addEventListener('scroll', syncActiveSection, { passive: true });
        syncActiveSection();
    }

    document.querySelectorAll('.nav-link').forEach(function (link) {
        link.addEventListener('click', function (event) {
            var href = link.getAttribute('href');
            if (!href || href.charAt(0) !== '#' || !scroller) {
                return;
            }

            var target = document.querySelector(href);
            if (!target) {
                return;
            }

            event.preventDefault();

            var headerOffset = stickyTop ? stickyTop.offsetHeight : 0;
            var top = target.getBoundingClientRect().top -
                scroller.getBoundingClientRect().top +
                scroller.scrollTop -
                headerOffset -
                SECTION_TOP_PADDING;

            scroller.scrollTo({
                top: top,
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
            });

            if (navCollapse && navCollapse.classList.contains('show') && window.bootstrap) {
                window.bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
            }
        });
    });
})();
