import React from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import Day from './Day';

const Container = styled.div`
    display: flex;
    flex-flow: column wrap;
    margin-right: 1rem;
    margin-left: 2vw;
    flex-grow:1;
`;

function DaysContainer(props) {
    dayjs.extend(isoWeek);

    const { menus, startDate, endDate } = props;
    const startWeekDay = startDate.isoWeekday();
    const endWeekDay = endDate.isoWeekday();

    const daysNumber = Array.from({ length: endWeekDay - startWeekDay + 1 }, (_, i) => i + startWeekDay);
    return (
        <Container>
            {
                daysNumber.map((dayNb, index) => {
                    let dayDate = dayjs(startDate).add(dayNb - 1, 'day').format(); //retour à un format date natif
                    return <Day key={index} date={dayDate} dayMenus={menus.filter(menu => dayjs(menu.date).isSame(dayDate,'day'))} />
                })
            }
        </Container>
    )
}

export default DaysContainer
