async function injectPartial(id, url) {
  const el = document.getElementById(id);
  if (!el) return;
  const resp = await fetch(url, { cache: "no-store" });
  if (!resp.ok) return;
  el.innerHTML = await resp.text();
}

function setActiveNav() {
  const path = window.location.pathname.replace(/\/$/, "");
  document.querySelectorAll("[data-nav]").forEach((a) => {
    const href = (a.getAttribute("href") || "").replace(/\/$/, "");
    if (href && (href === path || (href === "/index.html" && (path === "" || path === "/")))) {
      a.setAttribute("aria-current", "page");
    }
  });
}

async function main() {
  await Promise.all([
    injectPartial("site-header", "/partials/header.html"),
    injectPartial("site-footer", "/partials/footer.html"),
  ]);
  setActiveNav();

  const reveal = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("in-view");
          reveal.unobserve(e.target);
        }
      }
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));

  const consentKey = "crestara_cookie_consent_v1";
  if (!localStorage.getItem(consentKey)) {
    const banner = document.createElement("div");
    banner.className = "cookie-banner";
    banner.innerHTML = `
      <div class="cookie-inner">
        <div>
          <strong>Cookies</strong>
          <div class="muted">We use essential cookies for basic site functionality. Optional analytics cookies may be added in the future.</div>
        </div>
        <div class="cookie-actions">
          <a class="cookie-link" href="/cookie-policy.html">Cookie Policy</a>
          <button class="submit cookie-btn" type="button" data-consent="accepted">Accept</button>
        </div>
      </div>
    `;
    document.body.appendChild(banner);
    banner.querySelectorAll("[data-consent]").forEach((btn) => {
      btn.addEventListener("click", () => {
        localStorage.setItem(consentKey, "accepted");
        banner.remove();
      });
    });
  }
}

main();
