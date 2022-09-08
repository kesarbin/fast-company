import React from "react";
import NavBar from "./components/ui/navBar";
import { Route, Switch } from "react-router-dom";
import Login from "./components/layouts/login";
import Users from "./components/layouts/users";
import Main from "./components/layouts/main";
import ChosenUser from "./components/layouts/chosenUser";

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
                <Route path="/login/:type?" component={Login} />
                <Route path="/" component={Main} />
            </Switch>
        </div>
    );
}

export default App;
