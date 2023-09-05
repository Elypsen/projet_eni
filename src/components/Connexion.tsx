import {useState} from 'react';
import { auth } from '../services/api.service';
import { Link, useNavigate } from 'react-router-dom';

const Connexion = () =>  {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    
    const handleSubmit = async(e : React.MouseEvent) => {
        e.preventDefault();
        localStorage.clear();
        await auth(email, password)
        .then((res)=> {
            localStorage.setItem('user', res)
            navigate('/game');

        })
        .catch(err=>{setError(err)});
  
    }

    return(
        <>
            <form>
                <div>
                    <label htmlFor="email"> Email : </label>
                    <input type="email" name="email" id="email" defaultValue={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                <div>
                    <label htmlFor="password"> Password : </label>
                    <input type="password" name="password" id="password" defaultValue={password} onChange={(e) => {setPassword(e.target.value)}} />
                </div>
                <input type="submit" value="Connexion" onClick={handleSubmit} />
            </form>
            {<p style={{color:"red"}}>{error}</p>}
            <br/>
            <Link to='/create'>No Account Yet?</Link>
        </>
    )

}

export default Connexion;