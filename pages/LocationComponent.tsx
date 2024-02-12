import React, { useState, useEffect } from 'react';
import { CalculationMethod, Coordinates, PrayerTimes, Qibla, SunnahTimes } from 'adhan';

const LocationComponent = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Check if the Geolocation API is supported by the browser
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Retrieve latitude and longitude from the position object
          const { latitude, longitude } = position.coords;
          // const date = new Date(2022, 3, 20);
          const date = new Date();
          const method = CalculationMethod.Tehran()
          const coordinates = new Coordinates(latitude, longitude)
          const prayerTimes = new PrayerTimes(position.coords, date, method)

          var currentP = prayerTimes.currentPrayer();
          var nextP = prayerTimes.nextPrayer();
          var nextPrayerTime = prayerTimes.timeForPrayer(nextP);
          // var coordinates = new Coordinates(35.78056, -78.6389);
          var qiblaDirection = Qibla(coordinates);

          var sunnahTimes = new SunnahTimes(prayerTimes);
          // var middleOfTheNight = moment(sunnahTimes.middleOfTheNight)
          //   .tz('America/New_York')
          //   .format('h:mm A');

          setLocation({ latitude, longitude, prayerTimes });
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser');
    }
  }, []);

  return (
    <div>
      {location ? (
        <p>
          Your location: {location.latitude}, {location.longitude}
          <br />
          fajr: {location.prayerTimes.fajr.toTimeString().substring(0,5)}
          <br />
          sunrise: {location.prayerTimes.sunrise.toTimeString().substring(0,5)}
          <br />
          dhuhr: {location.prayerTimes.dhuhr.toTimeString().substring(0,5)}
          <br />
          sunset: {location.prayerTimes.sunset.toTimeString().substring(0,5)}
          <br />
          maghrib: {location.prayerTimes.maghrib.toTimeString().substring(0,5)}
          <br />
          isha: {location.prayerTimes.isha.toTimeString().substring(0,5)}
        </p>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
};

export default LocationComponent;
