import {
    describe,
    expect,
    test,
} from "vitest";

import {
    render,
    screen,
} from "@testing-library/react";

import {
    WeatherCard,
} from "../../components/WeatherCard";


describe(
    "WeatherCard",
    () => {
        test(
            "отображает город и погоду",
            () => {
                render(
                    <WeatherCard
                        data={{
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
                                    17.6,

                                weatherCode:
                                    2,
                            },
                        }}
                    />,
                );

                expect(
                    screen.getByText(
                        "Москва, Россия",
                    ),
                ).toBeInTheDocument();

                expect(
                    screen.getByText(
                        "Переменная облачность",
                    ),
                ).toBeInTheDocument();

                expect(
                    screen.getByText(
                        "18",
                    ),
                ).toBeInTheDocument();
            },
        );


        test(
            "работает без названия страны",
            () => {
                render(
                    <WeatherCard
                        data={{
                            city: {
                                name:
                                    "Москва",

                                latitude:
                                    1,

                                longitude:
                                    2,
                            },

                            weather: {
                                temperature:
                                    10,

                                weatherCode:
                                    999,
                            },
                        }}
                    />,
                );

                expect(
                    screen.getByText(
                        "Москва",
                    ),
                ).toBeInTheDocument();

                expect(
                    screen.getByText(
                        "Нет данных",
                    ),
                ).toBeInTheDocument();
            },
        );
    },
);