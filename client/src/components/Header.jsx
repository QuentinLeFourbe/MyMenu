import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";

const Container = styled.header`
    margin-bottom: 50px;
    padding: 0px 36px 0px 36px;
    /* background-color: #ff6f61; */
    min-height:25vh;

    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
    align-items: stretch;
    border-color:lightgrey;
    border-style:solid;
    border-width: 0px 0px 1px 0px;
`;




const NavLink = styled(Link)`
    /* color:white; */
    text-decoration: none;
    margin-left: ${props => props.right ? "auto" : "0px"};
    display:flex;
    align-items:center;
    padding: 0px 50px 0px 50px;

    &:hover {
    background: red; // <Thing> when hovered
    }
`;





function Header() {

    return (
        <Container>


            <NavLink to="/about">A propos</NavLink>

        </Container >
    )
}

export default Header
