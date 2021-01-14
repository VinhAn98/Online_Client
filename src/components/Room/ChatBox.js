import React, {useState, useContext, useEffect} from "react";
import {Button, Table} from "semantic-ui-react";

import attachIcon from "../../images/attach-icon.png";
import {Context as CallContext} from "../../context/CallContext";
import _ from 'lodash';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faWindowMinimize, faUsers, faComment, faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import {useFormik} from "formik";
import * as Yup from "yup";

const ChatBox = ({chatBox, hideAndShowChatBox, member, infoUSer, chatLog, roomId}) => {
    const {state,sendMessage, getMessages,inviteUser} = useContext(CallContext);
    //const [members, setMembers] = useState(member.member);
    /*useEffect(() => {
        console.log(member);
    });*/
    const [message, setMessage] = useState('');
    const [copy,setCopy] = useState('');
    const handleChange = value => {
        setMessage(value);
    };

    const copyToClipboard = (content) => {
        const el = document.createElement('textarea');
        el.value = content;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    };
    useEffect(() => {

        getMessages({user: infoUSer});
    }, []);

    const formik = useFormik({
        initialValues: {
            textarea:'',

        },
        validationSchema: Yup.object().shape({
            textarea: Yup.string().min(6,'Too Short').required('Required'),

        }),

        onSubmit: async values => {
            //console.log(values);
            inviteUser(values,roomId);
            //history.push('/');
        },
    });
    return (

        <div className="chat-box-area">
            <nav className="mini-nav" style={{display: chatBox ? 'none' : 'block'}}>

                <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                    <FontAwesomeIcon
                        onClick={hideAndShowChatBox}
                        height="30px"
                        width="100%"
                        color={'black'}
                        size={'2x'}
                        style={{margin: "auto", padding: '5px'}}
                        icon={faWindowMinimize}
                    />

                    <Button
                        onClick={hideAndShowChatBox}
                        className="nav-item nav-link"
                        id="nav-home-tab"
                        data-toggle="tab"
                        data-target="#nav-home"
                        role="tab" aria-controls="nav-home" aria-selected="false"
                        style={{background: 'white', border: '1px solid'}}
                    >
                        <FontAwesomeIcon
                            onClick={hideAndShowChatBox}
                            height="30px"
                            width="100%"
                            color={'black'}
                            size={'2x'}
                            style={{margin: "auto", padding: '5px'}}
                            icon={faUsers}
                        />
                    </Button>
                    <Button
                        onClick={hideAndShowChatBox}
                        className="nav-item nav-link"
                        id="nav-profile-tab"
                        data-toggle="tab"

                        data-target="#nav-profile"
                        role="tab" aria-controls="nav-profile" aria-selected="true"
                        style={{background: 'white', border: '1px solid'}}
                    >
                        <FontAwesomeIcon
                            onClick={hideAndShowChatBox}
                            height="30px"
                            width="100%"
                            color={'black'}
                            size={'2x'}
                            style={{margin: "auto", padding: '5px'}}
                            icon={faComment}
                        />
                    </Button>
                    <Button
                        onClick={hideAndShowChatBox}
                        className="nav-item nav-link"
                        id="nav-invite-tab"
                        data-toggle="tab"

                        data-target="#nav-invite"
                        role="tab" aria-controls="nav-invite" aria-selected="true"
                        style={{background: 'white', border: '1px solid'}}
                    >
                        <FontAwesomeIcon
                            onClick={hideAndShowChatBox}
                            height="30px"
                            width="100%"
                            color={'black'}
                            size={'2x'}
                            style={{margin: "auto", padding: '5px'}}
                            icon={faPlusSquare}
                        />
                    </Button>
                </div>
            </nav>

            <div style={{display: chatBox ? 'block' : 'none'}} className="chat-box">
                <div className="row">
                    <div className="col-md-12">
                        <nav>
                            <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                <FontAwesomeIcon
                                    onClick={hideAndShowChatBox}
                                    height="30px"
                                    width="100%"
                                    color={'black'}
                                    size={'2x'}
                                    style={{margin: "auto", padding: '5px'}}
                                    icon={faWindowMinimize}
                                />
                                <Button
                                    className="nav-item nav-link"
                                    id="nav-home-tab"
                                    data-toggle="tab"
                                    color='green'
                                    data-target="#nav-home"
                                    role="tab" aria-controls="nav-home" aria-selected='true'>
                                    Mọi người
                                </Button>
                                <Button
                                    className="nav-item nav-link"
                                    id="nav-profile-tab"
                                    color='blue'
                                    data-toggle="tab"
                                    data-target="#nav-profile"
                                    role="tab"
                                    aria-controls="nav-profile"
                                    aria-selected='false'>
                                    Trò chuyện
                                </Button>
                                <Button
                                    className="nav-item nav-link"
                                    id="nav-invite-tab"
                                    color='blue'
                                    data-toggle="tab"
                                    data-target="#nav-invite"
                                    role="tab"
                                    aria-controls="nav-invite"
                                    aria-selected='false'>
                                    Invite
                                </Button>
                            </div>
                        </nav>
                        <div className="tab-content" id="nav-tabContent">
                            <div style={{minHeight: "450px"}}
                                 className="tab-pane fade show active"
                                 id="nav-home"
                                 role="tabpanel"
                                 aria-labelledby="nav-home-tab">
                                <Table singleLine>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell width={4}>Role</Table.HeaderCell>
                                            <Table.HeaderCell width={10}>Name</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {
                                            _.map(member, (member) => {
                                                return (
                                                    <Table.Row key={member._id}>
                                                        <Table.Cell> {member.role} </Table.Cell>
                                                        <Table.Cell>  {member.name}</Table.Cell>
                                                    </Table.Row>
                                                );
                                            })
                                        }


                                    </Table.Body>
                                </Table>
                            </div>
                            <div
                                className="tab-pane fade"
                                id="nav-profile"
                                role="tabpanel"
                                aria-labelledby="nav-profile-tab"
                            >

                                <div style={{height: "400px", overflowY: "auto"}} className="message-list">
                                    <div id="message-list">
                                        {_.map(chatLog, (user, index) => {
                                            /*  let content = JSON.parse(user.content);
                                              console.log(content);*/
                                            return (
                                                <div className="d-flex flex-row align-items-center" key={index}>
                                                    <div className="p-2">
                                                        {user.name} :
                                                    </div>
                                                    <div className="p-2">
                                                        {user.content}
                                                    </div>
                                                </div>


                                            );
                                        })}
                                    </div>
                                </div>

                                <div style={{marginTop: "10px"}} className="text-box-message">
                                    <input id="message-content"
                                           style={{
                                               width: "65%",
                                               marginRight: "10px",
                                               float: "left",
                                           }}
                                           type="text" className="form-control"
                                           placeholder="Nhập tin nhắn..."
                                           value={message}
                                           onChange={(e) => {
                                               handleChange(e.target.value)
                                           }}
                                    />

                                    <button style={{width: "10%", float: "left"}}
                                            className="btn btn-primary"
                                            type="button">
                                        <img height="20px" alt="icon" src={attachIcon}/>
                                    </button>

                                    <button id="send-btn" style={{width: "20%", float: "right"}}
                                            className="btn btn-primary" type="button"
                                            disabled={!message}
                                            onClick={() => {
                                                //console.log(message);
                                                setMessage('');
                                                sendMessage({message, user: infoUSer});

                                            }}
                                    >
                                        Send
                                    </button>
                                </div>
                            </div>
                            <div className="tab-pane fade"
                                 id="nav-invite"
                                 role="tabpanel"
                                 aria-labelledby="nav-invite-tab"
                            >
                                <div>
                                    {/*<input readOnly value="Text to copy"  ref={(ref) => myInput = ref} />*/}
                                    <br/>
                                    http://localhost:3000/room/{roomId}
                                </div>
                                <br/>
                                <div className="d-flex flex-row justify-content-around">
                                    <Button
                                        className="p-2"
                                        primary
                                        onClick={() => {
                                            copyToClipboard(`http://localhost:3000/room/${roomId}`);
                                            setCopy('Copied')
                                        }}> Copy meeting link</Button>
                                    <div  className="p-2">{copy}</div>
                                </div>
                                <div>
                                    <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlTextarea1">Email:</label>
                                            <textarea
                                                placeholder="email of user want to invite"
                                                className="form-control"
                                                id="textarea"
                                                onChange={formik.handleChange}
                                                value={formik.values.textarea}
                                                rows="3"> </textarea>
                                        </div>
                                        {formik.errors.textarea && formik.touched.textarea && (
                                            <p style={{color: 'red'}}>{formik.errors.textarea}</p>
                                        )}
                                       <div className="d-flex flex-row justify-content-center">
                                           <Button
                                               type="submit"
                                               onClick={() => {
                                                   //console.log('send');
                                               }}> Send</Button>
                                           <Button type="reset"> Reset</Button>
                                           <div> {state.message}</div>
                                       </div>

                                    </form>
                                    <br/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;