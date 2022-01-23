import styled, { keyframes } from 'styled-components';


const loginBackground = keyframes`
  0% {background-color: var(--red);}
  20% {background-color: var(--brown);}
  40% {background-color: var(--blue);}
  60% {background-color: var(--green);}
  80% {background-color: var(--purple);}
  100% {background-color: var(--red);}
`


export const PageWrapper = styled.div`
  background: var(--red);
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  animation-name: ${loginBackground};
  animation-duration: 15s;
  animation-iteration-count: infinite;
`
