import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { updateMeal, fetchMeals, deleteMeal } from '../../api';
import { AppContext } from '../../AppContext';
import FormTextInput from './FormTextInput';
import CloseIcon from '@material-ui/icons/Close';
import FormTextArea from './FormTextArea';
import LoadingComponent from '../LoadingComponent';
import { useSpring, animated } from 'react-spring';

const Overlay = styled.div`
    height: 100%;
    width: 100%;
    display: block;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: rgb(0,0,0);
    background-color: rgba(50,50,50, 0.8);
    z-index: 2;
`;

const Container = styled(animated.div)`
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
    background-image: url('/api/${props => props.image}');
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

    &.delete{
        background-color: grey;
            &::after {
            content: "";
            height: 100%;
            width: 100%;
            border-radius: 100px;
            transition: all .4s;
            background-color: grey;
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
        }
    }

    &.right{
        margin-left: auto;
    }
   
`;

const ButtonContainer = styled.div`
 display: flex;
 flex-flow: row wrap;

`;

function MealEditForm(props) {
    //Props
    const { mealId, hideFunc } = props;
    //Context
    const context = useContext(AppContext);
    const { dataDispatch } = context;
    //State
    const [formImage, setFormImage] = useState('');
    // const emptyMealState = { name: '', ingredients: '', recipe: '' }

    const [loadingState, setLoadingState] = useState(true);
    const [showLoading, setShowLoading] = useState(true);

    const hideLoading = () => {
        setShowLoading(false);
    }
    //React hook form
    const { register, reset, handleSubmit, watch, setValues } = useForm();

    //Spring animation
    const spring = useSpring({
        from: {
            y: 200,
            opacity: 0,
        },
        y: showLoading ? 200 : 0,
        opacity: showLoading ? 0 : 1,
    })

    useEffect(async () => {
        if (mealId === "") {
            reset();
            return;
        }
        await axios.get(`/api/meals/${mealId}`)
            .then(response => {
                let mealEdited = response.data[0];
                setFormImage(mealEdited.mealImage);
                reset({ ...mealEdited, mealImage: '' }); //Empty mealImage so it does not load the path in file Input and crash
            })
            .catch(error => {
                console.error("Error: " + error.message)
            });
            setLoadingState(false);
        }, []);

    const onSubmit = async (data) => {
        const meal = { ...data };
        if (data.mealImage.length > 0) {
            meal.mealImage = data.mealImage[0]
        } else {
            console.log(delete meal.mealImage);
        }
        console.log(meal);

        var formData = new FormData();
        for (var key in meal) {
            formData.append(key, meal[key]);
        }
        await updateMeal(mealId, formData)
            .then(() => {
                dataDispatch({ type: 'UPDATE_MEALS', payload: formData })
            })
            .catch(error => {
                console.error("Error: " + error.message)
            })

        await fetchMeals().then(response => {
            dataDispatch({ type: 'FETCH_MEALS', payload: response.data })
        })

        hideFunc();
    }

    const onDelete = async () => {
        await deleteMeal(mealId).then(() => {
            dataDispatch({ type: 'DELETE_MEAL', payload: mealId })
        })
            .catch(error => {
                console.error("Error: " + error.message)
            });

        await fetchMeals().then(response => {
            dataDispatch({ type: 'FETCH_MEALS', payload: response.data })
        });

        hideFunc();
    }

    return (
        <Overlay>
            <CloseButton onClick={hideFunc}><CloseIcon style={{ fontSize: 45 }} /></CloseButton>
            {showLoading ? <LoadingComponent hideLoading={hideLoading} loadingState={loadingState} /> :
                <Container style={spring}>
                    <MealBanner image={formImage} />
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <FormTextInput label="Nom" name="name" register={register} watch={watch} />
                        <FormTextInput label="Ingrédients" name="ingredients" register={register} watch={watch} />
                        <FormTextArea label="Recette" name="recipe" register={register} watch={watch} />

                        <LabelsContainer>
                            <Label>Image</Label>
                            <FileInput
                                id="mealImage"
                                name="mealImage"
                                type="file"
                                accept="image/*"
                                ref={register}
                            />
                        </LabelsContainer>
                        <ButtonContainer>
                            <FormButton type="submit">Modifier</FormButton>
                            <FormButton className="delete right" type="button" onClick={() => onDelete()}>Supprimer</FormButton>
                        </ButtonContainer>

                    </Form>
                </Container>}
        </Overlay>
    )
}

export default MealEditForm
