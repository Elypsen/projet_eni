export default interface User {
  id?: string;
  email: string;
  nickname: string;
  password?: string;
  role?: {
    type: string;
    default: "user";
  };
}
