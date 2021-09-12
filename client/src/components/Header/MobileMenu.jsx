import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useSpring, animated, config } from 'react-spring'
import MenuIcon from '@material-ui/icons/Menu';
import QuickMenuContainer from './QuickMenuContainer';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

const MenuOverlay = styled(animated.div)`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #ff6e61df;
    z-index: 1;

    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
`;

const MenuButton = styled(animated.button)`
    margin: 2rem;
    margin-left: auto;
    text-decoration: none;
    background-color: transparent;
    border: none;
    z-index: 2;
`;

function MobileMenu()
{
    const [isMenuHovered, setIsMenuHovered] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const onHover = () => { setIsMenuHovered(true) };
    const onNotHover = () => { setIsMenuHovered(false) };

    const menuSpring = useSpring({
        color: isMenuHovered ? '#ff6f61' : (showMobileMenu ? 'white' : 'black'),
        config: config.tight,
    })

    const targetRef = useRef(null);
    useEffect(() =>
    {
        if (showMobileMenu)
        {
            targetRef.current && disableBodyScroll(targetRef.current)
        } else
        {
            targetRef.current && enableBodyScroll(targetRef.current)
        }
    }, [showMobileMenu])

    const showHideMenuOverlay = () =>
    {
        setShowMobileMenu(!showMobileMenu);
    }

    const overlaySpring = useSpring({
        opacity: showMobileMenu ? 1 : 0,
    });

    return (
        <>
            <MenuButton ref={targetRef} style={menuSpring} onMouseEnter={onHover} onMouseLeave={onNotHover} onClick={showHideMenuOverlay}>
                <MenuIcon fontSize="large"></MenuIcon>
            </MenuButton>
            {
                showMobileMenu && <MenuOverlay id="mobileMenu" style={overlaySpring}>
                    <QuickMenuContainer onClickLinkHandler={showHideMenuOverlay}/>
                </MenuOverlay>
            }
        </>
    )
}

export default MobileMenu
