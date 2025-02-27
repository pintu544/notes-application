
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../actions/themeActions";
import { Button } from "react-bootstrap";

const ThemeToggle = () => {
    const dispatch = useDispatch();
    const { darkMode } = useSelector((state) => state.theme);

    return (
        <Button
            variant={darkMode ? "light" : "dark"}
            onClick={() => dispatch(toggleTheme())}
            className="mx-2"
        >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
        </Button>
    );
};

export default ThemeToggle;