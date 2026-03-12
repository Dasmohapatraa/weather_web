# 🌤️ Atmos — Weather Intelligence

A real-time weather forecasting web application built with vanilla JavaScript and the OpenWeatherMap API. Search any city worldwide to get live temperature, humidity, wind speed, and a 5-day forecast — all wrapped in a dynamic UI that changes theme based on current weather conditions.

---

## 🔴 Live Demo

> Open `index.html` directly in your browser — no build tools or server required.

---

## ✨ Features

- 🔍 **City-based search** — look up weather for any city in the world
- 🌡️ **Current conditions** — temperature, feels like, humidity, pressure, wind, visibility
- 📅 **5-day forecast** — daily high/low with weather icons
- 🎨 **Dynamic theming** — background, accent colors, and particles shift based on weather (sunny, rainy, stormy, etc.)
- 🌡️ **°C / °F toggle** — switch temperature units instantly
- 🕐 **Live clock** — real-time date and time display
- 🌅 **Sunrise & Sunset times**
- 📍 **Geo-coordinates** display
- 💻 **Fully responsive** — works seamlessly on mobile, tablet, and desktop
- ⚡ **Zero dependencies** — pure HTML, CSS, and JavaScript

---

## 📁 Project Structure

```
atmos-weather-app/
│
├── index.html       # App structure and HTML markup
├── style.css        # All styling, animations, and responsive layout
├── script.js        # API integration, data rendering, and app logic
└── README.md        # Project documentation
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Dasmohapatraa/weather_web.git
cd weather_web
```

### 2. Get a Free API Key

1. Sign up at [https://openweathermap.org/api](https://openweathermap.org/api)
2. Navigate to **API Keys** in your account dashboard
3. Copy your default key (or generate a new one)

> ⚠️ New API keys can take up to 2 hours to activate after registration.

### 3. Add Your API Key

Open `script.js` and update the top of the file:

```js
const API_KEY       = "YOUR_OPENWEATHERMAP_API_KEY";  // ← paste your key here
const USE_DEMO_DATA = false;                           // ← set to false
```

### 4. Open in Browser

Simply open `index.html` in any modern browser — no server or build step needed.

```bash
# macOS
open index.html

# Windows
start index.html

# Linux
xdg-open index.html
```

---

## 🔑 API Reference

This app uses two endpoints from the [OpenWeatherMap API](https://openweathermap.org/api) (free tier):

| Endpoint | Description |
|----------|-------------|
| `/data/2.5/weather` | Current weather by city name |
| `/data/2.5/forecast` | 5-day / 3-hour forecast data |

**Example request:**
```
https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_KEY&units=metric
```

---

## 🛠️ Built With

- **HTML5** — semantic markup and structure
- **CSS3** — custom properties, animations, backdrop-filter, grid/flexbox
- **JavaScript (ES6+)** — async/await, fetch API, DOM manipulation
- **OpenWeatherMap API** — live weather data
- **Google Fonts** — Outfit + Space Mono typefaces

---

## 📸 Screenshots

> _Add screenshots of your app here by dragging images into this section on GitHub._

| Default State | Sunny Weather | Rainy Weather |
|---------------|--------------|---------------|
| ![empty](<img width="1891" height="1013" alt="Screenshot 2026-03-12 183141" src="https://github.com/user-attachments/assets/33b6a329-e91c-4114-b2f8-27bdfcf83900" />
.png) | ![sunny](<img width="1885" height="1019" alt="Screenshot 2026-03-12 183237" src="https://github.com/user-attachments/assets/0bf276be-22e6-4513-a00c-efcd2d8d88ff" />
.png) | ![rainy](<img width="1874" height="1003" alt="Screenshot 2026-03-12 183304" src="https://github.com/user-attachments/assets/a0462ce3-0a2d-4267-bdbb-c0cbfab9473b" />
.png) |

---

## 🧪 Demo Mode

Don't have an API key yet? The app ships with built-in demo data for 6 cities so you can explore the UI immediately:

- 🇬🇧 London &nbsp; 🇯🇵 Tokyo &nbsp; 🇺🇸 New York
- 🇦🇺 Sydney &nbsp; 🇫🇷 Paris &nbsp; 🇦🇪 Dubai

To use demo mode, keep `USE_DEMO_DATA = true` in `script.js` (default setting).

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 👤 Author

**Piyush Dasmohapatra**
- GitHub: [@Dasmohapatraa](https://github.com/Dasmohapatraa)

---

> ⭐ If you found this project helpful, please consider giving it a star on GitHub!
