import React from 'react'
import styled from 'styled-components'
import FiltersComponent from './FiltersComponent';
import ResultsComponent from './ResultsComponents';

const Container = styled.div`
    border: 1px solid lightgrey;
    display: flex;
    flex-flow: column nowrap;
    height: 60%;
    border-radius: 20px;
    position: fixed;
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
            <ResultsComponent/>


        </Container>
    )
}

export default FloatingMealManager
