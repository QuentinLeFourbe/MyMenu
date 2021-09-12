import React, { useState } from 'react'
import styled from 'styled-components'
import { useSpring, animated, config, useTransition, useTrail } from 'react-spring'
import { Link } from 'react-router-dom';

const Container = styled(animated.div)`
    text-decoration: none;
    position: relative;
    margin: 5vh 5vw 5vh 5vw;
    font-size: 1.5rem;
`;

function QuickMenuLink(props) {
    const { children, linkRef, onClickLinkHandler } = props;
    const [isHovered, setIsHovered] = useState(false);

    const spring = useSpring({
        from: {
            y: 0,
        },
        y: isHovered ? -5 : 0,
        config: {
            tension: 300,
            friction: 10,
        },
    })

    const onMouseEnter = () => {
        setIsHovered(true);
    }

    const onMouseLeave = () => {
        setIsHovered(false);
    }

    return (
        <Container  style={spring} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <Link onClick={onClickLinkHandler} style={{textDecoration: "none", color: "white"}} to={linkRef}>
                {children}
            </Link> 
        </Container>
    )
}

export default QuickMenuLink
