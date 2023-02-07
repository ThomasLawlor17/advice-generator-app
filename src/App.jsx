import './App.css';
import axios from 'axios';
import { useState } from 'react';

const App = () => {

  const [slip, setSlip] = useState({id: "", advice: ""})
  const [loading, setLoading] = useState(false)

  const url = 'https://api.adviceslip.com/advice'

  const fetchSlip = async () => {
    setLoading(true)
    const res = await axios.get(url)
    console.log(res.data)
    setSlip(res.data.slip)
    setLoading(false)
  }





  return (
    <div className="App">
      {loading ? 
     <p>loading...</p> 
    :
    <>
    <p>{slip.id}</p><p>{slip.advice}</p>
    </>
    }
      <button onClick={fetchSlip}>Advice</button>
    </div>
  );
}

export default App;
