import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Overworld from "../pages/Overworld";
import { UserContext } from "../providers/UserProvider";
import PasswordReset from "./PasswordReset";
import NoMatch from "../pages/NoMatch";
import Battle from "../pages/Battle";
import CharContext from "../utils/CharContext";
import Landing from "../pages/Landing/index"

function Application() {
    const user = useContext(UserContext);
    // sets up character state on highest level application - so that it is available to other components.
    // currently empty placeholder for state
    const [characterState, setCharacterState] = useState({
        name: "",
        level: 0,
        strength: 0,
        maxHealth: 0,
        currentHealth: 0,
    })
    console.log(user ? user.uid : "User is not set yet");
    return (
        // this provider provides context for character info to app, so that the characterState and setCharacterState can be accessed from within the app/provider 
        <CharContext.Provider value={{
            userID: user ? user.uid : "User is not set yet",
            characterState, setCharacterState,
            // handleInputChange: () => { } ** for name? may be set using state instead
        }}>
            {user ? ;
                {characterState ?
                <Overworld /> :
                <Landing />
                }
            <Router>
                < Switch >
                <Route exact path="/">
                    <Overworld /> 
                </Route>
                <Route exact path="/battle">
                    <Battle />
                </Route>
                </Switch> 
            </Router >               
        

<Router>
    <Switch>
        <Route exact path="/">
            <SignIn />
        </Route>
        <Route exact path="/signUp">
            <SignUp />
        </Route>
        <Route exact path="/landing">
            <Landing />
            {/* <Route exact path="/passwordReset">
                            <PasswordReset /> */}
        </Route>
        <Route exact path="/overworld">
            {/* <Navbar /> */}
            <Overworld />
            {/* <NoMatch /> */}
        </Route>
        <Route exact path="/battle">
            {/* <Navbar /> */}
            <Battle />
        </Route>
    </Switch>
</Router>
                }

{/* this is a development test to see that we have character state on clicks from landig page */ }
<h1>
    {characterState.maxHealth}
    {characterState.name}

</h1>
        </CharContext.Provider >
    );
}
export default Application;
