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
    const restOperation = get({apiName: myAPI, path: path + "/" + customerId + firstName + lastName})
    const { body } = await restOperation.response;
    const response = await body.json();
    console.log(response)
    let newCustomers = [...customers]
    newCustomers.push(response)
    setCustomers(newCustomers)
  }

  return (
    
    <div className="App">
      <meta charset="utf-8"></meta>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>

      <h1>CS506 Final</h1>
      <h2>Customer Input</h2>
      <div>
      <form>
        <div class="form-row">
          <div class="col">
            <input type="text" class="form-control" placeholder="First name" value={input} onChange={(e) => setInput(e.target.value)}/>
          </div>
          <div class="col">
            <input type="text" class="form-control" placeholder="Last name" value={input} onChange={(e) => setInput(e.target.value)}/>
          </div>
        </div>
      </form>
          <input placeholder="customer id" type="text" value={input} onChange={(e) => setInput(e.target.value)}/>      
      </div>
      <br/>

      <button onClick={() => getCustomer({input})}>Get Customer From Backend</button>

      <h2 style={{visibility: customers.length > 0 ? 'visible' : 'hidden' }}>Response</h2>
      {
       customers.map((thisCustomer, index) => {
         return (
        <div key={thisCustomer.customerId}>
          <span><b>CustomerId:</b> {thisCustomer.customerId} - <b>CustomerName</b>: {thisCustomer.firstName} - {thisCustomer.lastName}</span>
        </div>)
       })
      }

    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    </div>
  
  )
}

export default App;