import { useState } from "react";
import { checkAttempt } from "../services/api.service";
import jwt from "jwt-decode";
import User from "../interfaces/user";


const Game = () => {
  const [number, setNumber] = useState("");
  const [color, setColor] = useState("red");
  const [message, setMessage] = useState("");
  const [right, setRight] = useState("43vw");
  const token = localStorage.getItem("user") || "";

  const user: User = jwt(token);
  const nickname = user.nickname.substring(0,1).toUpperCase() + user.nickname.substring(1)
  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    await checkAttempt(number, token)
      .then((res) => {
        if (res.resultText.substring(0, 1) == "B") {
          setColor("green");
          setMessage(res.resultText + ", Vous pouvez maintenant soit consulter les rankings, soit continuer de jouer directement depuis cette page.");
          setRight("10vw");
        } else {
          setColor("red");
          setMessage(res.resultText);
          setRight("43vw");
        }
        setNumber("");
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
      <h2 style={{ color: color, position:"fixed", right: right }}>{message}</h2>
    </>
  );
};

export default Game;
