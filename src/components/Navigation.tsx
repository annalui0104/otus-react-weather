import {
    NavLink,
} from "react-router-dom";


export const Navigation = () => {
    return (
        <nav className="navigation">
            <NavLink
                to="/"
                end
                className={({
                                isActive,
                            }) =>
                    isActive
                        ? "navigation-link active"
                        : "navigation-link"
                }
            >
                Погода
            </NavLink>

            <NavLink
                to="/about"
                className={({
                                isActive,
                            }) =>
                    isActive
                        ? "navigation-link active"
                        : "navigation-link"
                }
            >
                О приложении
            </NavLink>
        </nav>
    );
};