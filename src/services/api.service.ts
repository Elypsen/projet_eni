import User from "../interfaces/user";
import Team from "../interfaces/team";
import axios, {AxiosError} from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

const wApi = axios.create({
  baseURL: "http://localhost:3000",
})

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
};


export const auth = async (email: string, password:string) => {
  try {
    const jwt = await api.post("/authentication_token", {email, password});
    return jwt.data.access_token;
  } catch (err) {
    if(err instanceof AxiosError){
        throw err.response?.data ? err.response?.data.message : null;
      }
    }
  };
  
  
  export const getUser= async(id:string) => {
    try{
      const user = await wApi.get(`${id}`,);
      return user.data;
    }catch(err){
      console.log("getUser : ", getErrorMessage(err))
      if(err instanceof AxiosError){
        throw err.response?.data ? err.response?.data.message : null;
    }
    } 
  }
  export const getUsers = async (token: string) => {
  try {
    const users = await api.get("/users", {headers:{Authorization:`Bearer ${token}`}});
    return users.data;
  } catch (err) {
    console.log("getUsers : ", getErrorMessage(err));
  }
};

export const createUser = async (user: User,confirmPw:string) => {
  try {
    await api.post("/users", {email:user.email, password:user.password, nickname: user.nickname , passwordConfirmation: confirmPw});
  } catch (err) {
    console.log("createUser : ", getErrorMessage(err));
    throw err instanceof AxiosError? err.response?.data : null;
  }
};

export const getTeams = async () => {
  try {
    const teams = await api.get("/teams");
    return teams.data;
  } catch (err) {
    console.log("getTeams : ", getErrorMessage(err));

  }
};

export const createTeam = async (team: Team, token: string) => {
  console.log(team);
  try {
    await api.post("/teams", team , { headers:{'Authorization': `Bearer ${token}`} });
  } catch (err) {
    console.log("getTeams : ", getErrorMessage(err));
    throw err instanceof AxiosError ? err.response?.data : null;
  }
};
export const checkAttempt = async (num: string,token: string) => {
  try {
    const result = await api.post("/game", {attempt:num}, {headers:{ 'Authorization' : `Bearer ${token}`}} );
    return result.data;
  } catch (err) {
    console.log("checkAttempt : ", getErrorMessage(err));
    throw err instanceof AxiosError ? err.response?.data : null;
  }
};

export const getRanks = async () => {
  try {
    const ranks = await api.get("/rank");
    return ranks.data;
    return ranks;
  } catch (err) {
    console.log("getRanks : ", getErrorMessage(err));
  }
};
