import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import googleLogo from '../images/googleLogo.svg'
import { useSpring, animated, config, useSprings, useTrail } from 'react-spring'

const Container = styled.div`
    display: flex;
    flex-flow: row wrap-reverse;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 50vh;
    margin: 0px;
    overflow: hidden;
`;

const SignInButton = styled(animated.button)`
    background-color: white;
    border: none;
    padding: 30px;
    border-radius: 150px;
    transition: all .2s;
    position: relative;

    &:hover{
        /* transform: translateY(-3px); */
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }

    :active {
        transform: translateY(-1px);
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    }
   
`;

const Title = styled(animated.div)`
    font-family: "Times New Roman", Times, serif;
    font-size: 5rem;
    
    margin-left: auto;
    padding: 1rem 5rem 1rem 5rem;
    z-index:1;
    position: relative;
    color: white;
    background: #ff6f61;

    /* &:after{
        position: absolute;
        top:0;
        right: 15%;
        width: 100%;
        height: 100%;
        content: "";
        background: #ff6f61;
        z-index: -1;
    transform: skewX(-30deg);
    } */
`;

const SubText = styled.div`
    color:#999999;
    font-size: 20px;
    margin-top:3vh;
    z-index:1;
`;

const LoginContainer = styled(animated.div)`
    /* margin-left: 20vw; */
    display:flex;
    align-items:center;
    justify-content: center;
    flex-flow: column nowrap;
`;

function Authentification() {
    const props = useSpring({
        to: { scale: 1.1 },
        from: { scale: 1 },
        loop: {reverse: true},
        config: config.slow,
    })

    const googleSignIn = async () => {
        window.location.href = "api/auth/google";
    }

    const googleSpring = useSpring({
        from: {
            x: -100,
            opacity: 0,
        },
        opacity: 1,
        x: 0,
        delay: 500,
        config: {
            tension: 100,
            friction: 20,
            mass: 1,
        }
    });

    const springStyle = useSpring(
        {
            from: {
                x: 100,
                opacity: 0,
            },
            opacity: 1,
            x: 0,
            delay: 500,
            config: {
                tension: 100,
                friction: 20,
                mass: 1,
            },
        });

    return (
            <Container>
                <LoginContainer style={googleSpring}>
                    <SignInButton style={props} onClick={googleSignIn}>
                        <img src={googleLogo} width="120" height="120" />
                    </SignInButton>
                    <SubText>Connectez-vous avec Google</SubText>
                </LoginContainer>
            </Container>
    )
}

export default Authentification
