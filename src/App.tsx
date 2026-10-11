import "./App.css";

import {
    Route,
    Routes,
} from "react-router-dom";

import {
    Navigation,
} from "./components/Navigation";

import {
    HomePage,
} from "./pages/HomePage";

import {
    CityPage,
} from "./pages/CityPage";

import {
    AboutPage,
} from "./pages/AboutPage";


function App() {
    return (
        <main className="app">
            <Navigation />

            <Routes>
                <Route
                    path="/"
                    element={
                        <HomePage />
                    }
                />

                <Route
                    path="/city/:cityName"
                    element={
                        <CityPage />
                    }
                />

                <Route
                    path="/about"
                    element={
                        <AboutPage />
                    }
                />
            </Routes>
        </main>
    );
}


export default App;