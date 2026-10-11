import {
    useNavigate,
} from "react-router-dom";

import {
    SearchForm,
} from "../components/SearchForm";

import {
    HistoryList,
} from "../components/HistoryList";

import {
    useSearchHistory,
} from "../hooks/useSearchHistory";


export const HomePage = () => {
    const navigate =
        useNavigate();

    const {
        history,
    } = useSearchHistory();


    const openCity = (
        city: string,
    ): void => {
        navigate(
            `/city/${encodeURIComponent(
                city,
            )}`,
        );
    };


    return (
        <>
            <header className="app-header">
                <div>
                    <p className="app-label">
                        WEATHER
                    </p>

                    <h1>
                        Погода сейчас
                    </h1>

                    <p className="app-subtitle">
                        Узнайте текущую погоду
                        в любом городе
                    </p>
                </div>

                <div className="sun-icon">
                    ☀️
                </div>
            </header>

            <div className="search-card">
                <SearchForm
                    onSearch={
                        openCity
                    }
                    isLoading={
                        false
                    }
                />
            </div>

            <HistoryList
                history={
                    history
                }
                onSelect={
                    openCity
                }
            />
        </>
    );
};