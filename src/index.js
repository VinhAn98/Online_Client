import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider as AuthProvider} from './context/AuthContext';
import {Provider as CallProvider} from './context/CallContext';


ReactDOM.render(
    <AuthProvider>
        <CallProvider>
            <App />
        </CallProvider>
    </AuthProvider>

  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

