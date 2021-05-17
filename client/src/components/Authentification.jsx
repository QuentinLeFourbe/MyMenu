import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import googleLogo from '../images/googleLogo.svg'
import cercleBoule from '../images/CercleBoule.png'
import { useSpring, animated, config, useSprings, useTrail } from 'react-spring'

const Container = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 80vh;
`;

const MainContainer = styled.div`
    position: relative;


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

const Title = styled.h1`
    font-family: "Times New Roman", Times, serif;
    margin-bottom: 10vh;
    font-size: 80px;
    display:flex;
    flex-flow: row nowrap;
    z-index:1;
        /* This value is the OPPOSITE color of our background */
    /* color: rgb(0, 255, 255);  */
    mix-blend-mode: difference;
    }
`;

const SubText = styled.div`
    color:#999999;
    font-size: 20px;
    margin-top:3vh;
    z-index:1;
`;

const Circle = styled(animated.div)`
    background-color:#da702a;
    border-radius: 50%;
    width: 100vh;
    height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
    position: absolute;
    left: 25%;
    top: 0;
    margin: auto;
    z-index:-1;
    margin: 0;
    padding: 0;
`;

const LoginContainer = styled(animated.div)`
    display:flex;
    align-items:center;
    justify-content: center;
    flex-flow: column nowrap;
`;


function Authentification() {
    const [flip, set] = useState(false)
    const props = useSpring({
        to: { scale: 1.1 },
        from: { scale: 1 },
        reset: true,
        reverse: flip,
        config: { duration: 1000 },
        onRest: () => set(!flip),
    })

    const googleSignIn = async () => {
        window.location.href = "api/auth/google";
    }

    const circleSpring = useSpring({
        from: { scale: 0, },
        to: { scale: 3 },
        config: config.molasses,
    })

    const googleSpring = useSpring({
        from: {
            y: 100,
            opacity: 0,
        },
        opacity: 1,
        y: 0,
        config: {
            tension: 100,
            friction: 20,
            mass: 1,

        }
    });

    const welcomeString = `Bienvenue sur vos futurs menus !`;
    const springStyle = useSpring(
        {
            from: {
                y: -100,
                opacity: 0,
            },
            opacity: 1,
            y: 0,
            config: {
                tension: 100,
                friction: 20,
                mass: 1,

            }
        });

    return (
        <MainContainer>
            <Container>
                <Title>
                    <animated.div style={springStyle}>{welcomeString}</animated.div>
                    {/* {trail.map((styles, index) => <animated.div style={styles}>{welcomeString[index]}</animated.div>)} */}
                    {/* <Title>Bienvenue sur vos futurs menus ! </Title> */}
                </Title>
                <LoginContainer style={googleSpring}>
                    <SignInButton style={props} onClick={googleSignIn}>
                        <img src={googleLogo} width="120" height="120" />
                    </SignInButton>
                    <SubText>Connectez-vous avec Google</SubText>
                </LoginContainer>
            </Container>
        </MainContainer >
    )
}

export default Authentification
