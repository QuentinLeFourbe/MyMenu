import React from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import Day from './Day';
import { animated, useTransition, config, useSpring } from 'react-spring';

const Container = styled(animated.div)`
    display: flex;
    flex-flow: column wrap;
    margin-right: 5vw;
    margin-left: 2vw;
    flex-grow:1;
    /* border: solid black 1px; */
`;

function DaysContainer({ menus, startDate, endDate, dataLoading })
{
    dayjs.extend(isoWeek);

    const startWeekDay = startDate.isoWeekday();
    const endWeekDay = endDate.isoWeekday();

    const daysNumber = Array.from({ length: endWeekDay - startWeekDay + 1 }, (_, i) => i + startWeekDay);

    const spring = useSpring({
        from: { opacity: 0 },
        opacity: 1,
        delay: 700,
        config: config.molasses,
    })

    return (
        // <Container>
        <Container style={spring}>
            {
                daysNumber.map((dayNb, index) =>
                {
                    let dayDate = dayjs(startDate).add(dayNb - 1, 'day').format(); //retour à un format date natif
                    return <Day key={index} date={dayDate} dayMenus={menus.filter(menu => dayjs(menu.date).isSame(dayDate, 'day'))} dataLoading={dataLoading} />
                })
            }
        </Container>
    )
}

export default DaysContainer
