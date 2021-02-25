import React, { useContext } from 'react'
import { createMeal, fetchMeals } from '../../api';
import { AppContext } from '../../AppContext';
import styled from 'styled-components'
import axios from 'axios';
import { useForm } from 'react-hook-form'
//#region styled css


const Container = styled.form`
    display: flex;
    flex-flow: column wrap;
    justify-content: flex-start;
    border-style: solid;
    border-width: 1px;
    border-color: #dee2e6;
    border-radius: 1rem;
    margin: 1rem;
    padding: 1rem;
`;

const Label = styled.label`
    margin: 0.5rem 1rem 0.5rem 0rem;
    font-size: 1rem;
`;

const TextInput = styled.input`
    padding: 0.5rem;
    border-radius: 1rem;
    border: none;
    background-color: #f3f3f5;border-radius: 1rem;

`;

const FileInput = styled.input`
    padding: 0.5rem;

`;

const FormButton = styled.button`
    background-color: #ff6f61;
    color: #fff;
    border: none;
    max-width: 200px;
    max-height: 50px;
    text-transform: uppercase;
    text-decoration: none;
    padding: 10px 20px;
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
    margin: 0rem 0rem 1rem 0rem;
    padding: 0.5rem;
    border-radius: 1rem;
    border: none;
    background-color: #f3f3f5;border-radius: 1rem;
`;

const InlineDiv = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
`;

//#endregion

function MealCreationForm() {

    const { register, handleSubmit } = useForm()

    const context = useContext(AppContext);
    const { dataDispatch } = context;
    let meal = {
        name: "",
        recipe: "",
        selectedFile: "",
    }

    const saveMeal = async (e) => {
        e.preventDefault();

        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        await createMeal(meal, config)
            .then(() => {
                dataDispatch({ type: 'CREATE_MEALS', payload: meal })
            })
            .catch(error => {
                console.error("Error: " + error.message)
            })

        await fetchMeals().then(response => {
            dataDispatch({ type: 'FETCH_MEALS', payload: response.data })
        })
    }

    const onSubmit = async (data) => {
        console.log(data)
    }

    return (
        <Container onSubmit={handleSubmit(onSubmit)}>
            <h2>Créer une nouvelle recette !</h2>
            <Label for="name">Nom du plat</Label>
            <TextInput
                id="name"
                name="name"
                type="text"
                ref={register({required: true})}
            />

            <Label for="ingredients">Liste des ingrédients</Label>
            <TextInput
                id="ingredients"
                name="ingredients"
                type="text"
                ref={register}
            />

            <Label for="recipe">Recette</Label>
            <RecipeArea
                id="recipe"
                name="recipe"
                rows="5"
                cols="30"
                placeholder="Entrez ici votre recette !"
                ref={register}
            />
            <InlineDiv>
                <Label>Image</Label>
                <FileInput
                    id="selectedFile"
                    name="selectedFile"
                    type="file"
                    accept="image/*"
                    ref={register}
                />
            </InlineDiv>

            <FormButton type="submit" >Créer la recette</FormButton>
        </Container>

    )
}

export default MealCreationForm
