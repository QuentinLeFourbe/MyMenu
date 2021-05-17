import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled.footer`
    grid-area: footer;
    margin-top: 10vh;
    background-color: #ff6f61;
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FooterLink = styled(Link)`
 
 color: white;
`;

function Footer() {
    return (
        <Container>
            <FooterLink to="/about">
                A propos
            </FooterLink>
        </Container>
    )
}



export default Footer
