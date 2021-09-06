import React, { useEffect } from 'react'
import styled from 'styled-components'
import { SortType } from '../../../Constant';
import { useForm } from 'react-hook-form'


const Container = styled.div`
    display:flex;
    flex-flow: column nowrap;
    /* background-color: white; */
    margin-bottom: 0;
`;

const SearchField = styled.input`
    margin: 0px 1rem 0px 1rem;
    padding: 0.5rem;
    border-radius: 1rem;
    border: none;
    /* background-color: white; */
    background-color: #f3f3f5;
`;

const Filter = styled.select`
    margin: 8px;
    border-radius: 30px;
    border:none;
    /* background-color: blue; */
    background-color: #f3f3f5;
    padding: 6px;
    /* background: none; */
`;
const FilterOption = styled.option`
`;

const FilterContainer = styled.div`
    margin: 8px 8px 8px 8px;
    display:flex;
    flex-flow: row wrap;
    align-items: center;
`;

const RadioContainer = styled.div`
    margin: 10px;
`;

const RadioButton = styled.input`
`;
const RadioLabel = styled.label``;

function FiltersComponent(props)
{
    const { applyFilter, filter } = props;

    let search = "";
    let sort = SortType.A_Z;
    if (filter !== undefined){
        search = filter.search;
        sort = filter.sort;
    }

    const onChangeSearchValue = (e) =>
    {
        if(applyFilter === undefined){
            console.error("applyFilter is undefined")
            return;
        }
        
        search = e.target.value;
        applyFilter({ search: search, sort: sort });
    }

    const onChangeSortValue = (e) =>
    {
        if(applyFilter === undefined){
            console.error("applyFilter is undefined")
            return;
        }

        sort = e.target.value;
        applyFilter({ search: search, sort: sort });
    }
    return (
        <Container>
            <SearchField type="text" placeholder="Rechercher un plat" onChange={onChangeSearchValue}></SearchField>
            <FilterContainer>
                <Filter name="Trier par" id="tri" onChange={onChangeSortValue} defaultValue={sort}>
                    <FilterOption value={SortType.A_Z}>A - Z</FilterOption>
                    <FilterOption value={SortType.Z_A}>Z - A</FilterOption>
                </Filter>
            </FilterContainer>
        </Container>
    )
}

export default FiltersComponent
