import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { AppContext } from '../../../AppContext';

const ResultContainer = styled.div`
    display: flex;
    flex-flow: column nowrap;
    margin: 8px;
    overflow: auto;
    padding-top: 8px;
`;

const ResultItem = styled.div`
    margin: 2px;
    padding: 8px;
    border: 1px solid lightgrey;
    border-radius: 1px;
`;

function ResultsComponents() {

    const {dataState} = useContext(AppContext);
    let meals = [];
    meals = dataState.meals;

    return (
        <ResultContainer>
            {meals.map((meal) =>
                <ResultItem>{meal.title}</ResultItem>
            )}
        </ResultContainer>

    )
}

export default ResultsComponents
