// use for sign up and sign in
import createDataContext from "./createDataContext";
import chatRoom from "../api/chatRoom";
import history from "../history";


const authReducer = (state,action) => {

    switch (action.type) {
        case 'add_error':
            return {...state, errorMessage: action.payload};
        case'remove_error_message':
            return {...state, errorMessage: ''};
        case'signIn':
            return {...state,isSignIn:true,errorMessage: '',token:action.payload};
        case 'signOut':
            return {...state,isSignIn: false,errorMessage: '',token: null};
        case 'activeAccount':
            return {...state,isSignIn:action.payload};
        case 'forgotPassword':
            return {...state,message:action.payload};
        default:
            return state
    }
};


// action for Auth context like sign up and sign in
const signIn = dispatch => async (user) => {

    try{
        const response = await chatRoom.post('/signin', user);
        const token = response.data.token;
        const userInfo = response.data.userInfo;
        dispatch({type: 'signIn', payload: response.data.token});
        localStorage.setItem('token',token);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
       // console.log(response.data);
        history.push('/');
    }catch (err) {
        dispatch({type: 'add_error', payload: 'Something went wrong with sign in '});
        console.log(err.message);
    }



};
const signUp = dispatch => async (user) => {
    //console.log(user);

    try{
        const response = await chatRoom.post('/signup', user);
        const token =  response.data.token;
        localStorage.setItem('token',token);
        //console.log(token);
        dispatch({type:'signIn'});
        history.push('/');

    }catch (err) {
        dispatch({type: 'add_error', payload: 'Something went wrong with sign up '});
        console.log(err.message);
    }

};
const signOut = dispatch =>  () => {
   // console.log('sign out');
    localStorage.removeItem('token');
    dispatch({type: 'signOut'});

    history.push('/');

};
const removeError = dispatch => () => {

    dispatch({type: 'remove_error_message'});

};
const activeAccount = dispatch => async (user) => {
    try{
        const token = localStorage.getItem('token');
        //console.log(user);
        const  response = await chatRoom.post('/activeAccount',user,{headers:{"Authorization":`Bearer ${token}`}});
        dispatch({type: 'activeAccount',payload:response.data.active});
        //console.log(response.data);
    }catch (e) {
        console.log(e);
    }
};

const forgotPassword = dispatch => async (email) => {
    try{
        const response = await chatRoom.post('/forgetPassword',email);
        dispatch({type:'forgotPassword',payload:response.data.message});
        //console.log(response.data);
    }catch (e) {
        console.log(e);
    }
};

//
export const {Provider,Context} = createDataContext(
    authReducer,
    {signIn,signUp,signOut,removeError,activeAccount,forgotPassword},
    {errorMessage: '',isSignIn:false,token:localStorage.getItem('token'),message:''}
);
