import {
    useState,
} from "react";


interface SearchFormProps {
    onSearch(
        city: string,
    ): void;

    isLoading: boolean;
}


export const SearchForm = ({
                               onSearch,
                               isLoading,
                           }: SearchFormProps) => {
    const [
        city,
        setCity,
    ] = useState("");


    const handleSubmit = (
        event:
        React.FormEvent<
            HTMLFormElement
        >,
    ): void => {
        event.preventDefault();

        const normalizedCity =
            city.trim();

        if (!normalizedCity) {
            return;
        }

        onSearch(
            normalizedCity,
        );
    };


    return (
        <form
            className="search-form"
            onSubmit={
                handleSubmit
            }
        >
            <input
                className="search-input"
                type="text"
                value={city}
                onChange={(
                    event,
                ) => {
                    setCity(
                        event.target
                            .value,
                    );
                }}
                placeholder="Введите город"
                disabled={
                    isLoading
                }
            />

            <button
                className="search-button"
                type="submit"
                disabled={
                    isLoading
                }
            >
                {isLoading
                    ? "Загрузка..."
                    : "Найти"}
            </button>
        </form>
    );
};