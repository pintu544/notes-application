
import { THEME_TOGGLE, THEME_SET_LIGHT, THEME_SET_DARK } from "../constants/themeConstants";

export const toggleTheme = () => (dispatch, getState) => {
    dispatch({ type: THEME_TOGGLE });

    const { theme } = getState();
    localStorage.setItem("theme", theme.darkMode ? "dark" : "light");
};

export const setLightMode = () => (dispatch) => {
    dispatch({ type: THEME_SET_LIGHT });
    localStorage.setItem("theme", "light");
};

export const setDarkMode = () => (dispatch) => {
    dispatch({ type: THEME_SET_DARK });
    localStorage.setItem("theme", "dark");
};