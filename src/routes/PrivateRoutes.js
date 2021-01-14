import React from "react";
import { Redirect, Route } from 'react-router-dom';


const PrivateRoutes = ({ component: Component, ...rest }) => {

    const IsSignIn = localStorage.getItem('token');
    return(
       <Route
           {...rest}
           render={props =>
                IsSignIn ?
                    ( <Component {...props}/> ) :
                    ( <Redirect to={{pathname:'/login'}}/> )

           }


       />

    );
};
export default PrivateRoutes;