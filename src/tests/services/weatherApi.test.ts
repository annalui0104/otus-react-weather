import {
    afterEach,
    describe,
    expect,
    test,
    vi,
} from "vitest";

import {
    getWeatherByCity,
} from "../../services/weatherApi";


describe(
    "weatherApi",
    () => {
        afterEach(() => {
            vi.unstubAllGlobals();
        });


        test(
            "получает погоду по названию города",
            async () => {
                const fetchMock =
                    vi.fn<
                        typeof fetch
                    >();

                fetchMock
                    .mockResolvedValueOnce(
                        new Response(
                            JSON.stringify({
                                results: [
                                    {
                                        name:
                                            "Москва",

                                        country:
                                            "Россия",

                                        latitude:
                                            55.75,

                                        longitude:
                                            37.61,
                                    },
                                ],
                            }),
                            {
                                status: 200,
                            },
                        ),
                    )
                    .mockResolvedValueOnce(
                        new Response(
                            JSON.stringify({
                                current: {
                                    temperature_2m:
                                        18,

                                    weather_code:
                                        2,
                                },
                            }),
                            {
                                status: 200,
                            },
                        ),
                    );

                vi.stubGlobal(
                    "fetch",
                    fetchMock,
                );

                const result =
                    await getWeatherByCity(
                        "Москва",
                    );

                expect(
                    result,
                ).toEqual({
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

                expect(
                    fetchMock,
                ).toHaveBeenCalledTimes(
                    2,
                );
            },
        );


        test(
            "выбрасывает ошибку если город не найден",
            async () => {
                const fetchMock =
                    vi.fn<
                        typeof fetch
                    >();

                fetchMock.mockResolvedValue(
                    new Response(
                        JSON.stringify({
                            results: [],
                        }),
                        {
                            status: 200,
                        },
                    ),
                );

                vi.stubGlobal(
                    "fetch",
                    fetchMock,
                );

                await expect(
                    getWeatherByCity(
                        "неизвестный-город",
                    ),
                ).rejects.toThrow(
                    "Город не найден",
                );
            },
        );


        test(
            "обрабатывает ошибку запроса города",
            async () => {
                const fetchMock =
                    vi.fn<
                        typeof fetch
                    >();

                fetchMock.mockResolvedValue(
                    new Response(
                        null,
                        {
                            status: 500,
                        },
                    ),
                );

                vi.stubGlobal(
                    "fetch",
                    fetchMock,
                );

                await expect(
                    getWeatherByCity(
                        "Москва",
                    ),
                ).rejects.toThrow(
                    "Не удалось найти город",
                );
            },
        );
    },
);