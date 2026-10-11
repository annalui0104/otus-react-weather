import {
    beforeEach,
    describe,
    expect,
    test,
} from "vitest";

import {
    act,
    renderHook,
} from "@testing-library/react";

import {
    useSearchHistory,
} from "../../hooks/useSearchHistory";


describe(
    "useSearchHistory",
    () => {
        beforeEach(() => {
            localStorage.clear();
        });


        test(
            "добавляет город в историю",
            () => {
                const {
                    result,
                } = renderHook(
                    () =>
                        useSearchHistory(),
                );

                act(() => {
                    result.current
                        .addToHistory(
                            "Москва",
                        );
                });

                expect(
                    result.current
                        .history,
                ).toEqual([
                    "Москва",
                ]);
            },
        );


        test(
            "не создаёт дубликаты",
            () => {
                const {
                    result,
                } = renderHook(
                    () =>
                        useSearchHistory(),
                );

                act(() => {
                    result.current
                        .addToHistory(
                            "Москва",
                        );

                    result.current
                        .addToHistory(
                            "москва",
                        );
                });

                expect(
                    result.current
                        .history,
                ).toHaveLength(1);
            },
        );


        test(
            "читает сохранённую историю",
            () => {
                localStorage.setItem(
                    "weather-search-history",
                    JSON.stringify([
                        "Казань",
                    ]),
                );

                const {
                    result,
                } = renderHook(
                    () =>
                        useSearchHistory(),
                );

                expect(
                    result.current
                        .history,
                ).toEqual([
                    "Казань",
                ]);
            },
        );
    },
);