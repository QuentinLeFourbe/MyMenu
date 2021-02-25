import React from 'react'
import styled from 'styled-components'
import { ReactComponent as LeftArrow } from '../../../images/arrow-left-circle-fill.svg'
import { ReactComponent as RightArrow } from '../../../images/arrow-right-circle-fill.svg'


const Container = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    margin: 20px;
`;

const ButtonContainers = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px;
`;

const NavButton = styled.button`
    height: 40px;
    width: 40px;
    border-radius: 50%;
    border: none;
    background: none;
    font-size:20px;
`;

const ActiveButton = styled.button`
    height: 40px;
    width: 40px;
    border-radius: 50%;
    border: none;
    font-size:20px;
`;

const ArrowButton = styled.button`
    border-radius: 50%;
    border: none;
    background: none;
`;

const Title = styled.div`

`;

const WeekDetails = styled.div`

`;

function WeeksNavBar() {
    return (
        <Container>
            <Title> Semaine </Title>
            <ButtonContainers>
                <ArrowButton>
                    <LeftArrow
                        width='40px'
                        height='auto'
                    />
                </ArrowButton>
                <NavButton>3</NavButton>
                <NavButton>4</NavButton>
                <ActiveButton>5</ActiveButton>
                <NavButton>6</NavButton>
                <NavButton>7</NavButton>
                <ArrowButton>
                    <RightArrow
                        width='40px'
                        height='auto'
                    />
                </ArrowButton>
            </ButtonContainers>
            <WeekDetails> 25/01 - 31/01 </WeekDetails>
        </Container>
    )
}

export default WeeksNavBar
