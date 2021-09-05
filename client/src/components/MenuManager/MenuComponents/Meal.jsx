import React, { useContext } from 'react'
import styled from 'styled-components'
import { updateMenu } from '../../../api';
import { AppContext } from '../../../AppContext';
import CloseIcon from '@material-ui/icons/Close';

const Container = styled.div`
    display: flex;
    margin: 8px;
    border:   ${props => props.isDragging ? "1px dashed white":"1px solid lightgrey"};
    background-color: ${props => props.isDragging ? "#ff6f61":"transparent"};
    color: ${props => props.isDragging ? "white" : "black"};
    padding: 8px;

    &:hover{
        .deleteButton{
            opacity: 1;
        }
    }

`;

const DeleteButton = styled.button`
    margin-left: auto;
    border:none;
    background-color: transparent;
    padding: 0;
    opacity: 0;
    height:20px;

    &:hover{
        background-color:red;
        color:white;
        border-radius: 100px;
    }
`;

function Meal(props)
{
    const { meal, parentId, isDragging } = props;

    const { dataState, dataDispatch } = useContext(AppContext);

    const onDeleteMeal = async () =>
    {
        const parentMenu = dataState.menus.find(menu => menu._id === parentId);

        if (parentMenu === undefined)
        {
            console.error("Menu parent undefined");
            return;
        }

        const mealIndex = parentMenu.meals.findIndex(mealItemId => mealItemId === meal.id);
        parentMenu.meals.splice(mealIndex, 1); //Delete the meal
        await updateMenu(parentId, parentMenu)
            .then(response =>
            {
                dataDispatch({ type: "UPDATE_MENU", payload: parentMenu })
            })
            .catch(error =>
            {
                console.log("Error: " + error.message)
            })
    }

    const deleteButton = props.deletable ? <DeleteButton onClick={onDeleteMeal} className="deleteButton"><CloseIcon style={{ fontSize: 20 }} /></DeleteButton> : "";

    return (
        <Container {...props} ref={props.innerRef} isDragging={isDragging}>
            {meal.name}
            {deleteButton}
        </Container>
    )
}

export default Meal
