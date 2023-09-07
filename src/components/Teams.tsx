import { useState, useEffect } from "react";
import Team from "../interfaces/team";
import { getTeams } from "../services/api.service";
import User from "../interfaces/user";

const Teams = () => {
  const [teams, setTeams] = useState<Team[] | undefined>();

  useEffect(() => {
    getTeams()
      .then((res: Team[]) => {
        setTeams(res);
        console.log(teams, res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  
  return (
    <>
      <h1> TEAM LIST </h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Team name</th>
            <th>Team Members</th>
          </tr>
        </thead>
        <tbody>
          {
            teams?.map((team:Team, key) => {
                return <tr key={key}>
                    <td>{team.uuid}</td>
                    <td>{team.name}</td>
                    <td>{team.members.map((member) => {
                        member = member as User;
                        return member.nickname + " "
                    })}</td>
                </tr>
            })
          }
        </tbody>
      </table>
    </>
  );
};

export default Teams;
