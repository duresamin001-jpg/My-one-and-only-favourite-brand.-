/* Dure Khan Haute Couture — shared interactions.
   Each feature checks whether its elements exist, so all three pages
   can share this one file safely. */

/* ---------- 1. Mobile navigation ---------- */
(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    var icon = toggle.querySelector(".icon");
    if (icon) icon.textContent = open ? "close" : "menu";
  }

  toggle.addEventListener("click", function () {
    setOpen(!nav.classList.contains("is-open"));
  });

  // Close the menu after tapping a link (helpful on phones).
  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setOpen(false);
    });
  });

  // Close with the Escape key.
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setOpen(false);
  });
})();

/* ---------- 2. Lookbook filters (Home page) ---------- */
(function () {
  // Scoped to the children's lookbook section so the runway cards
  // elsewhere on the page are never affected by these filters.
  var section = document.getElementById("lookbook");
  if (!section) return;

  var buttons = section.querySelectorAll(".filter-btn");
  var cards = section.querySelectorAll(".look-card");
  if (!buttons.length || !cards.length) return;

  function applyFilter(filter) {
    buttons.forEach(function (btn) {
      var isActive = btn.getAttribute("data-filter") === filter;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    cards.forEach(function (card) {
      var show = filter === "all" || card.getAttribute("data-gender") === filter;
      card.classList.toggle("is-hidden", !show);
    });
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyFilter(btn.getAttribute("data-filter"));
    });
  });

  // Start on "all".
  applyFilter("all");
})();

/* ---------- 3. Look details modal (Home page) ---------- */
(function () {
  var modal = document.getElementById("model-modal");
  if (!modal) return;

  var content = document.getElementById("modal-content");
  var lastTrigger = null;

  function openModal(id, trigger) {
    var data = window.lookbookData && window.lookbookData[id];
    if (!data) return;

    lastTrigger = trigger || null;

    var meta = document.createElement("div");
    meta.className = "modal__meta";

    [
      ["Junior Model", data.modelName, "font-display-lg"],
      ["Fabric & Finish", data.fabric, ""]
    ].forEach(function (pair) {
      var cell = document.createElement("div");
      var label = document.createElement("span");
      label.className = "eyebrow modal__meta-label";
      label.textContent = pair[0];
      var value = document.createElement("span");
      value.textContent = pair[1];
      if (pair[2] === "font-display-lg") {
        value.className = "headline-sm";
      }
      cell.appendChild(label);
      cell.appendChild(value);
      meta.appendChild(cell);
    });

    var h3 = document.createElement("h3");
    h3.className = "headline-md modal__heading";
    h3.textContent = data.title;

    var h4a = document.createElement("h4");
    h4a.className = "eyebrow modal__subhead";
    h4a.textContent = "Occasion & Story";
    var pA = document.createElement("p");
    pA.className = "body-md modal__text";
    pA.textContent = data.story;

    var h4b = document.createElement("h4");
    h4b.className = "eyebrow modal__subhead";
    h4b.textContent = "Karigar Handcraft";
    var pB = document.createElement("p");
    pB.className = "body-md modal__text";
    pB.textContent = data.craftsmanship;

    var actions = document.createElement("div");
    actions.className = "modal__actions";
    var cta = document.createElement("a");
    cta.className = "btn btn--primary";
    cta.href = "contact.html#booking";
    cta.textContent = "Book Fitting For This Ensemble";
    actions.appendChild(cta);

    content.innerHTML = "";
    var eyebrow = document.createElement("span");
    eyebrow.className = "eyebrow eyebrow--secondary";
    eyebrow.textContent = "Cultural Heritage Profile";
    content.appendChild(eyebrow);
    content.appendChild(h3);
    content.appendChild(meta);
    content.appendChild(h4a);
    content.appendChild(pA);
    content.appendChild(h4b);
    content.appendChild(pB);
    content.appendChild(actions);

    modal.classList.remove("is-hidden");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    var closeBtn = modal.querySelector(".modal__close");
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    modal.classList.add("is-hidden");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastTrigger) lastTrigger.focus();
  }

  // All "View Look Details" buttons carry data-look="ayla" etc.
  document.querySelectorAll("[data-look]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      openModal(btn.getAttribute("data-look"), btn);
    });
  });

  modal.querySelectorAll("[data-close-modal]").forEach(function (el) {
    el.addEventListener("click", closeModal);
  });

  // Click on the dark backdrop (not the panel) closes the modal.
  modal.addEventListener("click", function (event) {
    if (event.target === modal) closeModal();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !modal.classList.contains("is-hidden")) {
      closeModal();
    }
  });

  // The "Book Fitting" link inside the modal also closes it.
  content.addEventListener("click", function (event) {
    if (event.target.closest("a")) closeModal();
  });
})();

/* ---------- 4. Booking form (Contact page) ---------- */
(function () {
  var form = document.getElementById("consultation-form");
  if (!form) return;

  var success = document.getElementById("form-success");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (success) {
      success.classList.remove("is-hidden");
      success.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    form.reset();
  });
})();

/* ---------- 5. Footer newsletter form ---------- */
(function () {
  var form = document.getElementById("newsletter-form");
  if (!form) return;

  var success = document.getElementById("newsletter-success");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    form.classList.add("is-hidden");
    if (success) success.classList.remove("is-hidden");
  });
})();
