import styled from 'styled-components'


export const Wrapper = styled.div`
  width: 90%;
  position: absolute;
  transform: translate(-50%);
  left: 50%;
  text-align: center;
`

export const Box = styled.div`
  width: 400px;
  height: 400px;
  top: 0;
  position: relative;
  background-color: var(--white);
  border-radius: 16px;
  position: relative;
  transition: 0.3s;
  display: inline-block;
  margin: 1em;
  margin-bottom: 20px;
  margin-left: 20px;
  margin-right: 20px;
  display: inline-block;
  padding: 10px;

  &:hover {
    width: 420px;
    height: 420px;
    margin-bottom: 0;
    margin-left: 10px;
    margin-right: 10px;
  }

`

export const BoxWrapper = styled.div`
  margin-top: 16px;
  width: 100%;
  height: 70%;
`

export const Text = styled.span`
  font-size: 1.1em;
  color: var(--black);
`

export const TextButton = styled(Text)`
  color: var(--button);
  cursor: pointer;
`

export const Input = styled.input`
  width: 85%;
  min-width: 120px;
  height: 3vh;
  min-height: 30px;
  margin-top: 1vh;
  border-radius: 8px;
  text-decoration: none;
  border: 2px solid #AAAABB;
  font-size: 1em;
  transition: 0.1s;
  text-align: center;
  color: var(--black);

  &:hover {
    border-color: #666677;
    letter-spacing: 0.1em;
    width: 90%;
  }
`

export const Submit = styled.input`
  width: 100px;
  height: 40px;
  margin-top: 20px;
  margin-bottom: 3em;
  border: 5px hidden #000000;
  background: var(--button);
  color: var(--white);
  text-decoration: none;
  cursor: pointer;
  position: relative;
	left: 50%;
	transform: translate(-50%,0);
  border-radius: 8px;
  font-size: 1.3em;
  transition: 0.1s;
  margin-bottom: 10px;
  display: table;

  &:hover {
    width: 120px;
    height: 50px;
    background: var(--buttonHover);
    font-size: 1.4em;
    text-shadow: 2px 2px 5px var(--shadow);
    border: 5px solid var(--buttonHoverBorder);
    border-radius: 12px;
  }
`
