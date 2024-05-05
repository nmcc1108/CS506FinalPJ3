import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'
import { Amplify } from 'aws-amplify'
import { API } from 'aws-amplify'
import { get } from 'aws-amplify/api'
import awsExports from "./aws-exports";

const myAPI = "api15e8eec5"
const path = '/customers'; 

const App = () => {
  const [input, setInput] = useState("")
  const [customers, setCustomers] = useState([])

  //Function to fetch from our backend and update customers array
  async function getCustomer(e) {
    let customerId = e.input
    const restOperation = get({apiName: myAPI, path: path + "/" + customerId})
    const { body } = await restOperation.response;
    const response = await body.json();
    console.log(response)
    let newCustomers = [...customers]
    newCustomers.push(response)
    setCustomers(newCustomers)
  }

  return (
    
    <div className="App">
      <h1>CS506 Final</h1>
      <h2>Customer Input</h2>
      <div>
          <input placeholder="customer id" type="text" value={input} onChange={(e) => setInput(e.target.value)}/>      
      </div>
      <br/>
      <button onClick={() => getCustomer({input})}>Get Customer From Backend</button>

      <h2 style={{visibility: customers.length > 0 ? 'visible' : 'hidden' }}>Response</h2>
      {
       customers.map((thisCustomer, index) => {
         return (
        <div key={thisCustomer.customerId}>
          <span><b>CustomerId:</b> {thisCustomer.customerId} - <b>CustomerName</b>: {thisCustomer.customerName}</span>
        </div>)
       })
      }
    </div>
  )
}

export default App;