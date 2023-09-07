import User from "./user"
export default interface Team{
    uuid?:string,
    name: string,
    members: User[] | string[], 
}