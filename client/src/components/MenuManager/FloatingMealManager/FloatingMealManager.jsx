import React from 'react'
import styled from 'styled-components'
import FiltersComponent from './FiltersComponent';
import FloatingMealList from './FloatingMealList';

const Container = styled.div`
    border: 1px solid lightgrey;
    display: flex;
    flex-flow: column nowrap;
    height: 60vh;
    max-width: 50vw;
    border-radius: 20px;
    position: fixed;
    background-color: white;
`;

const Title = styled.div`
    margin: 10px;
    text-align: center;
    vertical-align: middle;
    font-size: 23px;
`;



const SeparationLine = styled.div`
    border-top: 1px solid lightgrey;
    margin: 0px 8px 8px 8px ;
`;



function FloatingMealManager() {
    return (
        <Container>
            <Title>Mes recettes !</Title>
            <FiltersComponent/>
            <SeparationLine/>
            <FloatingMealList/>


        </Container>
    )
}

export default FloatingMealManager
