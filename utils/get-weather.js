import { cache } from 'react'
import axios from 'axios'

export const revalidate = 3600 // revalidate the data at most every hour

export const getWeather =  cache(async (zipCode) => {
    const apiKey = process.env.OPEN_WEATHER_API_KEY;
    console.log("zipCode",zipCode)
    console.log("apiKey",apiKey)
    if (!apiKey || !zipCode) {
        return {"cod":"400","message":"Nothing to geocode"}
    }
    const url = `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},us&appid=${apiKey}&units=imperial`;
    console.log("url",url)
    const response = await axios.get(url);
    return response.data;
  });
  