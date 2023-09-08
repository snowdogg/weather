# 🌦 Basic Weather App

Powered by the **OpenWeather API**, this app allows you to get a glimpse of the upcoming weather based on ZIP codes.

## 📍 How to Use

To look up the weather for a specific area, use the following URL format:

``
/weather/{ZIP_CODE}
``

### Example:

To view the upcoming weather in Hollywood, visit:

🔗 [Hollywood Weather](https://weather-gilt-alpha.vercel.app/weather/90028)

## ⏰ Time Zone

All times are displayed in the **West Coast Time Zone (PST/PDT)** for the sake of simplicity in this quick demo project.

## 🛠 Setup & Installation

If you'd like to run this project locally, follow these steps:

1. **Clone the Repository**

2. **Install Dependencies**

3. **Environment Variables**: Create a `.env` file in the root directory and add the following:

    ``
    OPEN_WEATHER_API_KEY=your_api_key_here
    ``

Replace `your_api_key_here` with your actual OpenWeather API key.
