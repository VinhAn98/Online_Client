import React, {useState} from "react";
import {Button, Grid, Modal} from "semantic-ui-react";

const BottomNavBar = ({showBottomMenu, hideBottomMenu, Menu, renderLeave, toggleCamera, onOffCamera, onOffMicro, toggleMicro, shareScreen}) => {
    //const [open, setOpen] = useState(false);
    //cameraToggle variable for change render button
    //console.log(onOffMicro);
    return (
        <div className="bottom-menu" onMouseEnter={showBottomMenu} onMouseLeave={hideBottomMenu}>
            <div style={{display: Menu ? 'block' : 'none'}} className="menu">
                <Grid textAlign="center">
                    <Grid.Row>
                        <Grid.Column>
                            {onOffMicro === true ?
                                <Button
                                    style={{marginTop: '25px'}}
                                    primary
                                    onClick={toggleMicro}
                                >
                                    Micro Off</Button> :
                                <Button
                                    style={{marginTop: '25px'}}
                                    color={'violet'}
                                    onClick={toggleMicro}
                                >
                                    Micro On</Button>

                            }

                        </Grid.Column>
                        <Grid.Column>
                            {onOffCamera === true ?
                                <Button
                                    style={{marginTop: '25px'}}
                                    primary
                                    onClick={toggleCamera}
                                >
                                    Camera Off</Button> :
                                <Button
                                    style={{marginTop: '25px'}}
                                    color={'olive'}
                                    onClick={toggleCamera}
                                >
                                    Camera On</Button>

                            }

                        </Grid.Column>
                        <Grid.Column width={5}>

                            <Button
                                color='red'
                                style={{marginTop: '25px'}}
                                onClick={renderLeave}
                            >Leave Call</Button>

                        </Grid.Column>
                        <Grid.Column>
                            <Button
                                style={{marginTop: '25px'}}
                                primary
                                onClick={shareScreen}
                            >Capture Screen</Button>

                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>

        </div>
    );
};

export default BottomNavBar;