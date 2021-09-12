import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { updateMenu } from '../../../api';
import { AppContext } from '../../../AppContext';
import DeleteMealButton from './DeleteMealButton';
import { useSpring, animated, config } from 'react-spring';

const Container = styled(animated.div)`
    display: flex;
    margin: 8px;
    background-color: white;
    padding: 8px;
    border: ${props => props.isDragging ? "1px dashed lightgrey" : "1px solid lightgrey"};

`;

function Meal(props)
{
    const { meal, parentId: parentid, isDragging } = props;
    const [isHovered, setIsHovered] = useState(false);

    const { dataState, dataDispatch } = useContext(AppContext);

    const onDeleteMeal = async () =>
    {
        const parentMenu = dataState.menus.find(menu => menu._id === parentid);

        if (parentMenu === undefined)
        {
            console.error("Menu parent undefined");
            return;
        }

        const mealIndex = parentMenu.meals.findIndex(mealItemId => mealItemId === meal.id);
        parentMenu.meals.splice(mealIndex, 1); //Delete the meal
        await updateMenu(parentid, parentMenu)
            .then(response =>
            {
                dataDispatch({ type: "UPDATE_MENU", payload: parentMenu })
            })
            .catch(error =>
            {
                console.log("Error: " + error.message)
            })
    }

    const spring = useSpring({
        color: (isHovered || isDragging) ? "#fda59c" : "black",
        // border: (isHovered || isDragging) ? "1px dashed lightgrey" : "1px solid lightgrey",
        // backgroundColor: (isHovered || isDragging) ? "#fda59c" : "white",
        config: config.tight,
        from: {opacity: 0},
        opacity: 1,
    })

    const onMouseEnter = () =>
    {
        setIsHovered(true);
    }

    const onMouseLeave = () =>
    {
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
                isDragging = {isDragging}
            >
                {meal.name}
                <DeleteMealButton deleteMeal={onDeleteMeal} />

            </Container>
        </div>

    )
}

export default Meal
