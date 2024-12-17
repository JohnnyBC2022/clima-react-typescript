import { Weather } from "../../hooks/useWeather";
import { formatTemperature } from "../../utils";

type WeatherDetailProps = {
  weather: Weather;
};

export default function WeatherDetail({ weather }: WeatherDetailProps) {
  return (
    <div>
      <h2>Clima de: {weather.name}</h2>
      <p>{formatTemperature(weather.main.temp)} &deg;C</p>
      <div>
        <p>
          Sensación térmica:{" "}
          <span>{formatTemperature(weather.main.feels_like)} &deg;C</span>
        </p>
        <p>
          Temp mín:{" "}
          <span>{formatTemperature(weather.main.temp_min)} &deg;C</span>
        </p>
        <p>
          Temp max:{" "}
          <span>{formatTemperature(weather.main.temp_max)} &deg;C</span>
        </p>
      </div>
    </div>
  );
}
