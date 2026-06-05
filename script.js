// ══════════════════════════════════════════════════════
// SWBD – Solar Web Backup Distribution  |  script.js
// ══════════════════════════════════════════════════════

document.addEventListener("DOMContentLoaded", () => {

  // ── State ──────────────────────────────────────────
  let batteryLevel = Math.floor(Math.random() * 21) + 75;
  let totalRevenue = Math.floor(Math.random() * 43001) + 42000;
  let revenuePerHour = Math.floor(Math.random() * 421) + 300;
  let economyLevel = Math.floor(Math.random() * 31) + 70;
  let activeMode = "eco";
  let networkData = [];

  const defaultDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  function rnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function createSeries(len, min, max, start, variance = 12) {
    const data = [];
    let value = clamp(start, min, max);
    for (let i = 0; i < len; i++) {
      value = clamp(value + rnd(-variance, variance), min, max);
      data.push(value);
    }
    return data;
  }

  function rndArray(len, min, max) {
    return Array.from({ length: len }, () => rnd(min, max));
  }

  // ══════════════════════════════════════════════════
  // NAVIGATION
  // ══════════════════════════════════════════════════
  window.showPage = function(pageId, btn) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
    const page = document.getElementById(pageId);
    if (page) page.classList.add("active");
    if (btn) btn.classList.add("active");

    if (pageId === "page1") initPage1Animations();
    if (pageId === "page2") initRevenueChart();
    if (pageId === "page3") initNetworkGrid();
  };

  // ══════════════════════════════════════════════════
  // PAGE 1 – DASHBOARD
  // ══════════════════════════════════════════════════
  function initPage1Animations() {
    economyLevel = rnd(70, 100);
    batteryLevel = clamp(batteryLevel + rnd(-5, 2), 55, 95);
    drawHeroChart();
    animateBatteries();
    animateCircle(economyLevel);
    updateGlobalBatt(batteryLevel);
  }

  // Hero canvas sparkline
  function drawHeroChart() {
    const canvas = document.getElementById("heroCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const genData = createSeries(12, 20, 100, rnd(30, 60), 18);
    const consData = createSeries(12, 15, 90, rnd(40, 65), 14);

    function drawLine(data, color, fill) {
      const step = W / (data.length - 1);
      const max = 100, min = 0;
      ctx.beginPath();
      data.forEach((v, i) => {
        const x = i * step;
        const y = H - ((v - min) / (max - min)) * H;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();
      if (fill) {
        ctx.lineTo(W, H);
        ctx.lineTo(0, H);
        ctx.closePath();
        ctx.fillStyle = fill;
        ctx.fill();
      }
    }

    drawLine(genData, "#44ff00", "rgba(68,255,0,0.1)");
    drawLine(consData, "#ff5252", "rgba(255,82,82,0.08)");

    canvas.onclick = () => drawHeroChart();
  }

  // Animate battery bars with stagger
  function animateBatteries() {
    const fills = document.querySelectorAll(".batt-fill");
    fills.forEach((el, i) => {
      const target = rnd(30, 100);
      el.dataset.level = target;
      el.style.height = "0%";
      setTimeout(() => {
        el.style.height = target + "%";
      }, 100 + i * 120);
    });
  }

  // Circle stroke animation
  function animateCircle(pct) {
    const circle = document.getElementById("economyCircle");
    if (!circle) return;
    const circumference = 2 * Math.PI * 68;
    const offset = circumference * (1 - pct / 100);

    const svg = circle.closest("svg");
    if (svg && !svg.querySelector("defs")) {
      const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
      defs.innerHTML = `
        <linearGradient id="circleGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#44ff00"/>
          <stop offset="50%" stop-color="#ffd600"/>
          <stop offset="100%" stop-color="#ff4400"/>
        </linearGradient>`;
      svg.insertBefore(defs, svg.firstChild);
    }

    circle.style.stroke = "url(#circleGrad)";
    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference;
    setTimeout(() => {
      circle.style.strokeDashoffset = offset;
    }, 200);

    const dot = document.getElementById("circDot");
    if (dot) {
      const angle = pct / 100 * 360 - 90;
      const rad = angle * Math.PI / 180;
      const cx = 80, cy = 80, r = 68;
      dot.style.left = cx + r * Math.cos(rad) + "px";
      dot.style.top = cy + r * Math.sin(rad) + "px";
      dot.style.transform = "translate(-50%,-50%)";
    }

    const pctEl = document.getElementById("economyPct");
    if (pctEl) {
      let cur = 0;
      const step = pct / 60;
      const timer = setInterval(() => {
        cur = Math.min(cur + step, pct);
        pctEl.textContent = Math.round(cur) + "%";
        if (cur >= pct) clearInterval(timer);
      }, 16);
    }
  }

  // Update global battery display
  function updateGlobalBatt(pct) {
    const fill = document.getElementById("gbattFill");
    const pctEl = document.getElementById("gbattPct");
    if (fill) fill.style.height = pct + "%";
    if (pctEl) pctEl.textContent = pct + "%";
  }

  // ══════════════════════════════════════════════════
  // PAGE 2 – REVENUS (Chart)
  // ══════════════════════════════════════════════════
  function initRevenueChart() {
    const canvas = document.getElementById("revenueChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const days = defaultDays;
    const cons = createSeries(7, 15, 45, rnd(25, 35), 8);
    const gen = createSeries(7, 25, 55, rnd(30, 45), 10);

    const maxV = Math.min(70, Math.max(...cons, ...gen) + 8);
    const minV = Math.max(5, Math.min(...cons, ...gen) - 8);
    const padLeft = 50, padRight = 20, padTop = 20, padBot = 35;
    const chartW = W - padLeft - padRight;
    const chartH = H - padTop - padBot;
    const stepX = chartW / (days.length - 1);

    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padTop + (chartH / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padLeft, y);
      ctx.lineTo(W - padRight, y);
      ctx.stroke();
      const val = Math.round(maxV - (maxV - minV) * (i / 5));
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.font = "10px Exo 2";
      ctx.textAlign = "right";
      ctx.fillText(val, padLeft - 6, y + 4);
    }

    ctx.textAlign = "center";
    ctx.font = "10px Exo 2";
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    days.forEach((d, i) => {
      ctx.fillText(d, padLeft + i * stepX, H - padBot + 18);
    });

    function getY(v) {
      return padTop + chartH * (1 - (v - minV) / (maxV - minV));
    }

    function drawCurve(data, color, glowColor) {
      ctx.save();
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      data.forEach((v, i) => {
        const x = padLeft + i * stepX;
        const y = getY(v);
        if (i === 0) ctx.moveTo(x, y);
        else {
          const px = padLeft + (i - 1) * stepX;
          const py = getY(data[i - 1]);
          const cp1x = px + (x - px) * 0.5;
          const cp1y = py;
          const cp2x = px + (x - px) * 0.5;
          const cp2y = y;
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
        }
      });
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.restore();

      data.forEach((v, i) => {
        const x = padLeft + i * stepX;
        const y = getY(v);
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.6)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });
    }

    drawCurve(cons, "#ff5252", "rgba(255,82,82,0.6)");
    drawCurve(gen, "#42a5f5", "rgba(66,165,245,0.6)");

    canvas.onmousemove = function(e) {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left) * (W / rect.width);

      let closest = -1;
      let minDist = Infinity;
      days.forEach((_, i) => {
        const x = padLeft + i * stepX;
        const dist = Math.abs(mx - x);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });

      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      ctx.lineWidth = 1;
      for (let i = 0; i <= 5; i++) {
        const y = padTop + (chartH / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padLeft, y);
        ctx.lineTo(W - padRight, y);
        ctx.stroke();
        const val = Math.round(maxV - (maxV - minV) * (i / 5));
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.font = "10px Exo 2";
        ctx.textAlign = "right";
        ctx.fillText(val, padLeft - 6, y + 4);
      }
      ctx.textAlign = "center";
      ctx.font = "10px Exo 2";
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      days.forEach((d, i) => {
        ctx.fillText(d, padLeft + i * stepX, H - padBot + 18);
      });
      drawCurve(cons, "#ff5252", "rgba(255,82,82,0.6)");
      drawCurve(gen, "#42a5f5", "rgba(66,165,245,0.6)");

      if (closest >= 0) {
        const x = padLeft + closest * stepX;
        ctx.strokeStyle = "rgba(255,255,255,0.3)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(x, padTop);
        ctx.lineTo(x, H - padBot);
        ctx.stroke();
        ctx.setLineDash([]);

        const tw = 130;
        const th = 60;
        const tx = Math.min(x - tw / 2, W - tw - padRight);
        const ty = padTop + 10;
        ctx.fillStyle = "rgba(50,50,50,0.92)";
        ctx.beginPath();
        ctx.roundRect(tx, ty, tw, th, 8);
        ctx.fill();

        ctx.fillStyle = "white";
        ctx.font = "bold 11px Exo 2";
        ctx.textAlign = "left";
        ctx.fillText(days[closest], tx + 8, ty + 16);
        ctx.fillStyle = "#ff5252";
        ctx.font = "10px Exo 2";
        ctx.fillText("● consomation : " + cons[closest], tx + 8, ty + 32);
        ctx.fillStyle = "#42a5f5";
        ctx.fillText("● revenue generé : " + gen[closest], tx + 8, ty + 48);
      }
    };

    canvas.onclick = () => initRevenueChart();
  }

  // ══════════════════════════════════════════════════
  // PAGE 3 – RÉSEAU
  // ══════════════════════════════════════════════════
  function initNetworkGrid() {
    const grid = document.getElementById("networkGrid");
    if (!grid) return;
    grid.innerHTML = "";
    networkData = rndArray(12, 18, 98);

    networkData.forEach((value, i) => {
      let current = value;
      const box = document.createElement("div");
      box.className = "grid-box" + (current < 40 ? " low" : "");
      box.textContent = current + "%";
      box.style.opacity = "0";
      box.style.transform = "scale(0.7)";
      box.onclick = () => {
        current = rnd(18, 98);
        box.textContent = current + "%";
        box.className = "grid-box" + (current < 40 ? " low" : "");
        box.style.transform = "scale(0.93)";
        setTimeout(() => box.style.transform = "scale(1)", 150);
      };
      grid.appendChild(box);
      setTimeout(() => {
        box.style.transition = "opacity 0.4s, transform 0.4s";
        box.style.opacity = "1";
        box.style.transform = "scale(1)";
      }, 50 + i * 60);
    });

    drawFlowChart();
  }

  function drawFlowChart() {
    const canvas = document.getElementById("flowChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const pts = createSeries(11, 20, 70, rnd(30, 50), 15);
    const pts2 = createSeries(11, 30, 70, rnd(35, 55), 12);

    function drawL(data, color) {
      const step = W / (data.length - 1);
      ctx.beginPath();
      data.forEach((v, i) => {
        const x = i * step;
        const y = H - (v / 80) * H;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    drawL(pts, "rgba(255,100,100,0.7)");
    drawL(pts2, "rgba(180,180,255,0.7)");

    canvas.onclick = () => drawFlowChart();
  }

  // Transfer button
  window.doTransfer = function() {
    const btn = document.getElementById("transferBtn");
    if (!btn) return;
    btn.textContent = "✅ Redistribution effectuée !";
    btn.classList.add("done");
    btn.disabled = true;

    const line = document.getElementById("flowLine");
    if (line) {
      line.style.width = "0px";
      setTimeout(() => {
        line.style.transition = "width 1.5s";
        line.style.width = "80px";
      }, 100);
    }

    setTimeout(() => {
      btn.textContent = "⚡ Redistribuer l'énergie";
      btn.classList.remove("done");
      btn.disabled = false;
      initNetworkGrid();
      drawFlowChart();
    }, 3000);
  };

  // ══════════════════════════════════════════════════
  // PAGE 4 – DOMOTIQUE
  // ══════════════════════════════════════════════════
  document.querySelectorAll(".floor-room").forEach(room => {
    room.addEventListener("click", () => {
      const statusEl = room.querySelector(".room-status");
      const isOn = statusEl.classList.contains("on");
      statusEl.classList.toggle("on", !isOn);
      statusEl.classList.toggle("off", isOn);
      statusEl.textContent = isOn ? "off" : "on";
      room.style.transition = "background 0.3s";
      room.style.background = isOn ? "rgba(255,61,61,0.05)" : "rgba(0,200,83,0.05)";
      setTimeout(() => room.style.background = "", 400);
    });
  });

  window.setMode = function(mode, btn) {
    document.querySelectorAll(".mode-btn").forEach(b => b.classList.remove("active-mode"));
    btn.classList.add("active-mode");
    activeMode = mode;
  };

  // ══════════════════════════════════════════════════
  // DYNAMIC UPDATES (intervals)
  // ══════════════════════════════════════════════════

  setInterval(() => {
    batteryLevel = clamp(batteryLevel + rnd(-4, 2), 55, 95);
    if (batteryLevel < 55) batteryLevel = rnd(70, 95);
    updateGlobalBatt(batteryLevel);
    const domoFill = document.querySelector("#domoBatt .gbatt-fill");
    const domoPct = document.querySelector("#domoBatt .gbatt-pct");
    if (domoFill) domoFill.style.height = batteryLevel + "%";
    if (domoPct) domoPct.textContent = batteryLevel + "%";
  }, 5000);

  setInterval(() => {
    totalRevenue += rnd(15, 60);
    const el = document.getElementById("totalRev");
    if (el) el.textContent = Math.round(totalRevenue).toLocaleString("fr-FR") + " fcfa";
  }, 5000);

  setInterval(() => {
    economyLevel = rnd(70, 100);
    const pctEl = document.getElementById("economyPct");
    if (pctEl && document.getElementById("page1").classList.contains("active")) {
      animateCircle(economyLevel);
    }
  }, 8000);

  setInterval(() => {
    const prod = rnd(10, 14);
    const cons = rnd(5, 9);
    document.querySelectorAll(".kw-item").forEach(item => {
      const valEl = item.querySelector(".kw-val");
      if (!valEl) return;
      if (item.querySelector(".arrow-up")) valEl.textContent = prod + " kw/h";
      if (item.querySelector(".arrow-down")) valEl.textContent = cons + " kw/h";
    });
  }, 4000);

  // ══════════════════════════════════════════════════
  // INIT
  // ══════════════════════════════════════════════════
  initPage1Animations();
});