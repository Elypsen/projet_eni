import {useState} from 'react';
import User from '../interfaces/user';
const UserForm = () => {
    const [email,setEmail] = useState<string>("");
    const [nickname, setNickname] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")



    const handleSubmit = async(e:React.MouseEvent) => {
        e.preventDefault();
        const user:User = {email:email, nickname:nickname,password:password};
        (console.log(user));
    }

    return(
        <>
        <form >
            <div>
                <label htmlFor="email"> Email : </label>
                <input type="email" name="email" id="email" defaultValue={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div>
                <label htmlFor="nickname">Nickname : </label>
                <input type="text" name="nickname" id="nickname" defaultValue={nickname} onChange={(e)=>{setNickname(e.target.value)}}/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" defaultValue={password} onChange={(e) =>{setPassword(e.target.value)}}/>
            </div>
            <div>
                <label htmlFor="passwordConfirmation">Password Confirmation</label>
                <input type="password" name="passwordConfirmation" id="pwConfirm" defaultValue={passwordConfirmation} onChange={(e)=>{setPasswordConfirmation(e.target.value)}}/>
            </div>
            <input type="submit" value="Go !" onClick={handleSubmit}/>
        </form>
        </>
    )
}

export default UserForm;