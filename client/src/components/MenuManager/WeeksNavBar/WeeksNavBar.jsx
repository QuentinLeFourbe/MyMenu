import React from 'react'
import styled from 'styled-components'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';


const Container = styled.div`
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    margin: 20px;
    flex-grow:1;
`;

const WeekLabel = styled.label`
    font-family: "Times New Roman", Times, serif;
    font-size: 2rem;
`;

const DayLabel = styled.label`
    font-family: "Times New Roman", Times, serif;
    font-size: 3rem;
    margin-right:auto;
`;

const ButtonContainers = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    margin: 1rem;
`;

const ArrowButton = styled.button`
    display: flex;
    font-size:2rem;
    padding: 0px;
    border: none;
    background: none;

    &:hover{
        background-color:lightgrey;
    }
`;

const WeekNumber = styled.label`
    font-family: "Times New Roman", Times, serif;
    font-size: 2rem;
    border-radius: 50%;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
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
            <DayLabel>{dayjs().format('dddd D MMMM')}</DayLabel>
            <WeekLabel> Semaine </WeekLabel>
            <ButtonContainers>
            
                <ArrowButton onClick={nextWeek}>
                    <ArrowDropUpIcon fontSize='inherit'/>
                </ArrowButton>
                <WeekNumber>{startDate.week() - 1}</WeekNumber>
                <ArrowButton onClick={prevWeek}>
                    <ArrowDropDownIcon fontSize='inherit'/>
                </ArrowButton>
            </ButtonContainers>
        </Container>
    )
}

export default WeeksNavBar
