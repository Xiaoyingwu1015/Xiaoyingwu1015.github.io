(function () {
  // year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // featured filter
  const chips = document.querySelectorAll(".chip");
  const items = document.querySelectorAll("#featuredGrid .item");
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      const filter = chip.dataset.filter;
      items.forEach((it) => {
        const tags = (it.dataset.tags || "").split(/\s+/);
        const show = filter === "all" || tags.includes(filter);
        it.style.display = show ? "block" : "none";
      });
    });
  });

  // sparkles
  const c = document.getElementById("sparkles");
  if (!c) return;
  const ctx = c.getContext("2d");
  const dpr = Math.max(1, window.devicePixelRatio || 1);

  function resize() {
    c.width = Math.floor(window.innerWidth * dpr);
    c.height = Math.floor(window.innerHeight * dpr);
    c.style.width = window.innerWidth + "px";
    c.style.height = window.innerHeight + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize);

  const N = 34;
  const P = Array.from({ length: N }).map(() => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: 0.6 + Math.random() * 1.6,
    vx: -0.06 + Math.random() * 0.12,
    vy: 0.05 + Math.random() * 0.18,
    a: 0.05 + Math.random() * 0.12,
  }));

  function draw() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (const p of P) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y > window.innerHeight + 20) p.y = -20;
      if (p.x < -20) p.x = window.innerWidth + 20;
      if (p.x > window.innerWidth + 20) p.x = -20;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${p.a})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  c.style.position = "fixed";
  c.style.inset = "0";
  c.style.pointerEvents = "none";
  c.style.zIndex = "0";

  const main = document.querySelector("main");
  if (main) {
    main.style.position = "relative";
    main.style.zIndex = "1";
  }
  draw();
})();
