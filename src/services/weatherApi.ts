import type {
    City,
    Weather,
    WeatherResult,
} from "../types/weather";


interface GeocodingResponse {
    results?: {
        name: string;
        country?: string;
        latitude: number;
        longitude: number;
    }[];
}

interface ForecastResponse {
    current?: {
        temperature_2m: number;
        weather_code: number;
    };
}


const findCity = async (
    cityName: string,
): Promise<City> => {
    const url =
        "https://geocoding-api.open-meteo.com/v1/search" +
        `?name=${encodeURIComponent(cityName)}` +
        "&count=1" +
        "&language=ru" +
        "&format=json";

    const response =
        await fetch(url);

    if (!response.ok) {
        throw new Error(
            "Не удалось найти город",
        );
    }

    const data =
        (await response.json()) as GeocodingResponse;

    const city =
        data.results?.[0];

    if (!city) {
        throw new Error(
            "Город не найден",
        );
    }

    return {
        name: city.name,
        country: city.country,
        latitude: city.latitude,
        longitude: city.longitude,
    };
};


const getWeather = async (
    latitude: number,
    longitude: number,
): Promise<Weather> => {
    const url =
        "https://api.open-meteo.com/v1/forecast" +
        `?latitude=${latitude}` +
        `&longitude=${longitude}` +
        "&current=temperature_2m,weather_code";

    const response =
        await fetch(url);

    if (!response.ok) {
        throw new Error(
            "Не удалось загрузить погоду",
        );
    }

    const data =
        (await response.json()) as ForecastResponse;

    if (!data.current) {
        throw new Error(
            "Данные о погоде отсутствуют",
        );
    }

    return {
        temperature:
        data.current.temperature_2m,

        weatherCode:
        data.current.weather_code,
    };
};


export const getWeatherByCity =
    async (
        cityName: string,
    ): Promise<WeatherResult> => {
        const city =
            await findCity(cityName);

        const weather =
            await getWeather(
                city.latitude,
                city.longitude,
            );

        return {
            city,
            weather,
        };
    };