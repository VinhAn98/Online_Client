import React from "react";
import Navbar from "../NavBar/NavBar";



const  Profile  = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    //need fetch user from server
    return (
        <div>
            <Navbar/>
            <div className="container bootstrap snippet">

                <h1 style={{marginLeft: 'auto', marginRight: 'auto', width: '350px', marginTop: '10px'}}>Thông tin người dùng</h1>


                <div className="row">
                    <div className="col-sm-3">
                        {/*left col*/}
                        <div className="text-center">
                            <img
                                src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png"
                                className="avatar img-circle img-thumbnail"
                                alt="avatar"
                            />
                            <h6>Thay đổi ảnh đại diện?</h6>
                            <input type="file"/>

                        </div>
                        <br />

                    </div>
                    {/*/col-3*/}
                    <div className="col-sm-9">

                        <div className="tab-content">
                            <div className="tab-pane active" id="home">
                                <hr />
                                <form className="form" method="post" id="registrationForm">

                                    <div className="col-xs-6">
                                        <label htmlFor="email">
                                            <h4>Tên tài khoản:</h4>
                                        </label>
                                        <label style={{marginLeft:'5px'}}>
                                            <h4>{userInfo.name}</h4>
                                        </label>
                                    </div>
                                    <div style={{marginTop:'10px'}} className="col-xs-6">
                                        <label htmlFor="email">
                                            <h4>Email:</h4>
                                        </label>
                                        <label style={{marginLeft:'5px'}}>
                                            <h4>{userInfo.email}</h4>
                                        </label>
                                    </div>



                                    <div className="form-group">
                                        <div style={{textAlign: "right"}} className="col-xs-12">
                                            <br />
                                            <button style={{marginBottom:'20px'}} className="btn btn-md btn-success">
                                                Chỉnh sửa thông tin
                                            </button>
                                            <button style={{marginLeft: '10px', float: 'right'}} className="btn btn-md btn-warning">
                                                Thay đổi mật khẩu
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                <hr />
                            </div>
                            {/*/tab-pane*/}
                            {/*/tab-pane*/}
                            <div className="tab-pane" id="settings">
                                <hr />
                            </div>
                        </div>
                        {/*/tab-pane*/}
                    </div>
                    {/*/tab-content*/}
                </div>
                {/*/col-9*/}
            </div>
        </div>

    );
};

export default Profile;
