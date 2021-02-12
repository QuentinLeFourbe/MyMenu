import React from 'react'
import styled, { keyframes } from 'styled-components'


//#region styled css
const GridLayout = styled.div`
    display:grid;
    grid-template-columns: 10% 20% auto 30% 10%;
`;

const MealForm = styled.form`
    grid-column-start: 2;
    display: flex;
    flex-flow: column wrap;
    justify-content: flex-start;
    border-style: solid;
    border-width: 1px;
    border-color: #dee2e6;
    padding: 8px;
`;

const Label = styled.label`
    margin-bottom: 8px;
    margin-top: 8px;
    font-size: 20px;
`;


const FormButton = styled.button`
    background-color: #ff6f61;
    color: #fff;
    border: none;

    text-transform: uppercase;
    text-decoration: none;
    padding: 15px 40px;
    display: inline-block;
    border-radius: 100px;
    transition: all .2s;
    position: relative;

    &::after {
        content: "";
        height: 100%;
        width: 100%;
        border-radius: 100px;
        transition: all .4s;
        background-color: #ff6f61;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
    }

    &:hover{
        transform: translateY(-3px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }

    &:hover::after {
        transform: scaleX(1.4) scaleY(1.6);
        opacity: 0;
}

    :active {
        transform: translateY(-1px);
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    }
   
`;

const RecipeArea = styled.textarea`
    resize: none;
    margin-bottom: 8px;
`;
//#endregion

const ingredientsDispo = ["Poulet", "Riz", "Crème fraiche", "Fromage", "Maïs"];

function MealsManagement() {
    return (
        <GridLayout>
            <MealForm>
                <h2>Créer une nouvelle recette !</h2>
                <Label for="name">Nom du plat</Label>
                <input
                    id="name"
                    name="name"
                    type="text"
                />

                <Label for="ingredients">Liste des ingrédients</Label>
                <input
                    id="ingredients"
                    name="ingredients"
                    type="text"
                />

                <Label for="recipe">Recette</Label>
                <RecipeArea
                    id="recipe"
                    rows="5"
                    cols="30"
                    placeholder="Entrez ici votre recette !"
                ></RecipeArea>
                <FormButton type="submit">Créer la recette</FormButton>
            </MealForm>

        </GridLayout>
    )
}

export default MealsManagement
