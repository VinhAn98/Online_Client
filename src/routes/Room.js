import React, {useEffect, useRef, useState, useCallback} from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import _ from 'lodash';
import "../components/Room/chat-room-style.css";


import {Container, Grid, Header} from "semantic-ui-react";
import Device from "../components/Room/Device";
import BottomNavBar from "../components/NavBar/BottomNavBar";
import ChatBox from "../components/Room/ChatBox";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import ShowModal from "../components/Room/Modal";
import CustomPopup from "../components/Room/CustomPopup";
//import {Context as CallContext} from "../context/CallContext";
import {ToastContainer, toast} from 'react-toastify';
import {useHistory} from "react-router-dom";
import Video from "../components/Room/Video";

const StyledVideo = styled.video`
    height: 500px;
    width: 100%;
`;
const PartnerVideo = styled.video`
    height:250px;
    width:100%
`;

const Videos = ({peer}) => {
    const ref = useRef();

    useEffect(() => {

        peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, [peer]);

    return (
        <PartnerVideo playsInline autoPlay muted ref={ref}/>
    );
};


/*
const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};
*/

const Room = (props) => {
    //const {fetchUsers, state} = useContext(CallContext);
    // state of components
    const [peers, setPeers] = useState([]);
    const [chatBox, setChatBox] = useState(false);
    const [Menu, setMenu] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [finishStatus, setFinishStatus] = useState(false);
    const [member, setMember] = useState([]);
    const [mic, setMic] = useState('');
    const [camera, setCamera] = useState('');
    const [showAccessModal, setShowAccessModal] = useState(false);
    const [dataUser, setDataUser] = useState({});
    const [answer, setAnswer] = useState(false);
    const [options, setOption] = useState({
        video: camera === "" ? true : {
            deviceId: camera,
        },
        audio: {
            deviceId: mic
        }
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [isLeave, setIsLeave] = useState(false);
    const [chatLog, setChatLog] = useState([]);
    const [inAcceptList, setInAcceptList] = useState(false);
    const [inRoom, setInRoom] = useState(false);
    const [cameraToggle, setCameraToggle] = useState(true);
    const [micToggle, setMicToggle] = useState(true);
    const [capture, setCapture] = useState(false);


    // ref for web-rtc to connect
    const history = useHistory();
    const socketRef = useRef();
    const captureRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const peersCaptureRef = useRef([]);

    //variable

    const roomID = props.match.params.roomID;
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const InfoUser = {roomId: roomID, userInfo};

    // effect to get mic and camera value
    useEffect(() => {

        setOption({...options,video:camera === "" ? true : {
                deviceId: camera,
            },
            audio:{
                deviceId: mic
            }
        });

    }, [camera, mic]);

    // effect to show and hide user
    useEffect(() => {


        async function getUser() {
            let host = window.location.hostname;

            socketRef.current = io.connect(`http://${host}:5000`);
            const stream = await navigator.mediaDevices.getUserMedia(options);
            userVideo.current.srcObject = stream;
            socketRef.current.on('id', socketId => {
                const {data} = socketId;

                console.log(data);
            });


            socketRef.current.on('user-want-to-join', async data => {
                console.log(data);
                setShowAccessModal(true);
                await localStorage.setItem(`${data.socket}`, JSON.stringify(data.userInfo));

                setDataUser(data);

            });
            socketRef.current.on('user-want-to-join-directly', async data => {
                console.log(data);
                await localStorage.setItem(`${data.socket}`, JSON.stringify(data.userInfo));
                //localStorage.setItem('inRoom','InRoom');
                socketRef.current.emit('accept-join', {InfoUser, socket: data.socket});
            });


            socketRef.current.on('user-in-room', users => {
                const peers = [];
                users.forEach(user => {
                    const peer = createPeer(user, socketRef.current.id, stream);

                    console.log(socketRef.current.id);
                    peersRef.current.push({
                        peerID: user,
                        peer
                    });
                    peers.push({
                        peerID: user,
                        peer
                    });

                    //
                });
                setPeers(peers);
                setInRoom(true);  // for student
                //localStorage.setItem('inRoom','InRoom');
                if (userInfo.role === 'student') {
                    console.log('add user');
                    socketRef.current.emit('join-room', InfoUser);
                }
                renderPopup('user join');


            });
            await socketRef.current.on('user-join', data => {
                const peer = addPeer(data.data, data.IdUserJoinRoom, stream);

                peersRef.current.push({
                    peerID: data.IdUserJoinRoom,
                    peer,
                });
                const peerObj = ({
                    peerID: data.IdUserJoinRoom,
                    peer
                });

                setPeers(users => [...users, peerObj]);

                console.log(peersRef.current);
                //console.log(peersRef.current[0].peer._remoteStreams);
                renderPopup('user join');

                // console.log(data);
            });
            socketRef.current.on('Receive-return-signal', payload => {
                //console.log(payload);
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.dataReceive);
            });
            await socketRef.current.on('peer-leave', data => {
                const peerObj = peersRef.current.find(p => p.peerID === data.data);

                if (peerObj) {
                    peerObj.peer.destroy();
                }
                //
                const peer = peersRef.current.filter(p => p.peerID !== data.data);
                peersRef.current = peer;
                setPeers(peer);


            });

            socketRef.current.on('member', newMember => {

                setMember(newMember.member);

            });

            socketRef.current.on('messages', ChatLog => {
                console.log(ChatLog);
                setChatLog(ChatLog);
            });
            //socketRef.current.emit('accept-join',{InfoUser,answer:answer});

            socketRef.current.on('deny-to-join-room', message => {
                console.log(message.message);
                setErrorMessage(message.message)
            });
            // send to server

            socketRef.current.emit('user-in-accept-list', InfoUser);
            socketRef.current.on('user-in-accept-list-response', acceptData => {
                //setInAcceptList(accept.acept)
                const {accept} = acceptData;
                setInAcceptList(accept);
                //console.log(accept);
            });
            socketRef.current.on('show-pop-up', data => {
                // console.log(data);
                setDataUser(data)
            });
            socketRef.current.on('remove-member-success', data => {
                //console.log(data);
                localStorage.removeItem('inRoom');
                renderPopup('user leave');
                socketRef.current.disconnect();

            });


            socketRef.current.on('user-member-leave', async data => {

                const dataUserLeave = await JSON.parse(localStorage.getItem(`${data.socket}`));
                //console.log(dataUserLeave);
                if (dataUserLeave !== null) {
                    await socketRef.current.emit('remove-when-refresh', {roomID, dataUserLeave});
                    localStorage.removeItem(`${data.socket}`);
                    renderPopup('user leave');
                }


            });

            socketRef.current.on('user-capture-screen-response', async data => {
                let host = window.location.hostname;
                captureRef.current = io.connect(`http://${host}:5000`);


                console.log(captureRef.current);
                setCapture(true);
                //const screen =  await startCapture({cursor: true});


            });
            socketRef.current.on('user-join-when-capture', async data => {
                console.log(data);


                const peer = addPeerCapture(data.data, data.IdUserJoinRoom, data.InfoUserCapture);
                peersCaptureRef.current.push({
                    peerID: data.IdUserJoinRoom,
                    peer,
                });
                const peerObj = ({
                    peerID: data.IdUserJoinRoom,
                    peer
                });

                setPeers(users => [...users, peerObj]);

            });
            socketRef.current.on('user-capture-have-end', data => {
                peersCaptureRef.current = [];
            });


        }

        getUser();


    }, []);

    //effect to handle back button
    useEffect(() => {
        //console.log(roomID);
        /*  window.addEventListener('beforeunload', (event) => {
              event.preventDefault();
              //AcceptLeave(InfoUser);
              // Older browsers supported custom message
              event.returnValue = '';
              setIsLeave(true);
              //socketRef.current.emit('disconnect',InfoUser);
              // alert('do you want to leave');

          });*/

        const captureScreen = async () => {
            if (capture === true) {
                // console.log('capture');
                const stream = await startCapture({cursor: true});
                // console.log(screen);
                stream.getVideoTracks()[0].addEventListener('ended', () => {
                    captureRef.current.emit('capture-end', {capture: false});
                    setCapture(false);
                    const peerObj = peersCaptureRef.current.find(p => p.peerID === socketRef.current.id);
                    if (peerObj) {
                        peerObj.peer.destroy();
                    }
                    //const peer = peersCaptureRef.current.filter(p => p.peerID !== socketRef.current.id);
                    peersCaptureRef.current = [];

                    console.log('share screen end');
                    if (captureRef.current) {
                        captureRef.current.disconnect();
                    }
                });

                captureRef.current.emit('capture-ref-emit', userInfo);

                captureRef.current.on('capture-ref-emit-user-in-room', users => {
                    const peers = [];

                    users.forEach(user => {


                        const peer = createPeerCapture(user, captureRef.current.id, stream);

                        peersCaptureRef.current.push({
                            peerID: user,
                            peer
                        });
                        peers.push({
                            peerID: user,
                            peer
                        });
                        //
                    });
                    setPeers(peers);
                });

                await captureRef.current.on('Receive-return-signal-when-capture', payload => {
                    console.log(payload);
                    //console.log(peersRef.current);
                    const item = peersCaptureRef.current.find(p => p.peerID === payload.id);

                    item.peer.signal(payload.dataReceive);

                });
                //console.log(screen);


            }

        };
        captureScreen();

        window.history.pushState(null, null, window.location.pathname);
        window.addEventListener('popstate', onBackButtonEvent);
        return () => {
            window.removeEventListener('popstate', onBackButtonEvent);

        };

    }, [capture]);


    // function render modal
    const renderModal = (data) => {
        // console.log(data);
        //setShowAccessModal(true);
        const handleAnswer = (value) => {
            // console.log(value);
            setAnswer(value);
            setShowAccessModal(false);
            if (value === true) {

                socketRef.current.emit('accept-join', {InfoUser, answer: value, socket: data.socket});
                setErrorMessage('');

            } else {
                socketRef.current.emit('deny-join', {InfoUser, answer: value, dataUser: data});
            }

        };
        return (
            <ShowModal data={data} openModal={showAccessModal} answer={handleAnswer}/>
        );
    };
    // function to show custom popup
    const renderPopup = (data) => {
        toast(`${data}`, {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };


    // function render when user want to leave room //
    const renderLeave = () => {
        console.log('leave page');
        // run accept leave
        // leave immediately  not render
        AcceptLeave(InfoUser);
        setIsPopupOpen(true);
        setIsLeave(true);
        //socketRef.current.disconnect();


        /*return(

        );*/
    };
    //function when user accept to leave room
    const AcceptLeave = (dataUser) => {
        // get data user
        // remove member from database
        //console.log(dataUser);
        //socketRef.current.emit('disconnect',dataUser);
        socketRef.current.emit('remove-member-when-leave', dataUser);
        // tell socket user disconnect
        // popup to member in room user leaver


    };


    //function to render Join button for student
    const renderJoinButtonForStudent = () => {
        return (
            <div>
                {inAcceptList === true ?
                    <Button color='green' onClick={() => joinDirectly(InfoUser)}> Join Now</Button>
                    :
                    <Button color='green' onClick={() => AskToJoin(InfoUser)}> Ask to Join</Button>
                }
            </div>
        );
    };

    //function to render join button for teacher
    const renderJoinButtonForTeacher = () => {
        return (
            <div>
                <Button color={'green'} onClick={() => {
                    socketRef.current.emit('create-roomID', InfoUser);
                    socketRef.current.emit('join-room', InfoUser);
                    setInRoom(true); // for teacher
                    //localStorage.setItem(`inRoom`,'InRoom');
                    //console.log('click')
                }}> Join Now </Button>
            </div>
        );
    };
    //function to join directly
    const joinDirectly = (infoUser) => {
        const JoinData = {...InfoUser, request: 'Join-room-directly'};
        socketRef.current.emit('create-roomID', JoinData);
    };

    //function to render if user have join to room

    const renderInRoom = () => {
        const inRoomContent = () => {
            return (
                <div>
                    <br/>
                    <ChatBox
                        chatBox={chatBox}
                        hideAndShowChatBox={hideAndShowChatBox}
                        member={member}
                        infoUSer={InfoUser}
                        chatLog={chatLog}
                        roomId={roomID}
                    />
                    <Device
                        chatBox={chatBox}
                        onSelectMic={handleMic}
                        onSelectCamera={handleCamera}
                    />
                </div>
            );
        };
        return (
            <div>
                {inRoom === true ?
                    inRoomContent() :
                    <div className="member-area d-flex flex-column justify-content-center align-items-center">
                        <br/>
                        <div className="p-2">{_.map(member, member => {
                            return (
                                member.name
                            );
                        })} in room
                        </div>
                        <br/>
                        <div className="p-2">

                            <div>
                                <div> {errorMessage}</div>
                                <br/>
                                <br/>
                                {InfoUser.userInfo.role === 'teacher' ?
                                    renderJoinButtonForTeacher() :
                                    renderJoinButtonForStudent()
                                }
                                {/* <Button color='green' onClick={() => AskToJoin(InfoUser)}> Ask to Join</Button>*/}
                            </div>


                        </div>
                    </div>
                }
            </div>
        );
    };

    //function to set off/on camera
    const toggleCamera = () => {
        if (cameraToggle) {
            setCameraToggle(false);
            //userVideo.current.srcObject.getTracks()[0].enabled = false;
            userVideo.current.srcObject.getVideoTracks()[0].enabled = false;

        } else {
            setCameraToggle(true);
            //userVideo.current.srcObject.getTracks()[0].enabled = true;
            userVideo.current.srcObject.getVideoTracks()[0].enabled = true;
        }

    };
    const toggleMicro = () => {
        if (micToggle) {
            setMicToggle(false);
            //userVideo.current.srcObject.getTracks()[0].enabled = false;
            userVideo.current.srcObject.getAudioTracks()[0].enabled = false;

        } else {
            setMicToggle(true);
            //userVideo.current.srcObject.getTracks()[0].enabled = true;
            userVideo.current.srcObject.getAudioTracks()[0].enabled = true;
        }

    };

    // function to handle back button
    const onBackButtonEvent = (e) => {
        e.preventDefault();
        if (!finishStatus) {
            if (window.confirm("Back to homepage ?")) {
                setFinishStatus(true);
                // your logic
                // leave room action from call context
                socketRef.current.disconnect();
                Redirect();

            } else {
                window.history.pushState(null, null, window.location.pathname);
                setFinishStatus(false)
            }
        }
    };

    // funtion to get value of mic and camera
    const handleMic = (value) => {
        console.log(value);
        setMic(value);


    };
    const handleCamera = (value) => {
        console.log(value);
        setCamera(value);


    };

    // function in close and open popup
    /* const handleOpen = () => {
         setIsPopupOpen(true);
         timeOut = setTimeout(() => {
             setIsPopupOpen(false);
         }, timeoutLength);
     };
     const handleClose = () => {
         setIsPopupOpen(false);
         clearTimeout(timeOut);
     };*/

    // function to create and add peer connection to user join to room
    function createPeer(IdUserInRoom, IdUserJoinRoom, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            config: {iceServers: [{urls: 'stun:stun.l.google.com:19302'}, {urls: 'stun:global.stun.twilio.com:3478?transport=udp'}]},
            stream
        });
        peer.on('signal', data => {
            socketRef.current.emit('call-to-user-in-room', {IdUserInRoom, IdUserJoinRoom, data})
        });
        return peer;

    }

    function addPeer(SignalToConnect, IdUserJoinRoom, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            config: {iceServers: [{urls: 'stun:stun.l.google.com:19302'}, {urls: 'stun:global.stun.twilio.com:3478?transport=udp'}]},
            stream
        });
        peer.on('signal', data => {
            socketRef.current.emit('Return-signal-to-join', {data, IdUserJoinRoom})
        });

        peer.signal(SignalToConnect);

        return peer;

    }

    //function create and add peer connection when user capture screen

    function createPeerCapture(IdUserInRoom, IdUserJoinRoom, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            config: {iceServers: [{urls: 'stun:stun.l.google.com:19302'}, {urls: 'stun:global.stun.twilio.com:3478?transport=udp'}]},
            stream
        });
        peer.on('signal', data => {
            captureRef.current.emit('call-to-user-in-room-when-capture', {IdUserInRoom, IdUserJoinRoom, data, userInfo})
        });
        return peer;
    }

    function addPeerCapture(SignalToConnect, IdUserJoinRoom, InfoUserCapture) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            config: {iceServers: [{urls: 'stun:stun.l.google.com:19302'}, {urls: 'stun:global.stun.twilio.com:3478?transport=udp'}]},

        });
        peer.on('signal', data => {
            if (userInfo._id === InfoUserCapture._id) {
                //console.log('one person');
                socketRef.current.emit('Return-signal-to-join-when-capture', {data, IdUserJoinRoom});
            } else {
                //console.log('the other');
                socketRef.current.emit('Return-signal-to-join-when-capture', {data, IdUserJoinRoom});
            }
            //captureRef.current.emit('Return-signal-to-join-when-capture', {data, IdUserJoinRoom})
        });

        peer.signal(SignalToConnect);

        return peer;

    }

    //function to show and hide css
    const hideAndShowChatBox = useCallback(
        () => {
            if (chatBox) {
                setChatBox(false)
            } else setChatBox(true);

        },
        [chatBox, setChatBox],
    );

    // function to show and hide bottom navBar
    const showBottomMenu = () => {
        setMenu(true);
    };
    const hideBottomMenu = () => {
        setMenu(false);
    };

    const shareScreen = async () => {

        //userVideo.current.srcObject = screen;
        socketRef.current.emit('user-capture-screen', {socket: socketRef.current.id});


    };

    async function startCapture(displayMediaOptions) {
        let captureStream = null;
        try {
            captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
        } catch (err) {
            console.error("Error: " + err);
        }
        return captureStream;
        /* const stream = await navigator.mediaDevices.getDisplayMedia({cursor: true});
         const screenTrack = stream;*/
        // console.log(screenTrack);
        // console.log(userVideo.current.srcObject);
        // const holdStream =  _.find(userStream.current.getTracks(),['kind', 'video']);
        //userVideo.current.srcObject =screenTrack;
    }

    //function to render button to asher roomoner to join room
    const AskToJoin = (InfoUser) => {
        console.log('AskToJoin');
        const JoinData = {...InfoUser, request: 'Join-room'};
        socketRef.current.emit('create-roomID', JoinData);
        //socketRef.current.emit('')
    };

    const Redirect = () => {
        history.push("/");
    };

    const renderWhenCapture = () => {

        let peer = peersCaptureRef.current;

        peersRef.current.forEach(peerID => {
            let peer_remain = peersCaptureRef.current.filter(peerRef => (peerRef.peerID !== peerID.peerID && peerRef.peerID !== socketRef.current.id));
            //let peer_remain = getLastElement();
            // console.log(peer_remain);
            peer = peer_remain;
        });


        return (
            _.map(peer, (peer) => {
                return (
                    <Grid.Column width={4} key={peer.peerID}>
                        <div className="member-video ">
                            <Videos
                                key={peer.peerID}
                                peer={peer.peer}
                                className="member-video-tag "
                            />
                            <div className="member-video-name ">
                                name
                            </div>
                        </div>

                    </Grid.Column>
                );
            })

        );
    };

    const renderPartnerVideo = () => {


        //console.log(peer);
        return (
            _.map(peersRef.current, (peer) => {
                return (
                    <Grid.Column width={4} key={peer.peerID}>
                        <div className="member-video ">
                            <Videos
                                key={peer.peerID}
                                peer={peer.peer}
                                className="member-video-tag "
                            />
                            <div className="member-video-name ">
                                name
                            </div>
                        </div>

                    </Grid.Column>
                );
            })
        );
    };
    return (
        <Container fluid>
            {isLeave === false ?
                <div>
                    <div className="room-page">

                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={12}>
                                    <br/>
                                    <div className=" user-video">
                                        <Video userVideo={userVideo}/>


                                        <div style={{
                                            position: 'absolute',
                                            top: '500px',
                                            left: '50px',
                                            zIndex: 1
                                        }}> {userInfo.name}</div>
                                    </div>
                                    {/* { console.log(peersRef.current[0]._remoteStreams)}*/}
                                </Grid.Column>

                                <Grid.Column width={4}>
                                    {renderInRoom()}

                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns='equal'>
                                {renderPartnerVideo()}
                                { renderWhenCapture()}

                            </Grid.Row>

                        </Grid>


                        {/* bottot menu  */}
                        {inRoom === true ?
                            <BottomNavBar
                                showBottomMenu={showBottomMenu}
                                hideBottomMenu={hideBottomMenu}
                                Menu={Menu}
                                renderLeave={renderLeave}
                                toggleCamera={toggleCamera}
                                toggleMicro={toggleMicro}
                                onOffCamera={cameraToggle}
                                onOffMicro={micToggle}
                                shareScreen={shareScreen}
                            /> :
                            <Button onClick={() => {
                                console.log('home screen');
                                Redirect();
                            }}> Return to Home Screen </Button>
                        }
                    </div>
                    <div>
                        {renderModal(dataUser)}

                    </div>
                    <div>
                        <ToastContainer
                            position="bottom-left"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                        {/* Same as */}
                        <ToastContainer/>
                    </div>
                </div>

                :
                <div className="d-flex flex-column align-items-center" style={{marginTop: '50px'}}>
                    <div className="p-2">
                        <Header size='huge'>Are you want to leave</Header>
                    </div>
                    <br/>
                    <div className="p-2">
                        <Button primary onClick={() => {
                            // reconnect to room

                            setIsLeave(false);
                            window.location.reload(false);
                        }}>Rejoin</Button>
                        <Button color={'green'} onClick={() => {
                            // Accept leave room
                            //AcceptLeave(dataUser)
                            //redirect to home screen
                            Redirect();
                        }}> Return to home screen</Button>
                    </div>
                </div>
            }

        </Container>

    );
};

export default Room;
