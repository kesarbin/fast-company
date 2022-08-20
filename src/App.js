import React from "react";
import NavBar from "./components/navBar";
import { Route, Switch } from "react-router-dom";
import Login from "./components/login";
import Users from "./components/users";
import Main from "./components/main";
import ChosenUser from "./components/chosenUser";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route
                    path="/users/:userId"
                    render={(props) => <ChosenUser {...props} />}
                />
                <Route path="/users" component={Users} />
                <Route path="/login" component={Login} />
                <Route path="/" component={Main} />
            </Switch>
        </div>
    );
}

export default App;
