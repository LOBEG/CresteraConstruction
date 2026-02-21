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
}

main();
