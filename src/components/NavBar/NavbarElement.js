import styled from 'styled-components';

export const Img = styled.img`
    margin: auto;
    width: 65px; 
`;

export const NavbarNave = styled.nav `
    white-space: nowrap;
    background-color: #e8e8e8 !important;
    box-shadow: 0 4px 2px -2px gray;
`;

export const NarbarHeader = styled.div`
    font-size:40px;
`;

export const NavbarLiA = styled.a `
    font-size: 20px;
    color: black !important;
    transition: transform .2s;
    text-align: center;
    margin-right: 15px; 
    &:hover {
    transform: scale(1.2);
  }
`;
export const Button = styled.button `
    margin-right: 15px;
    height: 45px;
    font-size: 20px;
`;