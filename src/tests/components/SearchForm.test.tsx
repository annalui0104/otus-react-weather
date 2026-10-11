import {
    describe,
    expect,
    test,
    vi,
} from "vitest";

import {
    render,
    screen,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import {
    SearchForm,
} from "../../components/SearchForm";


describe(
    "SearchForm",
    () => {
        test(
            "отправляет введённый город",
            async () => {
                const user =
                    userEvent.setup();

                const onSearch =
                    vi.fn();

                render(
                    <SearchForm
                        onSearch={onSearch}
                        isLoading={false}
                    />,
                );

                const input =
                    screen.getByPlaceholderText(
                        "Введите город",
                    );

                await user.type(
                    input,
                    "  Москва  ",
                );

                await user.click(
                    screen.getByRole(
                        "button",
                        {
                            name: "Найти",
                        },
                    ),
                );

                expect(
                    onSearch,
                ).toHaveBeenCalledWith(
                    "Москва",
                );
            },
        );


        test(
            "не отправляет пустую строку",
            async () => {
                const user =
                    userEvent.setup();

                const onSearch =
                    vi.fn();

                render(
                    <SearchForm
                        onSearch={onSearch}
                        isLoading={false}
                    />,
                );

                const input =
                    screen.getByPlaceholderText(
                        "Введите город",
                    );

                await user.type(
                    input,
                    "   ",
                );

                await user.click(
                    screen.getByRole(
                        "button",
                        {
                            name: "Найти",
                        },
                    ),
                );

                expect(
                    onSearch,
                ).not.toHaveBeenCalled();
            },
        );


        test(
            "показывает загрузку",
            () => {
                render(
                    <SearchForm
                        onSearch={
                            vi.fn()
                        }
                        isLoading
                    />,
                );

                expect(
                    screen.getByRole(
                        "button",
                        {
                            name:
                                "Загрузка...",
                        },
                    ),
                ).toBeDisabled();
            },
        );
    },
);