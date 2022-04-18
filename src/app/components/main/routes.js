import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";

import Main from "./Main";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Routes = ({ }) => {
    let query = useQuery();
    const accessToken = query.get("token");

    return (
        <Switch>
            <Route
                path="/:conferenceAlias"
                exact
                render={props => (
                    <Main
                        conferenceAlias={props.match.params.conferenceAlias}
                        accessToken={accessToken} />
                )}
            />
            <Route
                path="/"
                render={props => (
                    <Main
                        accessToken={accessToken} />
                )}
            />
        </Switch>
    );
};

export default Routes;
