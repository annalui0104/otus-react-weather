import {
    useEffect,
} from "react";

import {
    useParams,
} from "react-router-dom";

import {
    WeatherCard,
} from "../components/WeatherCard";

import {
    MapCard,
} from "../components/MapCard";

import {
    useWeather,
} from "../hooks/useWeather";

import {
    useSearchHistory,
} from "../hooks/useSearchHistory";


export const CityPage = () => {
    const {
        cityName,
    } =
        useParams<{
            cityName: string;
        }>();

    const {
        weatherData,
        isLoading,
        error,
        searchWeather,
    } = useWeather();

    const {
        addToHistory,
    } = useSearchHistory();


    useEffect(
        () => {
            if (!cityName) {
                return;
            }

            const loadWeather =
                async (): Promise<void> => {
                    const isSuccess =
                        await searchWeather(
                            cityName,
                        );

                    if (isSuccess) {
                        addToHistory(
                            cityName,
                        );
                    }
                };

            void loadWeather();
        },
        [
            cityName,
            searchWeather,
            addToHistory,
        ],
    );


    if (!cityName) {
        return (
            <p className="error-message">
                Город не указан
            </p>
        );
    }


    return (
        <div className="city-page">
            {isLoading && (
                <div className="loading-card">
                    Загружаем погоду...
                </div>
            )}

            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}

            {weatherData && (
                <>
                    <WeatherCard
                        data={
                            weatherData
                        }
                    />

                    <MapCard
                        latitude={
                            weatherData
                                .city
                                .latitude
                        }
                        longitude={
                            weatherData
                                .city
                                .longitude
                        }
                        city={
                            weatherData
                                .city
                                .name
                        }
                    />
                </>
            )}
        </div>
    );
};