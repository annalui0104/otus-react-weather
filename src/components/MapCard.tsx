interface MapCardProps {
    latitude: number;
    longitude: number;
    city: string;
}


export const MapCard = ({
                            latitude,
                            longitude,
                            city,
                        }: MapCardProps) => {
    const offset =
        0.08;

    const bbox = [
        longitude - offset,
        latitude - offset,
        longitude + offset,
        latitude + offset,
    ].join(",");

    const marker =
        `${latitude},${longitude}`;

    const mapUrl =
        "https://www.openstreetmap.org/export/embed.html" +
        `?bbox=${encodeURIComponent(bbox)}` +
        "&layer=mapnik" +
        `&marker=${encodeURIComponent(marker)}`;

    return (
        <section className="map-card">
            <h2>
                Карта
            </h2>

            <iframe
                className="map-frame"
                src={mapUrl}
                title={`Карта города ${city}`}
                loading="lazy"
            />
        </section>
    );
};