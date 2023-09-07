import { useState, useEffect, ReactNode } from "react";
import User from "../interfaces/user";
import { createTeam, getUsers } from "../services/api.service";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Team from "../interfaces/team";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [members, setMembers] = useState<string[]>([]);
  const [users, setUsers] = useState<User[] | undefined>();
  const token = localStorage.getItem("user") || "";
  const [nickname, setNickname] = useState<string[]>([]);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: "18vw",
        backgroundColor: "rgb(69,69,69)",
        color: "white",
      },
    },
  };

  useEffect(() => {
    getUsers(token).then((result) => setUsers(result));
  }, []);

  const handleChange = (
    event: SelectChangeEvent<typeof nickname>,
    user: { key: string }
  ) => {
    const {
      target: { value },
    } = event;
    setNickname(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );

    if (members.indexOf(user.key.substring(2)) != -1) {
      members.splice(members.indexOf(user.key.substring(2), 1));
    } else {
      members.push("/api/users/" + user.key.substring(2));
    }
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(members);
    const team: Team = { name: name, members: members };
    await createTeam(team, token);
  };
  return (
    <>
      <h1>Dashboard Admin</h1>
      <form>
        <div>
          <label htmlFor="name">Team name : </label>
          <input
            type="text"
            name="name"
            id="teamname"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div>
          <InputLabel id="multiple-checkbox-label">Members</InputLabel>
          <Select
            labelId="multiple-checkbox-label"
            id="multiple-checkbox"
            multiple
            value={nickname}
            onChange={handleChange}
            input={<OutlinedInput label="Members" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {users?.map((user: User) => (
              <MenuItem key={user.uuid} value={user.nickname}>
                <Checkbox
                  checked={nickname.indexOf(user.nickname) > -1}
                  style={{ color: "aqua" }}
                />
                <ListItemText
                  primary={user.nickname}
                  id="multiple-checkbox-list"
                />
              </MenuItem>
            ))}
          </Select>
        </div>
        <input
          type="submit"
          value="Add Team"
          className="submit"
          onClick={handleSubmit}
        />
      </form>
    </>
  );
};

export default Dashboard;
