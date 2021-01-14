import React, {useContext} from "react";

import narLogo from '../../images/nar-logo.png';
//import {Nav, NavbarContainer, NavLogo, MobiIcon, NavItem, NavMenu} from "./NavbarElement";
import {Img, NavbarNave, NarbarHeader, NavbarLiA, Button} from './NavbarElement';
import {Link} from "react-router-dom";
import {Context as AuthContext} from "../../context/AuthContext";


const Navbar = () => {
    const {state, signOut} = useContext(AuthContext);

    // WRONG
    function renderItem() {
        if (state.token) {
            return (
                // when log in succeed
                <NavbarNave className="navbar navbar-expand-md navbar-light bg-light ">
                    <div className="container-fluid">

                        <NarbarHeader className="navbar-header">
                            <Link
                                style={{textDecoration: 'none', color: 'inherit'}}
                                className="navbar-branch"
                                to="/"
                            >
                                <Img

                                    src={narLogo}
                                    className="d-inline-block align-top logo"
                                    alt=""
                                />
                                <b style={{fontSize: '50px'}}>Meeting</b>room
                            </Link>
                        </NarbarHeader>


                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navnarResponsive">
                            <span className="navbar-toggler-icon"> </span>
                        </button>
                        <div className="collapse navbar-collapse" id="navnarResponsive">
                            <ul className="navbar-nav ml-auto">

                            </ul>

                            <ul className="nav navbar-nav navbar-right">
                                <li style={{textAlign: 'right'}}>
                                    <Link to="/profile">
                                        <Button
                                            type="submit"
                                            className="btn btn-outline-primary"

                                        >
                                            Profile
                                        </Button>
                                    </Link>
                                    <Button
                                        type="submit"
                                        className="btn btn-outline-danger"
                                        onClick={signOut}
                                    >
                                        Sign Out
                                    </Button>


                                </li>
                            </ul>
                        </div>
                    </div>

                </NavbarNave>
            );
        } else  {
            return (
                //when log out
                <NavbarNave className="navbar navbar-expand-md navbar-light bg-light ">
                    <div className="container-fluid">

                        <NarbarHeader className="navbar-header">
                            <Link
                                style={{textDecoration: 'none', color: 'inherit'}}
                                className="navbar-branch"
                                to="/"
                            >
                                <Img

                                    src={narLogo}
                                    className="d-inline-block align-top logo"
                                    alt=""
                                />
                                <b style={{fontSize: '50px'}}>Meeting</b>room
                            </Link>
                        </NarbarHeader>


                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navnarResponsive">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navnarResponsive">
                            <ul className="navbar-nav ml-auto">
                                <hr width="98%" size="10px" align="center"/>
                                <li className="nar-item">
                                    <NavbarLiA className="nav-link" href="/support">Hỗ trợ</NavbarLiA>
                                </li>
                                <hr width="98%" size="10px" align="center"/>
                                <li className="nar-item">
                                    <NavbarLiA className="nav-link" href="/support">Thông tin</NavbarLiA>
                                </li>
                                <hr width="98%" size="10px" align="center"/>
                            </ul>

                            <ul className="nav navbar-nav navbar-right">
                                <li style={{textAlign: 'right'}}>
                                    <Link to="/signup">
                                        <Button className="btn btn-outline-primary">Đăng ký</Button>
                                    </Link>
                                    <Link to="/login">
                                        <Button className="btn btn-outline-success">Đăng nhập</Button>
                                    </Link>

                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>

                    </div>
                </NavbarNave>
            );
        }
    }

    return (
        renderItem()

    );

};
/*const Navbar = () => {

    return (
        <Segment clearing  >
            <Header as='h3' floated='right' style={{marginTop:'15px'}}>
                <a href="/auth/google">
                    <Button  color={'red'}>
                        <Icon name='google' />
                        Sign in with Google
                    </Button>
                </a>

                <Button color={'red'}>sign up</Button>

            </Header>
            <Header as='h2' floated='left'>
                <Link to="/" >
                    <Icon color='orange' name='video camera' style={{marginTop:'15px'}}  >
                        GoogleMeet
                    </Icon>
                </Link>

            </Header>
        </Segment>

    );
};*/


export default Navbar;