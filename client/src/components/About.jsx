import React from 'react'
import styled from 'styled-components'

const Header = styled.header`
    margin-bottom: 50px;
    padding: 0px 36px 0px 36px;
    /* background-color: #ff6f61; */
    min-height:25vh;
    grid-area: header;
    display: flex;
    flex-flow: row wrap;
    /* align-items: stretch; */
    border-color:lightgrey;
    border-style:solid;
    border-width: 0px 0px 0px 0px;
`;

const Container = styled.div`
    display: flex;
    width: 80vw;
    height: 40vh;
    border-left: 6px solid black;
    margin-top: 10vh;
    margin-left: 10vw;
    padding: 2rem;
    flex-flow: column nowrap;


`;

const Title = styled.h1`
    font-family: "Times New Roman", Times, serif;
    font-size: 5rem;
    display:flex;
    flex-flow: row nowrap;
`;

function About() {
    return (
        <>
        <Header>
            <Title>Mes petits menus</Title>
        </Header>
        <Container>
            Créé par Quentin GARCIA
        </Container>
        </>
    )
}

export default About
