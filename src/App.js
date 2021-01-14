import React from 'react';
import {Router, Route, Switch} from "react-router-dom";
import history from "./history";
//router
import Room from "./routes/Room";
import PrivateRoutes from "./routes/PrivateRoutes";
//Import Bootstrap, jquery
import 'semantic-ui-css/semantic.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "jquery/dist/jquery.min.js";
//component

import Home from "./components/Homepage/Home";
import Profile from "./components/User/Profile";
import Login from "./components/User/Login";
import SignUp from "./components/User/SignUp";
import ActivePage from "./components/User/ActivePage";
import ForgetPassword from "./components/User/ForgetPassWord";
// APP
function App() {

    return (
        <div className="App">
            <Router history={history}>

                <div>
                    <Switch>
                        <PrivateRoutes path="/" exact component={Home}/>
                        <PrivateRoutes path="/room/:roomID" component={Room}/>
                        <Route path="/login" exact component={Login}/>
                        <Route path="/signup" exact component={SignUp}/>
                        <PrivateRoutes path="/profile" exact component={Profile}/>
                        <Route path="/active/:url" exact component={ActivePage}/>
                        <Route path="/forgetPassword" exact component={ForgetPassword}/>
                    </Switch>
                </div>

            </Router>
        </div>
    );
}

export default App;
