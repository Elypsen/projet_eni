import jwtDecode from "jwt-decode"
import {Navigate } from "react-router-dom"
import User from "../interfaces/user"


const AdminRoute = ({children}:{children:JSX.Element}) => {
    const token = localStorage.getItem("user")
    if(token === null){
        return <Navigate to="/" replace />
        
    }else {
        const user: User = jwtDecode(token);
        if(user.role == "admin"){
            return children
        }else{
            return <Navigate to="/" replace /> 
        }
    
    }   
}

export default AdminRoute;

