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
            <td>{rank.user}</td> <td>{rank.numberToFind}</td>
            <td>{rank.attempts}</td> <td>{rank.time}</td>
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
