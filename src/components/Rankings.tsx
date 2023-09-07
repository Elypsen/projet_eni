import { useEffect, useState } from "react";
import Game from "../interfaces/game";
import { getRanks, getUser } from "../services/api.service";
import User from "../interfaces/user";

const Rankings = () => {
  const [ranks, setRanks] = useState<Game[] | undefined>();

  useEffect(() => {
    getRanks().then((result: Game[]) => {
      result.forEach((rank) => {
        getUser(rank.user).then((res: User) => {
          rank.user = res.nickname.substring(0,1).toUpperCase() + res.nickname.substring(1);
          setRanks(result);
        });
      });
    });
  }, []);

  const handleTime = (time: number) => {
    const h = Math.floor(time / 3600);
    const m = Math.floor((time % 3600) / 60);
    const s = Math.floor((time % 3600) % 60);

    const hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    const mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    const sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
  };

  return (
    <>
      <h1 style={{ color: "aqua" }}>Classement !</h1>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Number</th>
            <th>Attempts</th>
            <th>Time</th>
            <th>In Progress</th>
          </tr>
        </thead>
        <tbody>
          {ranks?.map((rank, key) => {
            return (
              <tr key={key}>
                <td>{rank.user}</td>
                <td>{rank.numberToFind}</td>
                <td>{rank.attempts}</td>
                <td>{handleTime(rank.time)}</td>
                <td>{rank.inProgress ? "yes" : "no"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Rankings;
