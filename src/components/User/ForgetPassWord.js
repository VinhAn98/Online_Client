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

const ForgetPassword = () => {
    const {state,forgotPassword} = useContext(AuthContext);
    const formik = useFormik({
        initialValues: {
            email: '',

        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email('Invalid email').required('Please enter email'),

        }),

        onSubmit: async values => {
            console.log(values);
            forgotPassword(values)
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


                            <div style={{textAlign: 'right', whiteSpace: 'nowrap', marginTop: '20px'}}>
                                <button style={{marginRight: '15px', width: '30%', maxHeight: '50px'}} type="submit"
                                        className="btn btn-success">Send
                                </button>

                            </div>
                            {state.message}
                            <hr/>
                        </form>
                    </div>
                </Grid.Column>
            </Grid>
        </Container>


    );
};

export default ForgetPassword;
