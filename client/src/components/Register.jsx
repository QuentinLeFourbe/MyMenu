import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
`;

function Register() {


    return (
        <Container>
           <a href="/api/users/auth/google">Sign in with Google</a>
        </Container>
    )
}

export default Register
