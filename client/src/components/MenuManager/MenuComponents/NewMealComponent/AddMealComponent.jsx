import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { AppContext } from '../../../../AppContext';
import MealListItem from './MealListItem';
import AddButton from './AddButton';
import CancelButton from './CancelButton';

const NewMealInputContainer = styled.div`
    margin: 8px;
    display: flex;
    flex-flow: row nowrap;
`;

const NewMealInput = styled.input`
    width: 20vw;
    font-size: 1rem;
    padding: 0.5rem;
    border-radius: 8px;
    /* border: none; */
    border: 1px solid lightgrey;
    background-color: white;
    /* background-color: #f3f3f5; */

    &:focus{
        outline: 2px solid #b8ceff;
        border-color: transparent;
    }
`;

const NewMealListContainer = styled.div`
    position: absolute;
    width: 20vw;
    display: flex;
    flex-direction: column;
    max-height: 60vh;
    background: white;
    /* border: 1px solid lightgrey; */
    border-radius: 8px;
    box-shadow: 0px 1px 5px 3px rgba(0,0,0,0.12);
    overflow: auto;
    margin-left: 8px;
    margin-top : 42px;
`;



function AddMealComponent({ addMealHandler })
{
    const [isInputVisible, setInputVisibility] = useState(false);
    const [showMealList, setshowMealList] = useState(false);
    const { dataState } = useContext(AppContext);
    const existingMeals = dataState.meals;

    const showInput = () =>
    {
        setInputVisibility(true);
    }

    const hideInput = () =>
    {
        setInputVisibility(false);
    }

    const showMealListContainer = () =>
    {
        setshowMealList(true);
    }

    const hideMealListContainer = () =>
    {
        setshowMealList(false);
    }

    return (
        <>
            {
                isInputVisible ?
                    <NewMealInputContainer>
                        <NewMealInput onFocus={showMealListContainer} onBlur={hideMealListContainer} />
                        <CancelButton onClickHandler={hideInput} />
                        {showMealList ?
                            <NewMealListContainer>
                                {existingMeals.map(meal => <MealListItem addMealHandler={addMealHandler} mealId={meal.id}>{meal.name}</MealListItem>)}
                            </NewMealListContainer>
                            : ""
                        }
                    </NewMealInputContainer>
                    :
                    <AddButton onClickHandler={showInput} />
            }
        </>
    )
}

export default AddMealComponent
