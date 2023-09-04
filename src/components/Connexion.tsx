import {useState} from 'react';

const Connexion = () =>  {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = (e : React.MouseEvent) => {
        e.preventDefault();
        
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
        </>
    )

}

export default Connexion;