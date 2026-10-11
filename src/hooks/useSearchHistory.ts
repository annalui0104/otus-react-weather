import {
    useCallback,
    useState,
} from "react";


const STORAGE_KEY =
    "weather-search-history";

const MAX_HISTORY_ITEMS =
    10;


const readHistory =
    (): string[] => {
        const savedHistory =
            localStorage.getItem(
                STORAGE_KEY,
            );

        if (!savedHistory) {
            return [];
        }

        try {
            const parsed:
                unknown =
                JSON.parse(
                    savedHistory,
                );

            if (
                !Array.isArray(
                    parsed,
                )
            ) {
                return [];
            }

            return parsed.filter(
                (
                    item,
                ): item is string =>
                    typeof item ===
                    "string",
            );
        } catch {
            return [];
        }
    };


export const useSearchHistory =
    () => {
        const [
            history,
            setHistory,
        ] =
            useState<string[]>(
                readHistory,
            );


        const addToHistory =
            useCallback(
                (
                    city: string,
                ): void => {
                    const normalizedCity =
                        city.trim();

                    if (
                        !normalizedCity
                    ) {
                        return;
                    }

                    setHistory(
                        (
                            currentHistory,
                        ) => {
                            const filteredHistory =
                                currentHistory.filter(
                                    (
                                        item,
                                    ) =>
                                        item
                                            .toLowerCase() !==
                                        normalizedCity
                                            .toLowerCase(),
                                );

                            const updatedHistory =
                                [
                                    normalizedCity,
                                    ...filteredHistory,
                                ].slice(
                                    0,
                                    MAX_HISTORY_ITEMS,
                                );

                            localStorage.setItem(
                                STORAGE_KEY,
                                JSON.stringify(
                                    updatedHistory,
                                ),
                            );

                            return updatedHistory;
                        },
                    );
                },
                [],
            );


        return {
            history,
            addToHistory,
        };
    };