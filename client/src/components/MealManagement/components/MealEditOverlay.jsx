import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import CloseIcon from '@material-ui/icons/Close';
import { useSpring, animated, useTransition, config } from 'react-spring';
import MealEditForm from './MealEditForm';

const Overlay = styled(animated.div)`
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

function MealEditOverlay(props) {
    //Props
    const { isOpen, mealEdited, onUpdateMeal, onDeleteMeal, hideFunc, formImage } = props;

    const overlayTransition = useTransition(!!isOpen, {
        config: isOpen ? { ...config.stiff } : { duration: 200 },
        from: { opacity: 0, },
        enter: { opacity: 1, },
        leave: { opacity: 0, }
    });

    return (overlayTransition((styles, isOpen) =>
        isOpen &&
        <Overlay style={{ opacity: styles.opacity }}>
            <CloseButton onClick={hideFunc}><CloseIcon style={{ fontSize: 45 }} /></CloseButton>
            <MealEditForm
                mealEdited={mealEdited}
                onUpdateMeal={onUpdateMeal}
                onDeleteMeal={onDeleteMeal}
                hideFunc={hideFunc}
                formImage={formImage}
            />
        </Overlay>)
    )
}

export default MealEditOverlay
