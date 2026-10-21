// --- Nav ---
const menuBtn = document.querySelector(".menu-btn");
const links = document.querySelector(".links");
menuBtn.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
links.addEventListener("click", (e) => {
  if (e.target.tagName === "A") links.classList.remove("open");
});
document.getElementById("year").textContent = new Date().getFullYear();

// --- Programs ---
const programsEl = document.getElementById("programs");
const dialog = document.getElementById("program-dialog");
const dialogContent = document.getElementById("dialog-content");

PROGRAMS.forEach((p, i) => {
  const card = document.createElement("button");
  card.className = "card program";
  card.innerHTML = `
    <div class="icon">${p.icon}</div>
    <h3>${p.name}</h3>
    <p>${p.desc}</p>
    <div class="tags">${p.tags.map((t, j) => `<span class="tag ${j ? "alt" : ""}">${t}</span>`).join("")}</div>`;
  card.addEventListener("click", () => openProgram(i));
  programsEl.appendChild(card);
});

function openProgram(i) {
  const p = PROGRAMS[i];
  dialogContent.innerHTML = `
    <h2>${p.icon} ${p.name}</h2>
    <p class="muted">${p.desc}</p>
    ${p.plan.map(([day, work]) => `<div class="day"><strong>${day}</strong><br>${work}</div>`).join("")}`;
  dialog.showModal();
}
dialog.querySelector(".close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });

// --- Exercises ---
const exercisesEl = document.getElementById("exercises");
const filtersEl = document.getElementById("filters");
const groups = ["Todos", ...new Set(EXERCISES.map((e) => e.group))];
let activeGroup = "Todos";

groups.forEach((g) => {
  const chip = document.createElement("button");
  chip.className = "chip" + (g === activeGroup ? " active" : "");
  chip.textContent = g;
  chip.addEventListener("click", () => {
    activeGroup = g;
    filtersEl.querySelectorAll(".chip").forEach((c) => c.classList.toggle("active", c === chip));
    renderExercises();
  });
  filtersEl.appendChild(chip);
});

function renderExercises() {
  const list = activeGroup === "Todos" ? EXERCISES : EXERCISES.filter((e) => e.group === activeGroup);
  exercisesEl.innerHTML = list.map((e) => `
    <article class="card exercise">
      <div class="tags"><span class="tag">${e.group}</span><span class="tag alt">${e.level}</span></div>
      <h3 style="margin-top:12px">${e.name}</h3>
      <p>${e.tip}</p>
    </article>`).join("");
}
renderExercises();

// --- Calorie calculator (Mifflin-St Jeor) ---
const form = document.getElementById("calc-form");
const results = document.getElementById("results");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form));
  const w = +d.weight, h = +d.height, a = +d.age;
  const bmr = 10 * w + 6.25 * h - 5 * a + (d.sex === "m" ? 5 : -161);
  const tdee = bmr * +d.activity;
  const target = Math.round(tdee + +d.goal);
  const bmi = w / (h / 100) ** 2;

  const protein = Math.round(w * 2);
  const fat = Math.round((target * 0.25) / 9);
  const carbs = Math.max(0, Math.round((target - protein * 4 - fat * 9) / 4));

  results.innerHTML = `
    <p class="muted" style="margin:0 0 6px">Calorías diarias objetivo</p>
    <div class="big">${target.toLocaleString("es-ES")} kcal</div>
    <div class="macros">
      <div class="macro"><strong>${protein} g</strong><span>Proteína</span></div>
      <div class="macro"><strong>${carbs} g</strong><span>Carbohidratos</span></div>
      <div class="macro"><strong>${fat} g</strong><span>Grasas</span></div>
    </div>
    <div style="margin-top:20px">
      <div class="kv"><span class="muted">Metabolismo basal</span><span>${Math.round(bmr)} kcal</span></div>
      <div class="kv"><span class="muted">Gasto total (TDEE)</span><span>${Math.round(tdee)} kcal</span></div>
      <div class="kv"><span class="muted">IMC</span><span>${bmi.toFixed(1)} · ${bmiLabel(bmi)}</span></div>
    </div>`;
});

function bmiLabel(bmi) {
  if (bmi < 18.5) return "Bajo peso";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Sobrepeso";
  return "Obesidad";
}

// --- Interval timer ---
const $ = (id) => document.getElementById(id);
const startBtn = $("start");
let timer = null, phase = "ready", remaining = 0, round = 0, phaseLength = 0;

const cfg = () => ({ work: +$("work").value, rest: +$("rest").value, rounds: +$("rounds").value });
const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

function beep(freq = 880, ms = 150) {
  try {
    const ctx = beep.ctx || (beep.ctx = new AudioContext());
    const osc = ctx.createOscillator();
    osc.frequency.value = freq;
    osc.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + ms / 1000);
  } catch {}
}

function render() {
  const { rounds } = cfg();
  const labels = { ready: "Listo", work: "Trabajo", rest: "Descanso", done: "¡Hecho!" };
  $("phase").textContent = labels[phase];
  $("phase").className = "phase " + phase;
  $("clock").textContent = fmt(remaining);
  $("round-info").textContent = `Ronda ${round} / ${rounds}`;
  $("bar-fill").style.width = phaseLength ? `${((phaseLength - remaining) / phaseLength) * 100}%` : "0";
  $("bar-fill").style.background = phase === "rest" ? "var(--rest)" : "var(--accent)";
}

function setPhase(p, len) {
  phase = p; remaining = len; phaseLength = len;
  beep(p === "work" ? 880 : 520, 200);
}

function tick() {
  const { work, rest, rounds } = cfg();
  remaining--;
  if (remaining <= 3 && remaining > 0) beep(660, 80);
  if (remaining <= 0) {
    if (phase === "work" && round >= rounds) { phase = "done"; remaining = 0; stop(); beep(1046, 500); }
    else if (phase === "work" && rest > 0) setPhase("rest", rest);
    else { round++; setPhase("work", work); }
  }
  render();
}

function start() {
  if (phase === "ready" || phase === "done") {
    round = 1;
    setPhase("work", cfg().work);
  }
  timer = setInterval(tick, 1000);
  startBtn.textContent = "Pausa";
  render();
}

function stop() {
  clearInterval(timer);
  timer = null;
  startBtn.textContent = phase === "done" ? "Iniciar" : "Reanudar";
}

startBtn.addEventListener("click", () => (timer ? stop() : start()));
$("reset").addEventListener("click", () => {
  stop();
  phase = "ready"; round = 0; phaseLength = 0; remaining = cfg().work;
  startBtn.textContent = "Iniciar";
  render();
});
["work", "rest", "rounds"].forEach((id) => $(id).addEventListener("input", () => {
  if (phase === "ready") { remaining = cfg().work; render(); }
}));
remaining = cfg().work;
render();
