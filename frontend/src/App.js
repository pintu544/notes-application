import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import MyNotes from "./screens/MyNotes/MyNotes";
import SingleNote from "./screens/SingleNote/SingleNote";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import CreateNote from "./screens/SingleNote/CreateNote";
import {useEffect, useState} from "react";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import { useSelector } from "react-redux";
import { connectSocket, disconnectSocket } from "./services/socket";
function App() {
  const [search, setSearch] = useState("");
    const { darkMode } = useSelector((state) => state.theme);
    const { userInfo } = useSelector((state) => state.userLogin);
    // Set data-theme attribute on the body
    useEffect(() => {
        document.body.setAttribute("data-theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    useEffect(() => {
        if (userInfo && userInfo._id) {
            connectSocket(userInfo._id);
        } else {
            disconnectSocket();
        }

        return () => {
            disconnectSocket();
        };
    }, [userInfo]);
  return (
    <Router>
      <Header setSearch={(s) => setSearch(s)} />
      <main className="App">
        <Route path="/" component={LandingPage} exact />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route
          path="/mynotes"
          component={({ history }) => (
            <MyNotes search={search} history={history} />
          )}
        />
        <Route path="/note/:id" component={SingleNote} />
        <Route path="/createnote" component={CreateNote} />;
        <Route path="/profile" component={ProfileScreen} />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
