import {
    beforeEach,
    describe,
    expect,
    test,
    vi,
} from "vitest";

import {
    render,
    screen,
    waitFor,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import {
    MemoryRouter,
    useLocation,
} from "react-router-dom";

import App from "../App";

import {
    getWeatherByCity,
} from "../services/weatherApi";


vi.mock(
    "../services/weatherApi",
    () => ({
        getWeatherByCity:
            vi.fn(),
    }),
);


const LocationDisplay = () => {
    const location =
        useLocation();

    return (
        <div data-testid="location">
            {location.pathname}
        </div>
    );
};


const renderApp = (
    initialPath = "/",
) => {
    return render(
        <MemoryRouter
            initialEntries={[
                initialPath,
            ]}
        >
            <App />

            <LocationDisplay />
        </MemoryRouter>,
    );
};


describe(
    "App routing",
    () => {
        beforeEach(() => {
            localStorage.clear();

            vi.clearAllMocks();

            vi.mocked(
                getWeatherByCity,
            ).mockResolvedValue({
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
        });


        test(
            "отображает главный экран",
            () => {
                renderApp();

                expect(
                    screen.getByRole(
                        "heading",
                        {
                            name:
                                "Погода сейчас",
                        },
                    ),
                ).toBeInTheDocument();

                expect(
                    screen.getByPlaceholderText(
                        "Введите город",
                    ),
                ).toBeInTheDocument();
            },
        );


        test(
            "переходит на страницу about",
            async () => {
                const user =
                    userEvent.setup();

                renderApp();

                await user.click(
                    screen.getByRole(
                        "link",
                        {
                            name:
                                "О приложении",
                        },
                    ),
                );

                expect(
                    screen.getByRole(
                        "heading",
                        {
                            name:
                                "О приложении",
                        },
                    ),
                ).toBeInTheDocument();

                expect(
                    screen.getByTestId(
                        "location",
                    ),
                ).toHaveTextContent(
                    "/about",
                );
            },
        );


        test(
            "открывает параметризованный роут города",
            async () => {
                renderApp(
                    "/city/Москва",
                );

                expect(
                    await screen.findByText(
                        "Москва, Россия",
                    ),
                ).toBeInTheDocument();

                expect(
                    getWeatherByCity,
                ).toHaveBeenCalledWith(
                    "Москва",
                );

                expect(
                    screen.getByTitle(
                        "Карта города Москва",
                    ),
                ).toBeInTheDocument();
            },
        );


        test(
            "поиск города меняет URL",
            async () => {
                const user =
                    userEvent.setup();

                renderApp();

                const input =
                    screen.getByPlaceholderText(
                        "Введите город",
                    );

                await user.type(
                    input,
                    "Москва",
                );

                await user.click(
                    screen.getByRole(
                        "button",
                        {
                            name:
                                "Найти",
                        },
                    ),
                );

                await waitFor(
                    () => {
                        const pathname =
                            screen
                                .getByTestId(
                                    "location",
                                )
                                .textContent ??
                            "";

                        expect(
                            decodeURIComponent(
                                pathname,
                            ),
                        ).toBe(
                            "/city/Москва",
                        );
                    },
                );

                expect(
                    await screen.findByText(
                        "Москва, Россия",
                    ),
                ).toBeInTheDocument();
            },
        );
    },
);