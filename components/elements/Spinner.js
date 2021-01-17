import styled, { keyframes } from 'styled-components';
import { Spinner9 } from '@styled-icons/icomoon';

const spinnerAnim = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerDiv = styled.div`
  align-items: center;
  background: linear-gradient(hsla(0deg, 0%, 100%, 0.8), hsla(0deg, 0%, 100%, 0.8));
  display: flex;
  justify-content: center;
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 100;
  & > * {
    animation: ${spinnerAnim} 1s infinite;
  }
`;

const Spinner = () => (
  <SpinnerDiv>
    <Spinner9 size={80} color="#012f6a" />
  </SpinnerDiv>
)

export default Spinner;
