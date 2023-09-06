import { useState } from "react";
import { checkAttempt } from "../services/api.service";
import jwt from "jwt-decode";
import User from "../interfaces/user";


const Game = () => {
  const [number, setNumber] = useState("");
  const [color, setColor] = useState("red");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("user") || "";

  const user: User = jwt(token);
  const nickname = user.nickname.substring(0,1).toUpperCase() + user.nickname.substring(1)
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
      <h1>Welcome {nickname}</h1>
      <form>
        <div>
          <label htmlFor="number" className="gameLabel">
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
        <input className="submit" type="submit" value="GO ! " onClick={handleSubmit} />
      </form>
      <h2 style={{ color: color, position:"fixed", right: "43vw"}}>{message}</h2>
    </>
  );
};

export default Game;
