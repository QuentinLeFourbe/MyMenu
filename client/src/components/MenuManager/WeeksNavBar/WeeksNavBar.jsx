import React from 'react'
import styled from 'styled-components'
import { ReactComponent as LeftArrow } from '../../../images/arrow-left-circle-fill.svg'
import { ReactComponent as RightArrow } from '../../../images/arrow-right-circle-fill.svg'
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';


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


function WeeksNavBar(props) {
    dayjs.extend(weekOfYear)
    const { weekChanged, startDate, endDate } = props;


    const nextWeek = () => {
        if (weekChanged !== undefined)
            weekChanged(startDate.add(7, 'day'), endDate.add(7, 'day'));
    }

    const prevWeek = () => {
        if (weekChanged !== undefined)
            weekChanged(startDate.subtract(7, 'day'), endDate.subtract(7, 'day'));
    }

    return (
        <Container>
            <Title> Semaine </Title>
            <ButtonContainers>
                <ArrowButton>
                    <LeftArrow
                        width='40px'
                        height='auto'
                        onClick={prevWeek}
                    />
                </ArrowButton>
                <NavButton>{startDate.week() - 3}</NavButton>
                <NavButton>{startDate.week() - 2}</NavButton>
                <ActiveButton>{startDate.week() - 1}</ActiveButton>
                <NavButton>{startDate.week()}</NavButton>
                <NavButton>{startDate.week() + 1}</NavButton>
                <ArrowButton>
                    <RightArrow
                        width='40px'
                        height='auto'
                        onClick={nextWeek}
                    />
                </ArrowButton>
            </ButtonContainers>
            <WeekDetails> {startDate.get('date')}/{startDate.get('month') + 1} - {endDate.get('date')}/{endDate.get('month') + 1} </WeekDetails>
        </Container>
    )
}

export default WeeksNavBar
