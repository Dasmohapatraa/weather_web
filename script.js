/* ============================================================
   ATMOS — Weather Intelligence
   script.js
   ============================================================
   NOTE: Replace API_KEY with your OpenWeatherMap API key from
   https://openweathermap.org/api  (free tier is sufficient).
   When using a real API key, set USE_DEMO_DATA = false.
   ============================================================ */

const API_KEY      = "4b1f25f35d791e1dc16669fde6bf4ec5";
const USE_DEMO_DATA = false;   // ← set false once you have a real key

/* ──────────────────────────────────────────────────────────
   DEMO DATA  (used when USE_DEMO_DATA = true)
   ────────────────────────────────────────────────────────── */
const DEMO_WEATHER = {
  london: {
    name: "London",
    sys:  { country: "GB", sunrise: 1710300000, sunset: 1710344000 },
    main: { temp: 12.4, feels_like: 10.1, humidity: 78, pressure: 1013, temp_min: 10, temp_max: 14 },
    weather: [{ main: "Clouds", description: "overcast clouds", icon: "04d" }],
    wind: { speed: 5.2, deg: 230 },
    visibility: 8000,
    clouds: { all: 90 },
    coord: { lat: 51.5074, lon: -0.1278 },
  },
  tokyo: {
    name: "Tokyo",
    sys:  { country: "JP", sunrise: 1710280000, sunset: 1710324000 },
    main: { temp: 16.8, feels_like: 15.2, humidity: 55, pressure: 1018, temp_min: 13, temp_max: 19 },
    weather: [{ main: "Clear", description: "clear sky", icon: "01d" }],
    wind: { speed: 3.1, deg: 120 },
    visibility: 10000,
    clouds: { all: 5 },
    coord: { lat: 35.6762, lon: 139.6503 },
  },
  "new york": {
    name: "New York",
    sys:  { country: "US", sunrise: 1710325000, sunset: 1710368000 },
    main: { temp: 8.3, feels_like: 5.9, humidity: 62, pressure: 1008, temp_min: 6, temp_max: 11 },
    weather: [{ main: "Rain", description: "light rain", icon: "10d" }],
    wind: { speed: 7.8, deg: 310 },
    visibility: 6000,
    clouds: { all: 75 },
    coord: { lat: 40.7128, lon: -74.006 },
  },
  sydney: {
    name: "Sydney",
    sys:  { country: "AU", sunrise: 1710259000, sunset: 1710302000 },
    main: { temp: 24.5, feels_like: 25.1, humidity: 68, pressure: 1015, temp_min: 21, temp_max: 27 },
    weather: [{ main: "Clear", description: "clear sky", icon: "01d" }],
    wind: { speed: 4.5, deg: 180 },
    visibility: 10000,
    clouds: { all: 10 },
    coord: { lat: -33.8688, lon: 151.2093 },
  },
  paris: {
    name: "Paris",
    sys:  { country: "FR", sunrise: 1710305000, sunset: 1710350000 },
    main: { temp: 10.7, feels_like: 8.9, humidity: 71, pressure: 1011, temp_min: 8, temp_max: 13 },
    weather: [{ main: "Drizzle", description: "light intensity drizzle", icon: "09d" }],
    wind: { speed: 4.1, deg: 200 },
    visibility: 7000,
    clouds: { all: 60 },
    coord: { lat: 48.8566, lon: 2.3522 },
  },
  dubai: {
    name: "Dubai",
    sys:  { country: "AE", sunrise: 1710286000, sunset: 1710329000 },
    main: { temp: 31.2, feels_like: 33.8, humidity: 45, pressure: 1012, temp_min: 28, temp_max: 34 },
    weather: [{ main: "Clear", description: "clear sky", icon: "01d" }],
    wind: { speed: 2.8, deg: 90 },
    visibility: 10000,
    clouds: { all: 2 },
    coord: { lat: 25.2048, lon: 55.2708 },
  },
};

const DEMO_FORECAST = {
  london: [
    { dt: now() + 86400,  main: { temp: 11, temp_min: 9,  temp_max: 13 }, weather: [{ main: "Clouds" }] },
    { dt: now() + 172800, main: { temp: 13, temp_min: 10, temp_max: 15 }, weather: [{ main: "Rain"   }] },
    { dt: now() + 259200, main: { temp: 9,  temp_min: 7,  temp_max: 11 }, weather: [{ main: "Rain"   }] },
    { dt: now() + 345600, main: { temp: 14, temp_min: 11, temp_max: 16 }, weather: [{ main: "Clouds" }] },
    { dt: now() + 432000, main: { temp: 16, temp_min: 13, temp_max: 18 }, weather: [{ main: "Clear"  }] },
  ],
  tokyo: [
    { dt: now() + 86400,  main: { temp: 18, temp_min: 14, temp_max: 21 }, weather: [{ main: "Clear"  }] },
    { dt: now() + 172800, main: { temp: 15, temp_min: 12, temp_max: 18 }, weather: [{ main: "Clouds" }] },
    { dt: now() + 259200, main: { temp: 20, temp_min: 16, temp_max: 23 }, weather: [{ main: "Clear"  }] },
    { dt: now() + 345600, main: { temp: 17, temp_min: 14, temp_max: 20 }, weather: [{ main: "Clouds" }] },
    { dt: now() + 432000, main: { temp: 19, temp_min: 15, temp_max: 22 }, weather: [{ main: "Clear"  }] },
  ],
};

function now() { return Math.floor(Date.now() / 1000); }

/* ──────────────────────────────────────────────────────────
   THEME MAP  — per weather condition
   ────────────────────────────────────────────────────────── */
const THEMES = {
  Clear:        { accent: "#F59E0B", bg: ["#78350f","#92400e","#b45309"], glow: "rgba(245,158,11,0.3)",  particle: "☀", rain: false },
  Clouds:       { accent: "#94A3B8", bg: ["#1e293b","#334155","#475569"], glow: "rgba(148,163,184,0.2)", particle: "◉", rain: false },
  Rain:         { accent: "#60A5FA", bg: ["#172554","#1e3a8a","#1e40af"], glow: "rgba(96,165,250,0.25)", particle: "⋮", rain: true  },
  Drizzle:      { accent: "#7DD3FC", bg: ["#0c4a6e","#0369a1","#0284c7"], glow: "rgba(125,211,252,0.2)", particle: "·", rain: true  },
  Snow:         { accent: "#BFDBFE", bg: ["#dbeafe","#eff6ff","#f0f9ff"], glow: "rgba(191,219,254,0.4)", particle: "❄", rain: false },
  Thunderstorm: { accent: "#A78BFA", bg: ["#0f0f1a","#1e0050","#0f172a"], glow: "rgba(167,139,250,0.3)", particle: "⚡",rain: false },
  Mist:         { accent: "#D1D5DB", bg: ["#374151","#4b5563","#6b7280"], glow: "rgba(209,213,219,0.2)", particle: "≈", rain: false },
  Haze:         { accent: "#D1D5DB", bg: ["#374151","#4b5563","#6b7280"], glow: "rgba(209,213,219,0.2)", particle: "≈", rain: false },
  default:      { accent: "#6366F1", bg: ["#0f0f18","#1a1a2e","#16213e"], glow: "rgba(99,102,241,0.25)", particle: "✦", rain: false },
};

/* ──────────────────────────────────────────────────────────
   HELPERS
   ────────────────────────────────────────────────────────── */
function getTheme(condition) {
  return THEMES[condition] || THEMES.default;
}

function toF(c)    { return Math.round(c * 9 / 5 + 32); }
function toC(c)    { return Math.round(c); }
function cvt(c, u) { return u === "F" ? toF(c) : toC(c); }

function fmtTime(unix) {
  return new Date(unix * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function dayName(unix) {
  return new Date(unix * 1000).toLocaleDateString([], { weekday: "short" });
}

function windDir(deg) {
  const dirs = ["N","NE","E","SE","S","SW","W","NW"];
  return dirs[Math.round(deg / 45) % 8];
}

function conditionEmoji(main) {
  const map = { Clear: "☀️", Clouds: "☁️", Rain: "🌧️", Drizzle: "🌦️", Snow: "❄️", Thunderstorm: "⛈️", Mist: "🌫️", Haze: "🌫️" };
  return map[main] || "🌡️";
}

/* ──────────────────────────────────────────────────────────
   DOM REFERENCES
   ────────────────────────────────────────────────────────── */
const $ = id => document.getElementById(id);

const els = {
  bgBase:        $("bgBase"),
  bgGlowTop:     $("bgGlowTop"),
  bgGlowBottom:  $("bgGlowBottom"),
  particles:     $("particles"),
  clockTime:     $("clockTime"),
  clockDate:     $("clockDate"),
  searchForm:    $("searchForm"),
  searchInput:   $("searchInput"),
  cityPills:     $("cityPills"),
  loadingState:  $("loadingState"),
  emptyState:    $("emptyState"),
  errorState:    $("errorState"),
  errorMsg:      $("errorMsg"),
  weatherContent:$("weatherContent"),
  // Main card
  countryTag:    $("countryTag"),
  cityName:      $("cityName"),
  btnC:          $("btnC"),
  btnF:          $("btnF"),
  tempValue:     $("tempValue"),
  tempDegree:    $("tempDegree"),
  weatherDesc:   $("weatherDesc"),
  feelsLike:     $("feelsLike"),
  tempRange:     $("tempRange"),
  // Metrics
  humidity:      $("humidity"),
  pressure:      $("pressure"),
  wind:          $("wind"),
  windDir:       $("windDir"),
  visibility:    $("visibility"),
  // Sun
  sunriseTime:   $("sunriseTime"),
  sunsetTime:    $("sunsetTime"),
  cloudCover:    $("cloudCover"),
  // Forecast
  forecastRow:   $("forecastRow"),
  // Coords
  coordsRow:     $("coordsRow"),
};

/* ──────────────────────────────────────────────────────────
   STATE
   ────────────────────────────────────────────────────────── */
let currentWeather  = null;
let currentForecast = null;
let unit            = "C";

/* ──────────────────────────────────────────────────────────
   LIVE CLOCK
   ────────────────────────────────────────────────────────── */
function updateClock() {
  const now = new Date();
  els.clockTime.textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  els.clockDate.textContent = now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
}
updateClock();
setInterval(updateClock, 1000);

/* ──────────────────────────────────────────────────────────
   THEME APPLICATION
   ────────────────────────────────────────────────────────── */
function applyTheme(condition) {
  const t = getTheme(condition);
  const root = document.documentElement;
  root.style.setProperty("--accent",     t.accent);
  root.style.setProperty("--glow-color", t.glow);
  root.style.setProperty("--bg-from",    t.bg[0]);
  root.style.setProperty("--bg-mid",     t.bg[1]);
  root.style.setProperty("--bg-to",      t.bg[2]);
  spawnParticles(t.particle, t.rain);
}

/* ──────────────────────────────────────────────────────────
   PARTICLES
   ────────────────────────────────────────────────────────── */
function spawnParticles(symbol, isRain) {
  els.particles.innerHTML = "";
  const count = isRain ? 22 : 16;

  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.textContent = symbol;
    p.className   = isRain ? "rain-particle" : "particle";

    const spd   = (Math.random() * 18 + 8).toFixed(1);
    const delay = (Math.random() * 8).toFixed(2);
    const size  = (Math.random() * 14 + 8).toFixed(1);
    const op    = (Math.random() * 0.35 + 0.08).toFixed(2);

    p.style.cssText = `
      left: ${(Math.random() * 100).toFixed(1)}%;
      top:  ${(Math.random() * 100).toFixed(1)}%;
      font-size: ${size}px;
      --spd: ${spd}s;
      --delay: -${delay}s;
      --op: ${op};
    `;
    els.particles.appendChild(p);
  }
}

/* ──────────────────────────────────────────────────────────
   UI STATE HELPERS
   ────────────────────────────────────────────────────────── */
function showState(state) {
  // states: "loading" | "empty" | "error" | "weather"
  els.loadingState  .classList.toggle("hidden", state !== "loading");
  els.emptyState    .classList.toggle("hidden", state !== "empty");
  els.errorState    .classList.toggle("hidden", state !== "error");
  els.weatherContent.classList.toggle("hidden", state !== "weather");
}

/* ──────────────────────────────────────────────────────────
   RENDER WEATHER
   ────────────────────────────────────────────────────────── */
function renderWeather() {
  if (!currentWeather) return;
  const w = currentWeather;
  const condition = w.weather[0].main;

  // Theme
  applyTheme(condition);

  // Main card
  els.countryTag .textContent = `📍 ${w.sys.country}`;
  els.cityName   .textContent = w.name;
  els.weatherDesc.textContent = w.weather[0].description;
  renderTemp();

  // Metrics
  els.humidity  .textContent = w.main.humidity;
  els.pressure  .textContent = w.main.pressure;
  els.wind      .textContent = Math.round(w.wind.speed * 3.6);
  els.windDir   .textContent = `km/h ${windDir(w.wind.deg)}`;
  els.visibility.textContent = (w.visibility / 1000).toFixed(1);

  // Sun
  els.sunriseTime.textContent = fmtTime(w.sys.sunrise);
  els.sunsetTime .textContent = fmtTime(w.sys.sunset);
  els.cloudCover .textContent = `${w.clouds.all}%`;

  // Coords
  els.coordsRow.textContent =
    `${w.coord.lat.toFixed(4)}°N · ${w.coord.lon.toFixed(4)}°E`;

  // Forecast
  renderForecast();

  showState("weather");
}

function renderTemp() {
  if (!currentWeather) return;
  const w = currentWeather;
  els.tempValue .textContent = cvt(w.main.temp,       unit);
  els.feelsLike .textContent = `Feels ${cvt(w.main.feels_like, unit)}°`;
  els.tempRange .textContent = `${cvt(w.main.temp_min, unit)}° / ${cvt(w.main.temp_max, unit)}°`;
}

function renderForecast() {
  if (!currentForecast) return;
  els.forecastRow.innerHTML = "";

  currentForecast.forEach(day => {
    const item = document.createElement("div");
    item.className = "forecast-item";
    item.innerHTML = `
      <div class="forecast-day">${dayName(day.dt)}</div>
      <div class="forecast-emoji">${conditionEmoji(day.weather[0].main)}</div>
      <div class="forecast-high">${cvt(day.main.temp_max, unit)}°</div>
      <div class="forecast-low">${cvt(day.main.temp_min, unit)}°</div>
    `;
    els.forecastRow.appendChild(item);
  });
}

/* ──────────────────────────────────────────────────────────
   FETCH — Real OpenWeatherMap API
   ────────────────────────────────────────────────────────── */
async function fetchRealWeather(city) {
  const baseUrl = "https://api.openweathermap.org/data/2.5";
  const params  = `q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

  const [wRes, fRes] = await Promise.all([
    fetch(`${baseUrl}/weather?${params}`),
    fetch(`${baseUrl}/forecast?${params}`),
  ]);

  if (!wRes.ok) {
    const err = await wRes.json();
    throw new Error(err.message || "City not found");
  }

  const weatherData  = await wRes.json();
  const forecastData = await fRes.json();

  // Extract one entry per day (noon forecast)
  const dailyMap = {};
  forecastData.list.forEach(entry => {
    const date = new Date(entry.dt * 1000).toDateString();
    if (!dailyMap[date]) dailyMap[date] = entry;
  });
  const forecast = Object.values(dailyMap).slice(1, 6); // next 5 days

  return { weatherData, forecast };
}

/* ──────────────────────────────────────────────────────────
   FETCH — Demo / fallback
   ────────────────────────────────────────────────────────── */
async function fetchDemoWeather(city) {
  // Simulate network latency
  await new Promise(r => setTimeout(r, 900));

  const key      = city.toLowerCase().trim();
  const matchKey = Object.keys(DEMO_WEATHER).find(k => k.includes(key) || key.includes(k));

  let weatherData;
  if (matchKey) {
    weatherData = DEMO_WEATHER[matchKey];
  } else {
    // Return a random city with the searched name applied
    const fallback = Object.values(DEMO_WEATHER)[Math.floor(Math.random() * Object.keys(DEMO_WEATHER).length)];
    weatherData = { ...fallback, name: city.charAt(0).toUpperCase() + city.slice(1).toLowerCase() };
  }

  const forecastBase = matchKey && DEMO_FORECAST[matchKey] ? matchKey : "london";
  const forecast     = DEMO_FORECAST[forecastBase].map(f => ({
    ...f,
    dt: now() + (f.dt - now()), // keep offsets fresh
  }));

  return { weatherData, forecast };
}

/* ──────────────────────────────────────────────────────────
   MAIN SEARCH HANDLER
   ────────────────────────────────────────────────────────── */
async function searchCity(city) {
  if (!city.trim()) return;

  showState("loading");

  try {
    let weatherData, forecast;

    if (USE_DEMO_DATA) {
      ({ weatherData, forecast } = await fetchDemoWeather(city));
    } else {
      ({ weatherData, forecast } = await fetchRealWeather(city));
    }

    currentWeather  = weatherData;
    currentForecast = forecast;
    renderWeather();

  } catch (err) {
    els.errorMsg.textContent = `⚠️  ${err.message || "Could not fetch weather data. Please try again."}`;
    showState("error");
  }
}

/* ──────────────────────────────────────────────────────────
   EVENT LISTENERS
   ────────────────────────────────────────────────────────── */
// Search form submit
els.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  searchCity(els.searchInput.value);
});

// Quick city pills
els.cityPills.addEventListener("click", e => {
  const city = e.target.dataset.city;
  if (city) {
    els.searchInput.value = city;
    searchCity(city);
  }
});

// Unit toggle
els.btnC.addEventListener("click", () => {
  if (unit === "C") return;
  unit = "C";
  els.btnC.classList.add("active");
  els.btnF.classList.remove("active");
  renderTemp();
  renderForecast();
});

els.btnF.addEventListener("click", () => {
  if (unit === "F") return;
  unit = "F";
  els.btnF.classList.add("active");
  els.btnC.classList.remove("active");
  renderTemp();
  renderForecast();
});

/* ──────────────────────────────────────────────────────────
   INIT
   ────────────────────────────────────────────────────────── */
showState("empty");
applyTheme("default");   // set default particles & theme on load