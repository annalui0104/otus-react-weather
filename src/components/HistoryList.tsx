interface HistoryListProps {
    history:
        string[];

    onSelect(
        city: string,
    ): void;
}


export const HistoryList = ({
                                history,
                                onSelect,
                            }: HistoryListProps) => {
    if (
        history.length === 0
    ) {
        return null;
    }

    return (
        <section className="history-card">
            <h2>
                История поиска
            </h2>

            <p className="history-subtitle">
                Недавно просмотренные города
            </p>

            <ul className="history-list">
                {history.map(
                    (city) => (
                        <li
                            key={
                                city
                            }
                        >
                            <button
                                className="history-button"
                                type="button"
                                onClick={() => {
                                    onSelect(
                                        city,
                                    );
                                }}
                            >
                                {city}
                            </button>
                        </li>
                    ),
                )}
            </ul>
        </section>
    );
};