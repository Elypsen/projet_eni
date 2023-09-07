import { Link, useLocation, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import User from "../../interfaces/user";


const Navbar = () => {
    const token = localStorage.getItem('user') || "";
    const navigate = useNavigate();
    const location = useLocation();
    const user: User | null = token != ""? jwtDecode(token) : null;
    const role = (user ? user.role : "");
    


    const handleHome = () => {
        if(token === ""){
            navigate('/');        
        }else{
            localStorage.clear();
            navigate('/')
        }
    }

    return(
        <div id="navbar">
            <h2 style={{position:'fixed', left:"1vw", color:"white", fontSize:"2.5em"}}> Express Brain </h2>
            <Link to='/rank' className="navbar" style={{position:'fixed', left:'30vw'}}>Rankings</Link>
            <Link to='/teams' className="navbar" style={{position:'fixed',left:'40vw'}}>Teams</Link>
            <Link to="/" className="navbar" style={{position:"fixed", right:'5vw'}} onClick={handleHome}>{token === ""? "Connexion":"Deconnexion"}</Link>
            
            {
                token === "" ? 
                null
                :<Link to="/game" className="navbar" style={{position:'fixed', left:'22vw'}}>Game</Link> 
            }

            {
                role === 'admin' ? 
                <Link to='/dashboard' className="navbar" style= {{position:'fixed', right: '25vw'}}>Dashboard</Link> : null
            }
            {
                location.pathname == "/" ?
                <Link to='/create' className='navbar' style={{position:"fixed", right:'20vw'}}>Sign up</Link> 
                : null
            } 
        </div>
    )
}

export default Navbar;