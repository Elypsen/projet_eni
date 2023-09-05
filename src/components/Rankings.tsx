import { useEffect, useState } from "react";
import Game from "../interfaces/game";
import { getRanks } from "../services/api.service";

const Rankings = () => {
  const [ranks, setRanks] = useState<Game[] | undefined>();

  useEffect(() => {
    getRanks().then((result: Game[]) => {
      setRanks(result);
    });
  });
  return (
    <>
      <h1 style={{ color: "aqua" }}>Classement !</h1>

      {ranks?.map((rank, key) => {
        return (
          <p key={key}>
            <span>{rank.user}</span> <span>{rank.numberToFind}</span>{" "}
            <span>{rank.attempts}</span> <span>{rank.time}</span>{" "}
            <span>{rank.inProgress ? "oui" : "non"}</span>
          </p>
        );
      })}
    </>
  );
};

export default Rankings;
