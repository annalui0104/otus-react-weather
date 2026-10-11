import {
    useState,
} from "react";

import {
    getWeatherByCity,
} from "../services/weatherApi";

import type {
    WeatherResult,
} from "../types/weather";


interface UseWeatherResult {
    weatherData:
        WeatherResult |
        null;

    isLoading:
        boolean;

    error:
        string |
        null;

    searchWeather(
        city: string,
    ): Promise<boolean>;
}


export const useWeather =
    (): UseWeatherResult => {
        const [
            weatherData,
            setWeatherData,
        ] =
            useState<
                WeatherResult |
                null
            >(null);

        const [
            isLoading,
            setIsLoading,
        ] =
            useState(false);

        const [
            error,
            setError,
        ] =
            useState<
                string |
                null
            >(null);


        const searchWeather =
            async (
                city: string,
            ): Promise<boolean> => {
                const normalizedCity =
                    city.trim();

                if (!normalizedCity) {
                    return false;
                }

                setIsLoading(true);
                setError(null);

                try {
                    const result =
                        await getWeatherByCity(
                            normalizedCity,
                        );

                    setWeatherData(
                        result,
                    );

                    return true;
                } catch (
                    caughtError
                    ) {
                    const message =
                        caughtError instanceof Error
                            ? caughtError.message
                            : "Неизвестная ошибка";

                    setError(
                        message,
                    );

                    setWeatherData(
                        null,
                    );

                    return false;
                } finally {
                    setIsLoading(
                        false,
                    );
                }
            };


        return {
            weatherData,
            isLoading,
            error,
            searchWeather,
        };
    };