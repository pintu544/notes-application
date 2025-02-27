import {
  THEME_TOGGLE,
  THEME_SET_LIGHT,
  THEME_SET_DARK,
} from "../constants/themeConstants";

const savedTheme = localStorage.getItem("theme");
const initialState = {
  darkMode: savedTheme ? savedTheme === "dark" : false,
};

export const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case THEME_TOGGLE:
      return { darkMode: !state.darkMode };
    case THEME_SET_LIGHT:
      return { darkMode: false };
    case THEME_SET_DARK:
      return { darkMode: true };
    default:
      return state;
  }
};
