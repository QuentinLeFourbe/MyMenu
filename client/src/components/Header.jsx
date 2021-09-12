import React, { useState } from 'react'
import styled from 'styled-components'
import { useSpring, animated, config, useTransition, useTrail } from 'react-spring'
import { Link } from 'react-router-dom'
import QuickMenu from './Header/QuickMenu';
import { useMediaQuery } from '../Hooks/useMediaQuery';
import MobileMenu from './Header/MobileMenu';

const Container = styled(animated.header)`
    padding: 2vh 0 5vh 0;
    margin: 0 5vw 5vh 5vw;
    /* background-color: #ff6f61; */
    grid-area: header;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    /* justify-content: center; */
    border-bottom: 1px solid lightgrey;
`;

const Title = styled(animated.h1)`
    margin: 1rem;
    font-family: "Times New Roman", Times, serif;
    font-size: 6rem;
    display:flex;
    flex-flow: row nowrap;

    @media(max-width: 600px){
        font-size: 3rem;
    }
`;

const HeaderLink = styled(Link)`
    text-decoration: none;
    color:black;
`;

function Header({ user, show })
{
    let isScreenBig = useMediaQuery('(min-width: 995px)')

    const headerTransition = useTransition(show, {
        from: { y: -50, opacity: 0 },
        enter: { y: 0, opacity: 1 },
        leave: { y: -50, opacity: 0 },
        config: config.default,
    })

    const logout = () =>
    {
        window.location.href = "api/users/logout";
    }

    return (headerTransition((style, show) => show &&
        <Container style={style}>
            <HeaderLink to="/">
                <Title>Mes petits menus</Title>
            </HeaderLink>
            {user != null ?
                (isScreenBig ?
                    <QuickMenu /> : <MobileMenu />
                )
                : ""}
        </Container >)
    )
}

export default Header
