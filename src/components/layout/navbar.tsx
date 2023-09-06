import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
    const token = localStorage.getItem('user')
    const navigate = useNavigate();
    const location = useLocation();
    const handleHome = () => {
        if(token === null){
            navigate('/');        
        }else{
            localStorage.clear();
            navigate('/')
        }
    }

    return(
        <div id="navbar">
            <h2 style={{position:'fixed', left:"1vw", color:"white", fontSize:"2.5em"}}> Express Brain </h2>
            {
                token === null ? 
                null
                :<Link to="/game" className="navbar" style={{position:'fixed', left:'22vw'}}>Game</Link> 
            }
            {
                token === null ? 
                null
                :<Link to='/rank' className="navbar" style={{position:'fixed', left:'30vw'}}>Rankings</Link>
            }
            {
                location.pathname == "/" ?
                <Link to='/create' className='navbar' style={{position:"fixed", right:'20vw'}}>Sign up</Link> 
                : null
            } 
            <Link to="/" className="navbar" style={{position:"fixed", right:'5vw'}} onClick={handleHome}>{token === null? "Connexion":"Deconnexion"}</Link>
        </div>
    )
}

export default Navbar;