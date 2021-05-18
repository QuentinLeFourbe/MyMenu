import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useSpring, animated, config } from 'react-spring'

const Container = styled(animated.footer)`
    grid-area: footer;
    margin-top: 10vh;
    background-color: #ff6f61;
    min-height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FooterLink = styled(Link)`
 
 color: white;
`;

function Footer() {
    const springProps = useSpring({
        from: { y: 50, opacity: 0 },
        to: { y: 0, opacity: 1 },
        config: config.tight,
    })

    return (
        <Container style={springProps}>
            <FooterLink to="/about">
                A propos
            </FooterLink>
        </Container>
    )
}



export default Footer
