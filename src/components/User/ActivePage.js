import React, {useContext,useEffect} from "react";
import Navbar from "../NavBar/NavBar";
import {Container} from "../Homepage/HomeElement";
import {Context as AuthContext} from "../../context/AuthContext";
import { Message } from 'semantic-ui-react'

const ActivePage = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const {activeAccount} = useContext(AuthContext);

    useEffect(() => {
        //console.log(userInfo);

        activeAccount(userInfo);
    },[]);
    return (
        <div>
            <Navbar/>
            <Container className="container-fluid">
                <Message.Header>Your account have been active</Message.Header>


            </Container>
        </div>
    );
};

export default ActivePage;