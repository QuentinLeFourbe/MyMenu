import React, { useState } from 'react'
import styled from 'styled-components'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useSpring, animated, config, useTransition, useTrail } from 'react-spring'

const Container = styled.header`
    margin-bottom: 50px;
    padding: 0px 36px 0px 36px;
    /* background-color: #ff6f61; */
    min-height:25vh;
    grid-area: header;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    /* align-items: stretch; */
    border-color:lightgrey;
    border-style:solid;
    border-width: 0px 0px 0px 0px;
`;

const LogoutButton = styled.button`
    display:flex;
    align-items:center;
    text-decoration: none;
    background-color: transparent;
    border: none;
    border-radius: 10px;
    margin-left: ${props => props.right ? "auto" : "0px"};
    font-size: 50px;
    &:hover {
    background: #e9e9e9; // <Thing> when hovered
    }

`;

const Title = styled(animated.h1)`
    font-family: "Times New Roman", Times, serif;
    font-size: 5rem;
    display:flex;
    flex-flow: row nowrap;
`;

function Header() {

    const arrayTitle = ["M", "e", "s", '\xa0', "p", "e", "t", "i", "t", "s", "\xa0 ", "m", "e", "n", "u", "s"];
    const springProps = useSpring({
        from: { x: 500, opacity: 0 },
        to: { x: 0, opacity: 1 },
        config: { duration: 1000 },
    })

   const trail = useTrail(arrayTitle.length, {
    from: { y: -50, opacity: 0 },
    to: { y: 0, opacity: 1 },
    config: config.tight
   })
    
    const logout = () => {
        window.location.href = "api/users/logout";
    }

    return (
        <Container>
               {trail.map((props,index) => {
                   return(<Title
                   key={index}
                   style={props}
                   >
                      {arrayTitle[index]} 
                   </Title>)
               })}
            <LogoutButton right onClick={logout}>
                <ExitToAppIcon fontSize='inherit' />
            </LogoutButton>
        </Container >
    )
}

export default Header
