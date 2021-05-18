import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSpring, animated, config } from 'react-spring'

const Container = styled.div`
    display:flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width:100vw;
    height: 80vh;
`;

const LoadingIcon = styled.div`

.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #ffd3d3;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fdd transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

`;

const LoadingSpin = styled(animated.div)`
 display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

    & div {
    box-sizing: border-box;
  position: absolute;
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #000000;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #000000 transparent transparent transparent;
}
  & div:nth-child(1) {
  animation-delay: -0.45s;
}
& div:nth-child(2) {
  animation-delay: -0.3s;
}
& div:nth-child(3) {
  animation-delay: -0.15s;
}

  @keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`;

function LoadingComponent(props) {
  const { hideLoading, loadingState } = props;
  const [isLoading, setIsLoading] = useState(true);

  const spring = useSpring({
    from: {
      x: isLoading ? -100 : 0,
      opacity: isLoading ? 0 : 1,
    },
    x: isLoading ? 0 : 100,
    opacity: isLoading ? 1 : 0,
  })

  useEffect(async () => {
    if (loadingState == false) {
      await new Promise(r => setTimeout(r, 500));
      setIsLoading(false);
      await new Promise(r => setTimeout(r, 500));
      hideLoading();
    }
  })

  return (
    <Container>
      <LoadingSpin style={spring}><div></div><div></div><div></div><div></div></LoadingSpin>
    </Container>
  )
}

export default LoadingComponent
