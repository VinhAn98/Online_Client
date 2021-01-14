import React from "react";




import Styled from "styled-components";

const FooterTag = Styled.footer`
    box-shadow: 0 -4px 2px -2px gray;
    background-color: #e8e8e8;
    text-align: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100px;
`;
const CoppyRight = Styled.div`
    background-color: #e8e8e8;
    text-align: center;
`;

const Footer = () => {
    return(
        <FooterTag className="page-footer font-small blue pt-4">
            <p style={{ fontSize: "20px", marginTop: '20px'}}>
                <b style={{ fontSize: "25px" }}>Meetting</b>
                room
            </p>
            <hr className="clearfix w-100 d-md-none pb-3" />
            <CoppyRight className="footer-copyright text-center py-3">
                Contact us at meetingRoom@gmail.com

            </CoppyRight>
        </FooterTag>
    );
};

export default Footer