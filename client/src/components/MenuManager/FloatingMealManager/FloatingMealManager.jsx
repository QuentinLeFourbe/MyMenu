import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { AppContext } from '../../../AppContext';
import { SortType } from '../../../Constant';
import FiltersComponent from './FiltersComponent';
import FloatingMealList from './FloatingMealList';

const Container = styled.div`
    display: flex;
    flex-flow: column nowrap;
    position: sticky; 
    top: 2vh;
    /* bottom: 1rem; */
    width: 15vw;
    height: 80vh;
    margin: 1rem 1rem 1rem 2.5vw;
    /* background-color: #ff6e6124; */
    border-radius: 2rem;
    padding: 1rem;
    border: solid lightgrey 1px;
`;

const Title = styled.div`
    margin: 1rem;
    /* text-align: center; */
    vertical-align: middle;
    font-size: 2rem;
    font-weight: bold;
`;



const SeparationLine = styled.div`
    border-top: 1px solid lightgrey;
    margin: 0px 8px 8px 8px ;
`;



function FloatingMealManager()
{
    const { dataState } = useContext(AppContext);
    const [data, setData] = useState({
        meals: [],
        filter: {
            search: "",
            sort: SortType.A_Z
        }
    });


    const applyFilter = (filter) =>
    {
        if (filter === undefined)
        {
            console.error("Filter is undefined");
            return;
        }

        let filteredMeals =
            dataState.meals.filter(meal =>
                meal.name
                    .toLowerCase()
                    .includes(filter.search.toLowerCase())
            );

        filteredMeals.sort((meal1, meal2) => meal1.name > meal2.name);
        if (filter.sort == SortType.Z_A)
        {
            filteredMeals = filteredMeals.reverse();
        }
        setData({ ...data, meals: filteredMeals, filter: filter });
    }

    useEffect(() =>
    {
        let meals = dataState.meals;
        meals.sort((meal1, meal2) => meal1.name > meal2.name);
        setData({ ...data, meals: meals });
    }, [dataState.meals])

    return (
        <Container>
            <Title>Mes plats</Title> 
            <FiltersComponent applyFilter={applyFilter} filter={data.filter} />
            <SeparationLine />
            <FloatingMealList meals={data.meals} />
        </Container>
    )
}

export default FloatingMealManager
