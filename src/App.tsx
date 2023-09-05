import "./App.css";
import { Routes, Route } from "react-router-dom";
import Connexion from "./components/Connexion";
import UserForm from "./components/UserForm";
import Game from "./components/Game";
import Rankings from "./components/Rankings";
import PrivateRoute from "./helpers/PrivateRoute";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Connexion />} />
        <Route path="/create" element={<UserForm />} />

        <Route
          path="/game"
          element={
            <PrivateRoute>
              <Game />
            </PrivateRoute>
          }
        />
        <Route
          path="/rank"
          element={
            <PrivateRoute>
              <Rankings />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<p>There's nothing here : 404</p>} />
      </Routes>
    </>
  );
};

export default App;
