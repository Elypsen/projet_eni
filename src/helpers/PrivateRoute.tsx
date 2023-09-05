import {Navigate } from "react-router-dom"


const PrivateRoute = ({children}:{children:JSX.Element}) => {
    const token = localStorage.getItem("user")
    if(token === null){
      return <Navigate to="/" replace />
  
    }else {
        return children

    }   
}

export default PrivateRoute;


