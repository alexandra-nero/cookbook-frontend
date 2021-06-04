import React, { useState } from 'react'
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'
import CookbookApp from "./CookbookApp";
import Login from "./Login";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  return (
    <BrowserRouter>
      <Switch>
        {
          accessToken === "" ?
            (
              <><Route path="/login" exact>
                <Login 
                  setAccessToken={setAccessToken}
                  setCurrentUser={setCurrentUser}
                />
              </Route>
                <Redirect to="/login" /></>
            ) :
            (
              <><Route path="/cookbook" exact>
                <CookbookApp 
                  token={accessToken}
                  currentUser={currentUser} 
                  setAccessToken={setAccessToken}
                />
              </Route>
                {/* TODO: Comment Back in when creating calorie logger */}
                {/* <Route path="/calories" exact>
                  <CalorieLogApp setAccessToken={setAccessToken} />
                </Route> */}
                <Route path="/login" exact>
                  <Login
                    setCredentials={setAccessToken}
                    setCurrentUser={setCurrentUser}
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
