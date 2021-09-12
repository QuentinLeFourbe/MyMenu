import React from 'react'
import styled from 'styled-components'
import CloseIcon from '@material-ui/icons/Close';
import { animated, useTransition, config } from 'react-spring';
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
