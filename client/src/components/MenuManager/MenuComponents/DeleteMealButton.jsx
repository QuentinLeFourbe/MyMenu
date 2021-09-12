import React, { useState } from 'react'
import styled from 'styled-components'
import CloseIcon from '@material-ui/icons/Close';
import { useSpring, animated } from 'react-spring';

const DeleteButton = styled(animated.button)`
    margin-left: auto;
    border:none;
    background-color: transparent;
    padding: 0;
    height:20px;
    border-radius: 100px;
`;


function DeleteMealButton(props) {
    const { deleteMeal } = props;
    const [isHovered, setIsHovered] = useState(false);

    const spring = useSpring({
        backgroundColor: isHovered ? 'red' : 'transparent',
        color: isHovered ? 'white' : 'black',
    })

    const onMouseEnter = () => {
        setIsHovered(true);
    }

    const onMouseLeave = () => {
        setIsHovered(false);
    }

    return (
        <DeleteButton style={spring} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={deleteMeal}>
            <CloseIcon style={{ fontSize: 20 }} />
        </DeleteButton>
    )
}

export default DeleteMealButton
