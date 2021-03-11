import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { updateMeal, fetchMeals } from '../../api';
import { AppContext } from '../../AppContext';
import FormTextInput from './FormTextInput';
import CloseIcon from '@material-ui/icons/Close';

const Overlay = styled.div`
    height: 100%;
    width: 100%;
    display: ${props => props.show ? 'block' : 'none'};
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: rgb(0,0,0);
    background-color: rgba(50,50,50, 0.8);
`;

const Container = styled.div`
    background-color: white;
    border-radius: 50px;
    z-index: 2;
    margin: 1rem 4rem;
    display:flex;
    flex-flow:column nowrap;
`;

const Form = styled.form`
    display:flex;
    flex-flow: column wrap;
    padding: 2rem;
`;

const Label = styled.label`
    margin: 0rem 1rem;

    &.dataLabel{
        margin: 0rem 1rem 1rem 1rem;
    }
`;



const LabelsContainer = styled.div`
    display:flex;
    flex-flow: column wrap;
`;

const CloseButton = styled.button`
    border:none;
    height:45px;
    background-color: transparent;
    margin: 3rem 0rem 0rem 3rem;
    padding: 0;
    color:white;

    &:hover{
        background-color:white;
        color:black;
        border-radius: 100px;
    }
`;

const FileInput = styled.input`
    padding: 0.5rem;

`;

const MealBanner = styled.div`
    min-height: 150px;
    border-radius: 1rem 1rem 0rem 0rem;
    background-size: cover;
    background-image: url('http://localhost:5000/${props => props.image}');
    background-position: center; 
    flex-grow:1;
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

function MealEditForm(props) {
    //Props
    const { mealId, show, hideFunc } = props;
    //Context
    const context = useContext(AppContext);
    const { dataDispatch } = context;
    //State
    const emptyMealState = { name: '', ingredients: '', recipe: '', mealImage: '' }
    const [meal, setMeal] = useState(emptyMealState);

    //React hook form
    const { register, reset, handleSubmit } = useForm();

    useEffect(async () => {
        if (mealId === "") {
            setMeal(emptyMealState);
            reset();
            return;
        }

        await axios.get(`http://localhost:5000/meals/${mealId}`)
            .then(response => {
                let mealEdited = response.data[0]
                setMeal(mealEdited);
                reset(meal);
            })
            .catch(error => {
                console.error("Error: " + error.message)
            });


    }, [mealId]);

    const onSubmit = async (data) => {
        const meal = { ...data, mealImage: data.mealImage[0] };
        var formData = new FormData();
        for (var key in meal) {
            formData.append(key, meal[key]);
        }

        await updateMeal(formData)
            .then(() => {
                dataDispatch({ type: 'UPDATE_MEALS', payload: formData })
            })
            .catch(error => {
                console.error("Error: " + error.message)
            })

        await fetchMeals().then(response => {
            dataDispatch({ type: 'FETCH_MEALS', payload: response.data })
        })
    }

    return (
        <>
            <Overlay show={show} >
                <CloseButton onClick={hideFunc}><CloseIcon style={{ fontSize: 45 }} /></CloseButton>
                <Container>
                    <MealBanner image={meal.mealImage} />
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <FormTextInput label="Nom" value={meal.name} name="name" register={register} />
                        <FormTextInput label="Ingrédients" value={meal.ingredients} name="ingredients" register={register} />
                        <FormTextInput label="Recette" value={meal.recipe} name="recipe" register={register} />

                        <LabelsContainer>
                            <Label>Image</Label>
                            <Label className="dataLabel">{meal.mealImage}</Label>
                            <FileInput
                                id="mealImage"
                                name="mealImage"
                                type="file"
                                accept="image/*"
                                ref={register}
                            />
                        </LabelsContainer>
                        <FormButton type="submit">Modifier</FormButton>
                    </Form>
                </Container>
            </Overlay>
        </>
    )
}

export default MealEditForm
