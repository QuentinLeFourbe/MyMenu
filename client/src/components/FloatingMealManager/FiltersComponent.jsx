import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display:flex;
    flex-flow: column wrap;
`;

const SearchField = styled.input`
    margin: 0px 8px 0px 8px;
    padding: 8px;
    border-radius: 50px;
    border: none;
    background-color: #f3f3f5;
`;

const Filter = styled.select`
    margin: 8px;
    border-radius: 30px;
    border:none;
    background-color: #f3f3f5;
    padding: 6px;
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

function FiltersComponent() {
    return (
        <Container>
            <SearchField type="text" placeholder="Rechercher un plat"></SearchField>
            <FilterContainer>
                <Filter name="Trier par" id="tri">
                    <FilterOption value="recent">Plus récent</FilterOption>
                    <FilterOption value="nonrecent">Moins récent</FilterOption>
                    <FilterOption value="croissant">A - Z</FilterOption>
                    <FilterOption value="decroissant">Z - A</FilterOption>
                </Filter>

                <RadioContainer>
                    <RadioButton type="radio" id="meal" name="type" value="meal" checked />
                    <RadioLabel for="meal">Plat</RadioLabel>
                </RadioContainer>
                <RadioContainer right>
                    <RadioButton type="radio" id="ingredient" name="type" value="ingredient" />
                    <RadioLabel for="ingredient">Ingredient</RadioLabel>
                </RadioContainer>
            </FilterContainer>
        </Container>
    )
}

export default FiltersComponent
