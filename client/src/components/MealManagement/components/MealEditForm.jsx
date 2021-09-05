import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import FormTextInput from './FormTextInput';
import FormTextArea from './FormTextArea';
import LoadingComponent from '../../Loading/LoadingComponent';
import { useSpring, animated, useTransition, config } from 'react-spring';

const Container = styled.div`
`;

const FormContainer = styled(animated.div)`
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
    const { mealEdited, hideFunc, onUpdateMeal, onDeleteMeal, isOpen, formImage } = props;

    //State
    const [loadingState, setLoadingState] = useState(true);
    const [showLoading, setShowLoading] = useState(true);

    //React hook form
    const { register, reset, handleSubmit, watch, setValues } = useForm();

    const editPanelTransition = useTransition(showLoading, {
        from: { opacity: 0, y: 100 },
        enter: { opacity: 1, y: 0 },
    });

    const editPanelSpring = useSpring({
        from: { opacity: 0, y: 100 },
        y: 0,
        opacity: 1
    })

    useEffect(async () => {
        setShowLoading(true);
        if (mealEdited != null && mealEdited != undefined) {
            reset({ ...mealEdited, mealImage: '' });
            setLoadingState(false);
        } else {
            setLoadingState(true);
        }
    }, []);

    const hideLoading = () => {
        setShowLoading(false);
    }

    const onSubmit = (data) => {
        onUpdateMeal(mealEdited._id, data);
        hideFunc();
    }

    const onDelete = () => {
        onDeleteMeal(mealEdited.id);
        hideFunc();
    }

    return (
        <Container>
            {showLoading ?
                <LoadingComponent
                    hideLoading={hideLoading}
                    loadingState={loadingState}
                />
                :
                (editPanelTransition((editStyle, showLoading) => !showLoading &&
                    <FormContainer style={editStyle}>
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
                    </FormContainer>))
            }
        </Container>
    )
}

export default MealEditForm
