import { MenuList } from '@material-ui/core';
import React, { useState } from 'react'
import styled from 'styled-components'
import QuickMenuLink from './QuickMenuLink';
import { useTrail, animated, config } from 'react-spring'

const Container = styled.div`
    display: flex;
    flex-flow: column nowrap;
    position: fixed;
    right: 0;
    top: 0;
    height: 100vh;
    background: #ff6e61df;
    color: white;
`;

const menuItems = [
    {
        name: "Menus",
        path: "/",
    },
    {
        name: "Plats",
        path: "/meals",
    },
    {
        name: "Déconnexion",
        path: "/logout",
    }

]

function QuickMenuContainer({onClickLinkHandler}) {

    const itemsTrail = useTrail(menuItems.length, {
        from: { opacity: 0, x: -20 },
        opacity: 1,
        x: 0,
        delay: 200,
    });

    return (
        // <Container>
                itemsTrail.map((style, i) => (
                    <animated.div style={style}>
                        <QuickMenuLink onClickLinkHandler={onClickLinkHandler} linkRef={menuItems[i].path}>{menuItems[i].name}</QuickMenuLink>
                    </animated.div>
                ))
        // </Container>
    )
}

export default QuickMenuContainer
