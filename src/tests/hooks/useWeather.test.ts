import {
    describe,
    expect,
    test,
    vi,
} from "vitest";

import {
    act,
    renderHook,
} from "@testing-library/react";

import {
    getWeatherByCity,
} from "../../services/weatherApi";

import {
    useWeather,
} from "../../hooks/useWeather";


vi.mock(
    "../../services/weatherApi",
    () => ({
        getWeatherByCity:
            vi.fn(),
    }),
);


describe(
    "useWeather",
    () => {
        test(
            "загружает погоду",
            async () => {
                const mockedGetWeather =
                    vi.mocked(
                        getWeatherByCity,
                    );

                mockedGetWeather
                    .mockResolvedValue({
                        city: {
                            name:
                                "Москва",

                            country:
                                "Россия",

                            latitude:
                                55.75,

                            longitude:
                                37.61,
                        },

                        weather: {
                            temperature:
                                18,

                            weatherCode:
                                2,
                        },
                    });

                const {
                    result,
                } = renderHook(
                    () =>
                        useWeather(),
                );

                let isSuccess =
                    false;

                await act(
                    async () => {
                        isSuccess =
                            await result
                                .current
                                .searchWeather(
                                    "Москва",
                                );
                    },
                );

                expect(
                    isSuccess,
                ).toBe(true);

                expect(
                    result.current
                        .weatherData
                        ?.city.name,
                ).toBe(
                    "Москва",
                );

                expect(
                    result.current
                        .error,
                ).toBeNull();
            },
        );


        test(
            "сохраняет ошибку запроса",
            async () => {
                const mockedGetWeather =
                    vi.mocked(
                        getWeatherByCity,
                    );

                mockedGetWeather
                    .mockRejectedValue(
                        new Error(
                            "Город не найден",
                        ),
                    );

                const {
                    result,
                } = renderHook(
                    () =>
                        useWeather(),
                );

                let isSuccess =
                    true;

                await act(
                    async () => {
                        isSuccess =
                            await result
                                .current
                                .searchWeather(
                                    "abc",
                                );
                    },
                );

                expect(
                    isSuccess,
                ).toBe(false);

                expect(
                    result.current
                        .error,
                ).toBe(
                    "Город не найден",
                );

                expect(
                    result.current
                        .weatherData,
                ).toBeNull();
            },
        );


        test(
            "не выполняет поиск пустого города",
            async () => {
                const mockedGetWeather =
                    vi.mocked(
                        getWeatherByCity,
                    );

                const {
                    result,
                } = renderHook(
                    () =>
                        useWeather(),
                );

                let isSuccess =
                    true;

                await act(
                    async () => {
                        isSuccess =
                            await result
                                .current
                                .searchWeather(
                                    "   ",
                                );
                    },
                );

                expect(
                    isSuccess,
                ).toBe(false);

                expect(
                    mockedGetWeather,
                ).not.toHaveBeenCalled();
            },
        );
    },
);