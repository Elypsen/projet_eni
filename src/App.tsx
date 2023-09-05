import "./App.css";
import {
  Routes,
  Route
} from "react-router-dom";
import Connexion from "./components/Connexion";
import UserForm from "./components/UserForm";


const App = () => {
  return( 
  <>
<Routes>
  <Route path="/" element={<Connexion />}/>
  <Route path="/create" element={<UserForm />} />
</Routes>

  </>
  );
};

export default App;
