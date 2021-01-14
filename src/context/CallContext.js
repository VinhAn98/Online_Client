// use for contain state when chat room

import createDataContext from "./createDataContext";
import chatRoom from "../api/chatRoom";
import history from "../history";


const callReducer = (state, action) => {
    switch (action.type) {
        case 'createRoom':
            return {...state, roomHave: action.payload};
        case 'joinRoom':
            return {...state};
        case 'add_error':
            return {...state, error: action.payload};
        case'remove_error_message':
            return {...state, error: ''};
        case 'fetch_user':
            return {...state, member: action.payload};
        case 'sendMessage':
            return {...state};
        case 'getMessages':
            return {...state,chatLog: action.payload};
        case 'inviteUser':
            return {...state,message: action.payload};
        default:
            return state;
    }
};
const createRoom = dispatch => async (Title) => {
    const {title} = Title;
    //console.log(title);
    try{
        let datetime = new Date();
        let time = datetime.toLocaleTimeString();
        let date = datetime.toLocaleDateString();
        const TimeStart = time  + ' ' + date;

        const token = localStorage.getItem('token');
        // send data create room server and  receive data
        const response = await chatRoom.post('/createRoom', {
            Title: title,
            TimeStart,
            TimeEnd: null

        },{headers:{"Authorization":`Bearer ${token}`}});

        const id = response.data;

        dispatch({type: 'createRoom', payload: response.data});
        history.push(`/room/${id}`);
    }catch (err) {
        dispatch({type: 'add_error', payload: 'You must Login'});
    }


};
const joinRoom = dispatch => async (idRoom) => {
    try{
        const {roomId} = idRoom;
        //let roomID = roomId.split("/");
        const roomID = {roomId:roomId.split('/').pop()};
        //console.log(idRoom);

        const token = localStorage.getItem('token');
        const response = await chatRoom.post('/joinRoom',roomID,{headers:{"Authorization":`Bearer ${token}`}});
        dispatch({type:'joinRoom'});
        if(response.data.roomHave === true){
            history.push(`/room/${roomId.split('/').pop()}`);
        }else {
            dispatch({type:'add_error',payload:response.data.error});
        }
    }catch (e) {
        //  console.log( e);

        dispatch({type: 'add_error', payload: 'You must Login'});
    }
   // console.log(response.data.roomHave);


    //history.push(`/room/${idRoom}`)

};
const outRoom = dispatch => () => {
    // outCall action
    // get info user room id send to server
    dispatch({type:'outRoom'});
};
const removeError = dispatch => () => {

    dispatch({type: 'remove_error_message'});

};
const fetchUsers = dispatch =>  async (infoUser) => {
     // get data in room from server
    const token = localStorage.getItem('token');
    //console.log(infoUser);
    const  response = await chatRoom.post('/fetchUser',infoUser,{headers:{"Authorization":`Bearer ${token}`}});
    dispatch({type:'fetch_user',payload:response.data.member});
    //console.log(response.data);
};
const getMessages = dispatch => async (info) => {


    try {
        const response =  await chatRoom.post('/getMessages',info);
        dispatch({type:'getMessages',payload:response.data});
        //console.log(response.data);
    }catch (e) {
        console.log(e);
    }
};

const sendMessage = dispatch => async (message) => {
        const response = await chatRoom.post('/messages',message);
        dispatch({type:'sendMessage',payload:response.data});
};

const inviteUser = dispatch => async (email,roomID) => {
    console.log(email);
    console.log(roomID);
    const response = await  chatRoom.post('/inviteUSer',{email,roomID});
    dispatch({type:'inviteUser',payload: response.data.message})
    //console.log(response);
};


export const {Provider, Context} = createDataContext(
    callReducer,
    {createRoom, joinRoom, outRoom,removeError,fetchUsers,getMessages,sendMessage,inviteUser},
    {roomHave: [], roomID: null,error:'',member:{},chatLog: [],message:''}
);