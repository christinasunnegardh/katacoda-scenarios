import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  let [apiResponse, setApiResponse] = useState()
  useEffect(() => {
    callAPI()
  },[])

  const callAPI = () => {
    fetch("http://localhost:9000")
        .then(res => res.text())
        .then(res => setApiResponse(res))
        
  }

  return (
    <div className="App">
        <p className="App-text">{apiResponse}</p>
    </div>
  );
}

export default App;
