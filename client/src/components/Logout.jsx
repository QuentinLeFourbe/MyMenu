import React, { useEffect } from 'react'
import styled from 'styled-components'
import { logOut } from '../api'


function Logout()
{

    useEffect(async () =>
    {
        await logOut();
        console.log("Hey tchao");
    }, [])

    return (
        <div>

        </div>
    )
}

export default Logout
