import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display:flex;
    min-height: 300px;
    border-radius: 1rem;
    background-size: cover;
    background-image: url(${props => props.image});
    background-position: center; 
`;

const Item = styled.div`
   
&::before{
        content: "";
        height: 100%;
        width: 100%;
        border-radius: 0rem 0rem 1rem 1rem;
        background-color: #a3a3a3;
        position: absolute;
        top: 0;
        left: 0;
        opacity:0.5;
        z-index: -1;
    }

    color: white;
    flex-grow:1;
    align-self: flex-end;
    position: relative;
    padding:0.5rem;

`;


function MealItem(props) {
    const { image, children } = props;

    return (
        <Container image={image}>
            <Item >{children}</Item>
        </Container>
    )
}

export default MealItem
