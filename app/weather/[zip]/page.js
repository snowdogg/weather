import { getWeather } from '@/utils/get-weather'
import styles from '../../page.module.css'
import WeatherCard from '../../../components/weathercard';
import { utcToZonedTime, format } from 'date-fns-tz';

export default async function Page({ params: { zip } }) {
  const weather = await getWeather(zip);
  const groupedWeather = groupByDay(weather);

  return (
    <>
    <div style={{"display": "flex", "justifyContent": "center"}}>
      <p className={styles.typewriter}>Upcoming Weather in {zip}:</p>
      </div>
      {weather.cod === "200" ? 
        groupedWeather.map((item, index) => {
          return (
            <WeatherCard
              key={index}
              date={item.date}
              high={item.high}
              low={item.low}
              threeHourData={item.data}
            />
          );
        })
        : "No weather data found"
      }
    </>
  );
}

function groupByDay(weather) {
  const groupedByDay = {};

  weather.list.forEach((item) => {
    const dateUTC = new Date(item.dt * 1000);
    const zonedDate = utcToZonedTime(dateUTC, "America/Los_Angeles");
    const formattedDate = getFormattedDate(zonedDate);

    if (!groupedByDay[formattedDate]) {
      groupedByDay[formattedDate] = {
        data: [],
        description: item.weather[0].description,
        high: -Infinity,
        low: Infinity
      };
    }

    groupedByDay[formattedDate].data.push({
      timeRange: getFormattedTimeRange(zonedDate),
      weather: item.weather[0],
      main: item.main,
    });

    if (item.main.temp_max > groupedByDay[formattedDate].high) {
      groupedByDay[formattedDate].high = item.main.temp_max;
    }

    if (item.main.temp_min < groupedByDay[formattedDate].low) {
      groupedByDay[formattedDate].low = item.main.temp_min;
    }
  });

  return Object.keys(groupedByDay).map((date) => {
    return {
      date,
      description: groupedByDay[date].description,
      high: groupedByDay[date].high,
      low: groupedByDay[date].low,
      data: groupedByDay[date].data  // Including data property
    };
  });
}



const getFormattedDate = (date) => {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${monthNames[date.getMonth()]} ${date.getDate()}th`;
};

const getFormattedTimeRange = (date) => {
  let hours = date.getHours();
  let ampm = hours >= 12 ? "pm" : "am";
  
  const nextHours = (hours + 3) % 24;
  let nextAmpm = nextHours >= 12 ? "pm" : "am";

  // Convert to 12-hour clock
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedNextHours = nextHours % 12 === 0 ? 12 : nextHours % 12;

  return `${formattedHours}${ampm}-${formattedNextHours}${nextAmpm}`;
};
