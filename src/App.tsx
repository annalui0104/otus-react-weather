import "./App.css";

import {
    SearchForm,
} from "./components/SearchForm";

import {
    WeatherCard,
} from "./components/WeatherCard";

import {
    HistoryList,
} from "./components/HistoryList";

import {
    useWeather,
} from "./hooks/useWeather";

import {
    useSearchHistory,
} from "./hooks/useSearchHistory";


function App() {
    const {
        weatherData,
        isLoading,
        error,
        searchWeather,
    } = useWeather();

    const {
        history,
        addToHistory,
    } = useSearchHistory();


    const handleSearch =
        async (
            city: string,
        ): Promise<void> => {
            const isSuccess =
                await searchWeather(
                    city,
                );

            if (isSuccess) {
                addToHistory(
                    city,
                );
            }
        };


    return (
        <main className="app">
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
                        handleSearch
                    }
                    isLoading={
                        isLoading
                    }
                />
            </div>

            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}

            {weatherData && (
                <WeatherCard
                    data={
                        weatherData
                    }
                />
            )}

            <HistoryList
                history={
                    history
                }
                onSelect={
                    handleSearch
                }
            />
        </main>
    );
}


export default App;