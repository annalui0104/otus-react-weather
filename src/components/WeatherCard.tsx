import type {
    WeatherResult,
} from "../types/weather";


interface WeatherCardProps {
    data:
        WeatherResult;
}


const getWeatherDescription = (
    code: number,
): string => {
    const descriptions:
        Record<
            number,
            string
        > = {
        0: "Ясно",
        1: "Преимущественно ясно",
        2: "Переменная облачность",
        3: "Пасмурно",
        45: "Туман",
        48: "Изморозь",
        51: "Лёгкая морось",
        53: "Морось",
        55: "Сильная морось",
        61: "Небольшой дождь",
        63: "Дождь",
        65: "Сильный дождь",
        71: "Небольшой снег",
        73: "Снег",
        75: "Сильный снег",
        80: "Небольшой ливень",
        81: "Ливень",
        82: "Сильный ливень",
        95: "Гроза",
    };

    return (
        descriptions[code] ??
        "Нет данных"
    );
};


export const WeatherCard = ({
                                data,
                            }: WeatherCardProps) => {
    const {
        city,
        weather,
    } = data;

    return (
        <section className="weather-card">
            <div>
                <p className="weather-city-label">
                    ТЕКУЩАЯ ПОГОДА
                </p>

                <h2>
                    {city.name}

                    {city.country
                        ? `, ${city.country}`
                        : ""}
                </h2>

                <p className="weather-condition">
                    {getWeatherDescription(
                        weather.weatherCode,
                    )}
                </p>
            </div>

            <p className="weather-temperature">
                {Math.round(
                    weather.temperature,
                )}
                <span>
                    °C
                </span>
            </p>
        </section>
    );
};