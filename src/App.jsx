import './App.css';
import axios from 'axios';
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import Footer from './components/Footer';

const StyledMain = styled.main`
height: 100vh;
width: 100vw;
position: absolute;
top: 0;
right: 0;
left: 0;
background-color: var(--dark-blue);
}`

const StyledDiv = styled.div`
width: 354px;
height: fit-content;
min-height: 250px;
background-color: var(--dark-grayish-blue);
margin: auto;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
border-radius: 10px;
position: relative;
top: 120px;


.loading {
  height: 100px;
  width: 100px;
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: center;

  .loader {
    width: 50px;
    height: 50px;
    position: relative;
    border: 10px solid #eee;
    border-radius: 100vw;
    border-top: 10px solid var(--neon-green);
    animation: spin 3s linear infinite;

    &::before {
      position: absolute;
      content: '';
      top: -2.5px;
      left: 0px;
      width: 10px;
      height: 10px;
      border-radius: 100vw;
      background-color: var(--neon-green);
      animation: spin 3s linear infinite;
    }

    &::after {
      position: absolute;
      content: '';
      top: 0px;
      right: -2px;
      width: 10px;
      height: 10px;
      border-radius: 100vw;
      background-color: var(--neon-green);
      animation: spin 3s linear infinite;
    }
  }
}
@keyframes spin {
  0% {
    rotate: 0deg;
  }
  100% {
    rotate: 360deg;
  }
}

.slip {
  text-align: center;
  max-width: 290px;

  p {
    color: var(--neon-green);
    font-size: 11px;
    letter-spacing: 3px;
    margin: 44px 0 35px 0;
  }
  h3 {
    color: var(--light-cyan);
    font-size: 28px;
    font-weight: 800;
    line-spacing: 16px;
    margin: 0  0 22px 0;
  }
}

.bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

@media (min-width: 770px) {
  .bottom #mobile {
    display: none;
  }
}
@media (max-width: 769px) {
  .bottom #desktop {
    display: none;
  }
}

button {
  position: relative;
  border: none;
  background-color: var(--neon-green);
  border-radius: 50%;
  height: 65px;
  width: 65px;
  transition: all 0.2s ease-in-out;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: -32px;
  cursor: pointer;

  svg {
    margin: auto;
  }

  &:hover {
    box-shadow: 0 0 15px var(--neon-green);
  }
}
@media (min-width: 770px) {
  width: 542px;
  top: 225px;
}


`

const App = () => {

  const [slip, setSlip] = useState({id: "", advice: ""})
  const [loading, setLoading] = useState(true)

  const url = 'https://api.adviceslip.com/advice'

  const fetchSlip = async () => {
    setLoading(true)
    const res = await axios.get(url)
    console.log(res.data)
    setSlip(res.data.slip)
    setLoading(false)
  }

  useEffect(() => {
    fetchSlip()
  }, [])


  return (
    <>
    <StyledMain className="App">
      <StyledDiv className="content">
    <>
    <div className="slip">
      <p>ADVICE {loading ? 'Loading...' : `#${slip.id}`}</p>
      {loading ? 
      <div className="loading">
        <div className="loader"></div>
      </div>  
      :
      <h3><q>{slip.advice}</q></h3>
    }
    </div>
    </>
    <div className="bottom">
    <svg className='divider' id='mobile' width="295" height="16" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path fill="#4F5D74" d="M0 8h122v1H0zM173 8h122v1H173z"/><g transform="translate(138)" fill="#CEE3E9"><rect width="6" height="16" rx="3"/><rect x="14" width="6" height="16" rx="3"/></g></g></svg>
    <svg className='divider' id='desktop' width="444" height="16" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path fill="#4F5D74" d="M0 8h196v1H0zM248 8h196v1H248z"/><g transform="translate(212)" fill="#CEE3E9"><rect width="6" height="16" rx="3"/><rect x="14" width="6" height="16" rx="3"/></g></g></svg>
      <button onClick={fetchSlip}><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M20 0H4a4.005 4.005 0 0 0-4 4v16a4.005 4.005 0 0 0 4 4h16a4.005 4.005 0 0 0 4-4V4a4.005 4.005 0 0 0-4-4ZM7.5 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" fill="#202733"/></svg></button>
    </div>
      </StyledDiv>
    </StyledMain>
    <Footer/>
    </>
  );
}

export default App;
