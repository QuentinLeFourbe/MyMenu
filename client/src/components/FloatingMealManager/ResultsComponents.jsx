import React from 'react'
import styled from 'styled-components'

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
    return (
        <ResultContainer>
                <ResultItem>Item 1</ResultItem>
                <ResultItem>Item 2</ResultItem>
                <ResultItem>Item 3</ResultItem>
                <ResultItem>Item 4</ResultItem>
                <ResultItem>Item 5</ResultItem>
                <ResultItem>Item 6</ResultItem>
                <ResultItem>Item 7</ResultItem>
                <ResultItem>Item 8</ResultItem>
                <ResultItem>Item 9</ResultItem>
                <ResultItem>Item 9</ResultItem>
                <ResultItem>Item 9</ResultItem>
                <ResultItem>Item 9</ResultItem>
                <ResultItem>Item 9</ResultItem>
                <ResultItem>Item 9</ResultItem>
                <ResultItem>Item 9</ResultItem>
                <ResultItem>Item 9</ResultItem>
                <ResultItem>Item 9</ResultItem>
                <ResultItem>Item 9</ResultItem>
                <ResultItem>Item 9</ResultItem>
                <ResultItem>Item 9</ResultItem>
                <ResultItem>Item 9</ResultItem>
                <ResultItem>Item 9</ResultItem>
                <ResultItem>Item 9</ResultItem>
                <ResultItem>Item 10</ResultItem>
            </ResultContainer>

    )
}

export default ResultsComponents
