import React from "react";
import NavBar from "./components/navBar";
import { Route, Switch } from "react-router-dom";
import Login from "./components/login";
import Users from "./components/users";
import Main from "./components/main";
import ChosenUser from "./components/chosenUser";
import UserProvider from "./hooks/useUsers";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualityProvider } from "./hooks/useQualities";

function App() {
    return (
        <div>
            <NavBar />
            <QualityProvider>
                <ProfessionProvider>
                    <UserProvider>
                        <Switch>
                            <Route
                                path="/users/:userId"
                                render={(props) => <ChosenUser {...props} />}
                            />
                            <Route path="/users" component={Users} />

                            <Route path="/login" component={Login} />

                            <Route path="/" component={Main} />
                        </Switch>
                    </UserProvider>
                </ProfessionProvider>
            </QualityProvider>
            <ToastContainer />
        </div>
    );
}

export default App;
