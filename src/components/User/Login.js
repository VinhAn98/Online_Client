import React, {useContext} from "react";
import {Context as AuthContext} from "../../context/AuthContext";
import {Link} from 'react-router-dom';
import {useFormik} from 'formik';
import Styled from 'styled-components';
import * as Yup from "yup";
import {Container, Grid} from "semantic-ui-react";
import Navbar from "../NavBar/NavBar";

const Label = Styled.label`
    font-size: 26px;
`;

const Login = () => {
    const {state, signIn} = useContext(AuthContext);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email('Invalid email').required('Required'),
            password: Yup.string()
                .min(6,'Too Short')
                .max(24,'Too Long')
                .required('Please enter your pass word')
        }),

        onSubmit: async values => {
            //console.log(values);
            await signIn(values);
            //history.push('/');
        },
    });
    return (
        <Container fluid>
            <Navbar />
            <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>

                    <div className="" >
                        <form
                            style={
                                {margin: 'auto', maxWidth: '500px', textAlign: 'left'}}

                            onSubmit={formik.handleSubmit}
                        >

                            <div className="form-group">
                                <Label htmlFor="email">
                                    Địa chỉ Email
                                </Label>
                                <input
                                    style={{width: '100%'}}
                                    type="email"
                                    className="form-control"
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
                                    autoComplete="password"
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                    placeholder="Nhập mật khẩu của bạn"
                                />
                                {formik.errors.password && formik.touched.password && (
                                    <p style={{color: 'red'}}>{formik.errors.password}</p>
                                )}
                            </div>
                            <div style={{textAlign: 'left'}} className="form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                <label className="form-check-label" htmlFor="exampleCheck1">Nhớ mật khẩu</label>

                                <Link style={{float: 'right'}} to="/forgetPassword">Bạn không nhớ mật khẩu?</Link>
                            </div>
                            <div style={{textAlign: 'right', whiteSpace: 'nowrap', marginTop: '20px'}}>
                                <button style={{marginRight: '15px', width: '30%', maxHeight: '50px'}} type="submit"
                                        className="btn btn-success">Đăng nhập
                                </button>
                                <Link to="/signup">
                                    <button style={{width: '50%', maxHeight: '50px'}} className="btn btn-primary">Đăng ký tài
                                        khoản mới
                                    </button>
                                </Link>
                            </div>
                            {state.errorMessage ?<div> {state.errorMessage}</div> : null}
                            <hr/>
                        </form>
                    </div>
                </Grid.Column>
            </Grid>
        </Container>


    );
};

export default Login
