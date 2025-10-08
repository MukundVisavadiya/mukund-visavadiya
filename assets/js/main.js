jQuery(function () {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = jQuery(".header-toggle");
  function headerToggle() {
    jQuery("#header").toggleClass("header-show");
    headerToggleBtn.toggleClass("fa-xmark");
  }
  headerToggleBtn.on("click", headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  jQuery("#navmenu a").on("click", function () {
    if (jQuery(".header-show").length) {
      headerToggle();
    }
  });

  /**
   * Toggle mobile nav dropdowns
   */
  jQuery(".navmenu .toggle-dropdown").on("click", function (e) {
    e.preventDefault();
    jQuery(this).parent().toggleClass("active");
    jQuery(this).parent().next().toggleClass("dropdown-active");
    e.stopImmediatePropagation();
  });

  /**
   * Preloader
   */
  if (jQuery("#preloader").length) {
    jQuery(window).on("load", function () {
      jQuery("#preloader").remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = jQuery(".scroll-top");
  function toggleScrollTop() {
    if (scrollTop.length) {
      jQuery(window).scrollTop() > 100
        ? scrollTop.addClass("active")
        : scrollTop.removeClass("active");
    }
  }
  scrollTop.on("click", function (e) {
    e.preventDefault();
    jQuery("html, body").animate({ scrollTop: 0 }, "smooth");
  });
  jQuery(window).on("load scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  jQuery(window).on("load", aosInit);

  /**
   * Init typed.js
   */
  if (jQuery(".typed").length) {
    let typed_strings = jQuery(".typed").data("typed-items").split(",");
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  jQuery(".skills-animation").each(function () {
    new Waypoint({
      element: this,
      offset: "80%",
      handler: function () {
        jQuery(this.element)
          .find(".progress .progress-bar")
          .each(function () {
            jQuery(this).css("width", jQuery(this).attr("aria-valuenow") + "%");
          });
      },
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({ selector: ".glightbox" });

  /**
   * Init isotope layout and filters
   */
  jQuery(".isotope-layout").each(function () {
    let current = jQuery(this);
    let layout = current.data("layout") || "masonry";
    let filter = current.data("default-filter") || "*";
    let sort = current.data("sort") || "original-order";
    let initIsotope;
    imagesLoaded(current.find(".isotope-container"), function () {
      initIsotope = new Isotope(current.find(".isotope-container")[0], {
        itemSelector: ".isotope-item",
        layoutMode: layout,
        filter: filter,
        sortBy: sort,
      });
    });
    current.find(".isotope-filters li").on("click", function () {
      current.find(".filter-active").removeClass("filter-active");
      jQuery(this).addClass("filter-active");
      initIsotope.arrange({ filter: jQuery(this).data("filter") });
      if (typeof aosInit === "function") {
        aosInit();
      }
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    jQuery(".init-swiper").each(function () {
      let config = JSON.parse(
        jQuery(this).find(".swiper-config").html().trim()
      );
      if (jQuery(this).hasClass("swiper-tab")) {
        initSwiperWithCustomPagination(this, config);
      } else {
        new Swiper(this, config);
      }
    });
  }
  jQuery(window).on("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  jQuery(window).on("load", function () {
    if (window.location.hash) {
      let section = jQuery(window.location.hash);
      if (section.length) {
        setTimeout(() => {
          let scrollMarginTop = parseInt(section.css("scrollMarginTop"));
          jQuery("html, body").animate(
            { scrollTop: section.offset().top - scrollMarginTop },
            "smooth"
          );
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  function navmenuScrollspy() {
    let position = jQuery(window).scrollTop() + 200;
    jQuery(".navmenu a").each(function () {
      let section = jQuery(jQuery(this).attr("href"));
      if (section.length) {
        if (
          position >= section.offset().top &&
          position <= section.offset().top + section.outerHeight()
        ) {
          jQuery(".navmenu a.active").removeClass("active");
          jQuery(this).addClass("active");
        } else {
          jQuery(this).removeClass("active");
        }
      }
    });
  }
  jQuery(window).on("load scroll", navmenuScrollspy);
});

// skills swiper js
const swiper = new Swiper(".mvp-skills-swiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 6 },
  },
});
