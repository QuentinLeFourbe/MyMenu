import React from 'react'
import styled from 'styled-components'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import Greetings from './Greetings';
import WeekNumberButton from './WeekNumberButton';
import WeekNavArrow from './WeekNavArrow';
import { animated, useSpring, config } from 'react-spring'

const Container = styled.div`
    flex-flow: column wrap;
    align-items: center;
    margin: 20px;
    flex-grow:1;
`;

const ButtonContainers = styled(animated.div)`
    align-self: center;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    margin: 1rem;
`;


function WeeksNavBar(props)
{
    dayjs.extend(weekOfYear)
    const { weekChanged, startDate, endDate } = props;

    const spring = useSpring({
        from: { opacity: 0 },
        opacity: 1,
        config: config.molasses,
        delay: 700,
    })

    const nextWeek = () =>
    {
        if (weekChanged !== undefined)
            weekChanged(startDate.add(7, 'day'), endDate.add(7, 'day'));
    }

    const prevWeek = () =>
    {
        if (weekChanged !== undefined)
            weekChanged(startDate.subtract(7, 'day'), endDate.subtract(7, 'day'));
    }

    return (
        <Container>
            <Greetings />
            <ButtonContainers style={spring}>
                <WeekNavArrow onClick={prevWeek}>
                    <ArrowBackIosIcon fontSize='inherit' />
                </WeekNavArrow>
                <WeekNumberButton outter>{startDate.week() - 3}</WeekNumberButton>
                <WeekNumberButton inner>{startDate.week() - 2}</WeekNumberButton>
                <WeekNumberButton selected>{startDate.week() - 1}</WeekNumberButton>
                <WeekNumberButton inner>{startDate.week() - 0}</WeekNumberButton>
                <WeekNumberButton outter>{startDate.week() + 1}</WeekNumberButton>
                {/* <WeekNumber>{startDate.format('DD/MM')} - {endDate.format('DD/MM')}</WeekNumber> */}
                <WeekNavArrow onClick={nextWeek}>
                    <ArrowForwardIosIcon fontSize='inherit' />
                </WeekNavArrow>
            </ButtonContainers>
        </Container>
    )
}

export default WeeksNavBar
