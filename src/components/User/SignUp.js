import React,{useContext} from 'react'


import {Context as AuthContext} from "../../context/AuthContext";

import {Link} from "react-router-dom";
import Styled from "styled-components";
import {useFormik } from 'formik';
import * as Yup from 'yup';
import {Container, Grid} from "semantic-ui-react";
import Navbar from "../NavBar/NavBar";



const Label = Styled.label`
    font-size: 26px;
`;

const SignUp = () => {

    const {state, signUp} = useContext(AuthContext);


    const formik = useFormik({
        initialValues: {
            email: '',
            password:'',
            name:'',
            role:''
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email('Invalid email').required('Please enter your email'),
            password: Yup.string()
                .min(6,'Too Short')
                .max(24,'Too Long')
                .required('Please enter your pas word'),
            name: Yup.string().min(6,'Your name is too short').required('Please enter your name'),
            role:Yup.string().required('please Choose your role')
        }),

        onSubmit: async values => {
            //console.log(values);
            await signUp(values);
            //history.push('/');
        },
    });

    return (
        <Container fluid>
            <Navbar />
            <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <div className="container">
                        <form
                            style={{margin: 'auto', maxWidth: '500px', textAlign: 'left'}}
                            onSubmit={formik.handleSubmit}

                        >
                            <div className="form-group">
                                <Label htmlFor="exampleInputEmail1">Địa chỉ Email</Label>
                                <input
                                    style={{width: '100%'}}
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    id="email"
                                    aria-describedby="emailHelp"
                                    placeholder="Nhập email của bạn"

                                    onChange={formik.handleChange}
                                    value={formik.values.email}

                                />
                                {formik.errors.email && formik.touched.email && (
                                    <p style={{color: 'red'}}>{formik.errors.email}</p>
                                )}
                            </div>
                            <div className="form-group">
                                <Label htmlFor="password">Mật khẩu</Label>
                                <input
                                    style={{width: '100%'}}
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                    placeholder="Nhập mật khẩu của bạn"

                                />
                                {formik.errors.password && formik.touched.password && (
                                    <p style={{color: 'red'}}>{formik.errors.password}</p>
                                )}
                            </div>
                            <div className="form-group">
                                <Label htmlFor="name">Tên</Label>
                                <input
                                    style={{width: '100%'}}
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                    placeholder="Nhập tên của bạn"

                                />
                                {formik.errors.name && formik.touched.name && (
                                    <p style={{color: 'red'}}>{formik.errors.name}</p>
                                )}
                            </div>
                            <div className="form-group">
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="role"
                                        id="teacher"
                                        value="teacher"
                                        onChange={formik.handleChange}

                                    />
                                    <label className="form-check-label" htmlFor="teacher">
                                        Teacher
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="role"
                                        id="student"
                                        value="student"
                                        onChange={formik.handleChange}

                                    />
                                    <label className="form-check-label" htmlFor="student">
                                        Student
                                    </label>
                                </div>
                                {formik.errors.role && formik.touched.role && (
                                    <p style={{color: 'red'}}>{formik.errors.role}</p>
                                )}
                            </div>

                            <div style={{textAlign: 'right', whiteSpace: 'nowrap', marginTop: '20px'}}>
                                <button
                                    style={{marginRight: '15px', width: '30%', maxHeight: '50px'}}
                                    type="submit"
                                    className="btn btn-success"


                                >
                                    Đăng ký
                                </button>
                                <Link to="/login">
                                    <button style={{width: '50%', maxHeight: '50px'}} className="btn btn-primary">
                                        Đã có tài khoản
                                    </button>
                                </Link>
                                {state.errorMessage ?<div> {state.errorMessage}</div> : null}
                            </div>
                            <hr/>
                        </form>
                    </div>
                </Grid.Column>
            </Grid>
        </Container>


    );

};

export default SignUp;