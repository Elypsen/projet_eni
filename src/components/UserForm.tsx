import {useState} from 'react';
import User from '../interfaces/user';
import { createUser } from '../services/api.service';
import { Link, useNavigate } from 'react-router-dom';
const UserForm = () => {
    const [email,setEmail] = useState<string>("");
    const [nickname, setNickname] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")
    const [error, setError] = useState<{email?:string, passwordConfirmation?:string, nickname?:string}>({email:"",passwordConfirmation:"", nickname:""})
    const navigate = useNavigate()

    const handleSubmit = async(e:React.MouseEvent) => {
        e.preventDefault();
        const user:User = {email:email, nickname:nickname,password:password};
        (console.log(user));
        password == passwordConfirmation ? 
        await createUser(user,passwordConfirmation)
        .then(() => navigate('/'))
        .catch((err) => {setError(err)})
        : setError({passwordConfirmation:'passwords does not match'}) ;
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
        {<p style={{color: 'red'}}>{error.email} </p>}
        {<p style={{color: 'red'}}>{error.nickname} </p>}
        {<p style={{color: 'red'}}>{error.passwordConfirmation} </p>}

        <Link to='/'>Return to connexion</Link>
        </>
    )
}

export default UserForm;