export const AboutPage = () => {
    return (
        <section className="about-card">
            <p className="app-label">
                ABOUT
            </p>

            <h1>
                О приложении
            </h1>

            <p>
                Weather App показывает
                текущую погоду в выбранном
                городе.
            </p>

            <p>
                Данные о погоде
                загружаются через Open-Meteo,
                а карта отображается
                с помощью OpenStreetMap.
            </p>
        </section>
    );
};