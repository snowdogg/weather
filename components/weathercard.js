import styles from './weathercard.module.css'
const weathercard = ( props ) => {
    const { date, high, low,  threeHourData, icon } = props;
    return (
        <div className={styles.cardcontainer}>
            <div className={styles.weathercard}>
               <h1> {date}</h1>
               <br></br>
               <h3> High of: {high}</h3>
               <h3>Low of: {low} </h3>
               <div>
                <div style={{"margin": "25px"}}>
        <h4>Here's the day's forecast:</h4>
        { threeHourData ? threeHourData.map((entry, index) => (
          <div style={{"margin":"20px"}} key={index}>
            <h2>{entry.timeRange}</h2>
            <div><img src={`http://openweathermap.org/img/wn/${entry.weather.icon}.png`}></img></div>
            
            <div>Temperature: {entry.main.temp}°C</div>
            <div>Description: {entry.weather.description}</div>
            
            {/* add more fields as needed */}
          </div>
        )) : ""}
        </div>
      </div>
            </div>
        </div>
    )
}

export default weathercard