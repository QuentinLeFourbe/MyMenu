import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useTransition } from 'react-spring'
import LoadingSpin from './LoadingSpin';

const Container = styled.div`
    display:flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width:100vw;
    /* height: 100vh; */
`;




function LoadingComponent(props)
{
  const { hideLoading, loadingState } = props;
  const [isLoading, setIsLoading] = useState(true);

  const transition = useTransition(isLoading, {
    from: { x: -100, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    leave: { x: 100, opacity: 0 },
    trail: 1000,
  })

  useEffect(async () =>
  {
    if (loadingState == false)
    {
      await new Promise(r => setTimeout(r, 500));
      setIsLoading(false);
      await new Promise(r => setTimeout(r, 500));
      hideLoading();
    }
  }, [loadingState])
 
  return (
    <Container>
      {transition((styles, isLoading) => (
        isLoading && <LoadingSpin style={styles} />
      ))}
    </Container>
  )
}

export default LoadingComponent
