import { useState } from "react";
import { checkAttempt } from "../services/api.service";
import jwt from "jwt-decode";
import User from "../interfaces/user";
import { Link } from "react-router-dom";

const Game = () => {
  const [number, setNumber] = useState("");
  const [color, setColor] = useState("red");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("user") || "";

  const user: User = jwt(token);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    await checkAttempt(number, token)
      .then((res) => {
        if (res.resultText.substring(0, 1) == "B") {
          setColor("green");
        } else {
          setColor("red");
        }
        setNumber("");
        setMessage(res.resultText);
      })
      .catch((err) => console.log(err.resultText));
  };

  return (
    <>
      <h1 style={{ color: "aqua" }}>BONJOUR {user.nickname}</h1>
      <form>
        <div>
          <label htmlFor="number">
            Enter a number to find the hidden one :{" "}
          </label>
          <input
            type="number"
            name="number"
            id="number"
            value={number}
            onChange={(e) => {
              setNumber(e.target.value);
            }}
          />
        </div>
        <input type="submit" value="GO ! " onClick={handleSubmit} />
      </form>
      <Link to="/rank">See Rankings</Link>
      <h2 style={{ color: color }}>{message}</h2>
    </>
  );
};

export default Game;
