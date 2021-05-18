import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import EditIcon from '@material-ui/icons/Edit';

const Container = styled.div`
    display:flex;
    flex-flow: column wrap;
`;

const Label = styled.label`
    margin: 0rem 1rem;

    &.dataLabel{
        margin: 0rem 0rem 1rem 2rem;
        display:${props => props.hide ? "none" : "block"};
    }
`;



const TextInput = styled.input`
    padding: 0.5rem;
    border-radius: 1rem;
    border: none;
    background-color: #f3f3f5;border-radius: 1rem;
    display:${props => props.show ? "block" : "none"};

`;

const Button = styled.button`
    border: none;
    background-color:transparent;
    display:${props => props.hide ? "none" : "block"};

    &:hover{
        background-color: lightgray;
    }

`;

const Row = styled.div`
    display:flex;
    flex-flow: row nowrap;
`;

function FormTextInput(props) {
    const { label, name, register, watch } = props;
    const [editState, setEditState] = useState(false)

    return (
        <Container>
            <Row>
                <Label>{label}</Label>
                <Button type="button" hide={editState} onClick={() => setEditState(true)}>
                    {console.log(editState)}
                    <EditIcon></EditIcon>
                </Button>
            </Row>
            <Label className="dataLabel" hide={editState} >{watch(name)}</Label> 
            <TextInput
                show={editState}
                id={name}
                name={name}
                type="text"
                ref={register}
            ></TextInput>
        </Container>
    )
}

export default FormTextInput
