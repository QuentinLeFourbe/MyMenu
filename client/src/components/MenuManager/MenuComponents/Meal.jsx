import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { updateMenu } from '../../../api';
import { AppContext } from '../../../AppContext';
import CloseIcon from '@material-ui/icons/Close';
import DeleteMealButton from './DeleteMealButton';
import { useSpring, animated, config } from 'react-spring';

const Container = styled(animated.div)`
    display: flex;
    margin: 8px;
    /* border:   ${props => props.isDragging ? "1px dashed white" : "1px solid lightgrey"}; */
    background-color: ${props => props.isDragging ? "#ff6f61" : "transparent"};
    color: ${props => props.isDragging ? "white" : "black"};
    padding: 8px;
`;

function Meal(props) {
    const { meal, parentId, isDragging } = props;
    const [isHovered, setIsHovered] = useState(false);

    const { dataState, dataDispatch } = useContext(AppContext);

    const onDeleteMeal = async () => {
        const parentMenu = dataState.menus.find(menu => menu._id === parentId);

        if (parentMenu === undefined) {
            console.error("Menu parent undefined");
            return;
        }

        const mealIndex = parentMenu.meals.findIndex(mealItemId => mealItemId === meal.id);
        parentMenu.meals.splice(mealIndex, 1); //Delete the meal
        await updateMenu(parentId, parentMenu)
            .then(response => {
                dataDispatch({ type: "UPDATE_MENU", payload: parentMenu })
            })
            .catch(error => {
                console.log("Error: " + error.message)
            })
    }

    const spring = useSpring({
        color: (isHovered || isDragging) ? "white" : "black",
        border: (isHovered || isDragging) ? "1px solid white" : "1px solid lightgrey",
        backgroundColor: (isHovered || isDragging) ? "#ff6f61" : "transparent",
        deleteButtonOpacity: isHovered ? 1 : 0, 
    })

    const onMouseEnter = () => {
        setIsHovered(true);
    }

    const onMouseLeave = () => {
        setIsHovered(false);
    }

    return (
        <div
            {...props}
            ref={props.innerRef}
        >
            <Container
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                style={spring}
            >
                {meal.name}
                {props.deletable
                    ?
                    <animated.div style={{opacity: spring.deleteButtonOpacity, marginLeft: "auto"}}>
                        <DeleteMealButton deleteMeal={onDeleteMeal} />
                    </animated.div>
                    : ""
                }

            </Container>
        </div>

    )
}

export default Meal
