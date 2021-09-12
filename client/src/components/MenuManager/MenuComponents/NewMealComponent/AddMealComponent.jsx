import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { AppContext } from '../../../../AppContext';
import MealListItem from './MealListItem';
import AddButton from './AddButton';
import CancelButton from './CancelButton';
import { animated, config, useTransition } from 'react-spring';

const NewMealInputContainer = styled(animated.div)`
    margin: 8px;
    display: flex;
    flex-flow: row nowrap;
    position: absolute;
    left: 0;
    right: 0;
    max-width: 500px;
`;

const NewMealInput = styled.input`
    width: 100%;
    font-size: 1rem;
    padding: 0.5rem 8px 0.5rem 8px;
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
    /* width: 20vw; */
    left: 0;
    right:-16px;
    display: flex;
    flex-direction: column;
    max-height: 60vh;
    background: white;
    /* border: 1px solid lightgrey; */
    border-radius: 8px;
    box-shadow: 0px 1px 5px 3px rgba(0,0,0,0.12);
    overflow: auto;

    /* margin-left: 8px; */
    margin-top : 4px;
    
    z-index: 1;

`;

const Container = styled.div`
    height: 55px;
    position: relative;
    width: 100%;
`;

function AddMealComponent({ addMealHandler })
{
    const [isInputVisible, setInputVisibility] = useState(false);
    const [showMealList, setshowMealList] = useState(false);
    const { dataState } = useContext(AppContext);
    const [mealList, setMealList] = useState(dataState.meals);

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

    const onChangeInputValue = (e) =>
    {
        const filteredMeals =
            dataState.meals.filter(meal =>
                meal.name
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
            );
        setMealList(filteredMeals);
    }

    const transition = useTransition(isInputVisible, {
        from: { opacity: 0 },
        enter: { opacity: 1, },
        leave: { opacity: 0, },
        trail: 150,
        config: config.tight,
    })

    return (
        <Container>
            {transition((style, isInputVisible) =>
                isInputVisible ?
                    <NewMealInputContainer style={style}>
                        <div style={{ position: 'relative', flexGrow: 1 }}>
                            <NewMealInput onFocus={showMealListContainer} onBlur={hideMealListContainer} onChange={onChangeInputValue} />

                            {showMealList &&
                                <NewMealListContainer>
                                    {mealList.map(meal => <MealListItem addMealHandler={addMealHandler} mealId={meal.id}>{meal.name}</MealListItem>)}
                                </NewMealListContainer>
                            }
                        </div>
                        <CancelButton onClickHandler={hideInput} />
                    </NewMealInputContainer>
                    :
                    <AddButton springStyle={style} onClickHandler={showInput} />
            )
            }
        </Container >
    )
}

export default AddMealComponent
