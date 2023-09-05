import "./App.css";
import { Routes, Route } from "react-router-dom";
import Connexion from "./components/Connexion";
import UserForm from "./components/UserForm";
import Game from "./components/Game";
const App = () => {


  return (
    <>

        <Routes>
          <Route path="/" element={<Connexion />} />
          <Route path="/create" element={<UserForm />} />
          <Route path="/game" element={<Game />} />
        </Routes>

    </>
  );
};

export default App;
