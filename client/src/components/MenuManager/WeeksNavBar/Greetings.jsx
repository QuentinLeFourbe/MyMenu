import React from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { animated, useSpring, config } from 'react-spring'

const Container = styled(animated.div)`
/* margin-right: auto; */
margin-left: 1rem;
align-self: flex-start;
overflow: hidden;
`;

const DayLabel = styled.label`
    font-family: "Times New Roman", Times, serif;
    font-size: 3rem;
    @media(max-width: 600px){
        font-size: 2rem;
    }
`;

const HelloContainer = styled.div`
    /* margin: 1rem; */
    font-size: 0.8rem;
    margin-bottom: -8px;
`;

function Greetings()
{
    dayjs.extend(weekOfYear);

    const spring = useSpring({
        from: { opacity: 0, x: -30, },
        opacity: 1,
        x: 0,
        config: config.molasses,
        delay: 200,
    })

    return (
        <Container style={spring}>
            <HelloContainer>Bonjour, nous sommes le </HelloContainer>
            <DayLabel>{dayjs().format('dddd D MMMM')}</DayLabel>
        </Container>
    )
}

export default Greetings
