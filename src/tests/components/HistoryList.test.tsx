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
    HistoryList,
} from "../../components/HistoryList";


describe(
    "HistoryList",
    () => {
        test(
            "не отображается при пустой истории",
            () => {
                const {
                    container,
                } = render(
                    <HistoryList
                        history={[]}
                        onSelect={
                            vi.fn()
                        }
                    />,
                );

                expect(
                    container,
                ).toBeEmptyDOMElement();
            },
        );


        test(
            "показывает города из истории",
            () => {
                render(
                    <HistoryList
                        history={[
                            "Москва",
                            "Казань",
                        ]}
                        onSelect={
                            vi.fn()
                        }
                    />,
                );

                expect(
                    screen.getByText(
                        "Москва",
                    ),
                ).toBeInTheDocument();

                expect(
                    screen.getByText(
                        "Казань",
                    ),
                ).toBeInTheDocument();
            },
        );


        test(
            "вызывает onSelect при выборе города",
            async () => {
                const user =
                    userEvent.setup();

                const onSelect =
                    vi.fn();

                render(
                    <HistoryList
                        history={[
                            "Москва",
                        ]}
                        onSelect={
                            onSelect
                        }
                    />,
                );

                await user.click(
                    screen.getByRole(
                        "button",
                        {
                            name:
                                "Москва",
                        },
                    ),
                );

                expect(
                    onSelect,
                ).toHaveBeenCalledWith(
                    "Москва",
                );
            },
        );
    },
);