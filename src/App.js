import React, { useState } from 'react'
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'
import CookbookApp from "./CookbookApp";
//import CalorieLogApp from "./CalorieLogApp";
import Login from "./Login";

function App() {
  const [accessToken, setAccessToken] = useState("");
  return (
    <BrowserRouter>
      <Switch>
        {
          accessToken === "" ?
            (
              <><Route path="/login" exact>
                <Login 
                  setAccessToken={setAccessToken}
                />
              </Route>
                <Redirect to="/login" /></>
            ) :
            (
              <><Route path="/cookbook" exact>
                <CookbookApp setAccessToken={setAccessToken} />
              </Route>
                {/* TODO: Comment Back in when creating calorie logger */}
                {/* <Route path="/calories" exact>
                  <CalorieLogApp setAccessToken={setAccessToken} />
                </Route> */}
                <Route path="/login" exact>
                  <Login
                    setCredentials={setAccessToken}
                  />
                </Route>
                <Redirect to="/cookbook" /></>
            )
        }
      </Switch>
    </BrowserRouter>
  )
}

export default App
