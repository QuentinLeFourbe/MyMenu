import React from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';

const Container = styled.div`
/* margin-right: auto; */
margin-left: 1rem;
align-self: flex-start;
`;

const DayLabel = styled.label`
    font-family: "Times New Roman", Times, serif;
    font-size: 4rem;
`;

const HelloContainer = styled.div`
    /* margin: 1rem; */
    font-size: 1.5rem;
`;

function Greetings() {
    dayjs.extend(weekOfYear);



    return (
        <Container>
            <HelloContainer>Bonjour, nous sommes le </HelloContainer>
            <DayLabel>{dayjs().format('dddd D MMMM')}</DayLabel>
        </Container>
    )
}

export default Greetings
