export interface City {
    name: string;
    country?: string;
    latitude: number;
    longitude: number;
}

export interface Weather {
    temperature: number;
    weatherCode: number;
}

export interface WeatherResult {
    city: City;
    weather: Weather;
}