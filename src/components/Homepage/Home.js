import React, {useContext,useEffect} from "react";


import {Image} from 'semantic-ui-react';

import meetingPicture from "../../images/meet.PNG";
import createIcon from "../../images/new-call.png";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faVideo, faWindowMinimize} from "@fortawesome/free-solid-svg-icons";
import {Container, Button} from './HomeElement';
import {useFormik} from 'formik';
import {Context as CallContext} from "../../context/CallContext";

import Navbar from "../NavBar/NavBar";
import * as Yup from "yup";


const Home = (props) => {

    const {createRoom, joinRoom,state,removeError} = useContext(CallContext);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const formikJoin = useFormik({
        initialValues: {
            roomId: '',

        },
        validationSchema: Yup.object().shape({
            roomId: Yup.string().required('enter Room Id'),

        }),

        onSubmit: async values => {
            //console.log(values);
            joinRoom(values);
            //history.push('/');
        },
    });
    const formikCreate = useFormik({
        initialValues: {
            title:''

        },
        validationSchema: Yup.object().shape({
            title: Yup.string().required('enter Room Title'),

        }),

        onSubmit: async values => {
            // console.log(values);
            createRoom(values);

        },
    });

    useEffect(() => {
        removeError();
    },[]);
    const renderForm = () => {
        return (
            <div>
                {userInfo.role === 'teacher' ?
                    <form onSubmit={formikCreate.handleSubmit}>
                        <div className="input-room d-flex flex-row">
                            <input
                                style={{width: '80%', 'marginTop': '15px'}}
                                className="form-control p-2"
                                placeholder="Tiêu đề cuộc họp"
                                id="title"
                                onChange={formikCreate.handleChange}
                                value={formikCreate.values.title}

                            />

                            <Button
                                type="submit" className="btn btn-info d-flex flex-row  justify-content-start align-items-center"
                                style={{width:'20%'}}
                            >
                                <FontAwesomeIcon

                                    height="30px"
                                    width="100%"
                                    color={'red'}
                                    size={'2x'}
                                    style={{margin: "auto"}}
                                    icon={faVideo}
                                />
                                <div style={{marginLeft:'5px'}}>
                                    Tạo cuộc họp mới
                                </div>
                            </Button>
                        </div>
                        <div className="error-display-home" style={{fontSize: '20px', color: 'red'}}>
                            {state.error}
                            {formikCreate.errors.title && formikCreate.touched.title && (
                                <p style={{color: 'red'}}>{formikCreate.errors.title}</p>
                            )}
                        </div>
                    </form> :
                    <form onSubmit={formikJoin.handleSubmit}>
                        <div className="input-room d-flex flex-row">
                            <input
                                style={{width: '80%', 'marginTop': '15px'}}
                                className="form-control p-2"
                                placeholder="Nhập mã để tham dự"
                                id="roomId"
                                onChange={formikJoin.handleChange}
                                value={formikJoin.values.roomId}

                            />

                            <Button type="submit" className="btn btn-primary p-2">
                                Tham gia
                            </Button>
                        </div>
                        <div className="error-display-home" style={{fontSize: '20px', color: 'red'}}>
                            {state.error}
                            {formikJoin.errors.roomId && formikJoin.touched.roomId && (
                                <p style={{color: 'red'}}>{formikJoin.errors.roomId}</p>
                            )}
                        </div>
                    </form>


                }

            </div>
        );
    };
    return (
        <div>
            <Navbar/>

            <Container className="container-fluid">

                <div className="row">
                    <div className="col-6" style={{marginTop: "100px"}}>

                        <p style={{fontSize: "38px"}}>
                            Cuộc họp video chất lượng giờ đây miễn phí cho tất cả mọi người.
                        </p>


                        {renderForm()}


                        <br/>



                    </div>

                    <div className="col-6">
                        <Image src={meetingPicture} size={'huge'} style={{padding: '20px'}}/>
                    </div>

                </div>


            </Container>
        </div>

    );

};

export default Home;