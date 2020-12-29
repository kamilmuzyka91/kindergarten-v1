import React from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import SignOutButton from "../SignOut";
import { AuthUserContext } from "../Session";

const Navigation = ({ authUser }) => (
  <AuthUserContext.Consumer>
    {(authUser) =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
        // ready to NavigationNonAuth
        <NavigationAuth authUser={authUser} />
      )
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
  <header className="header">
    <div className="mobile">
      <input className="menu-btn" type="checkbox" id="menu-btn" />
      <label className="menu-icon" for="menu-btn">
        <span class="navicon"></span>
      </label>

      <ul className="menu">
        <div className="header-logo">
          <i className="fas fa-user-graduate"></i>
        </div>
        <li>
          <Link to={ROUTES.HOME}>Strona główna</Link>
        </li>
        {!!authUser.roles[ROLES.ADMIN] && (
          <li>
            <Link to={ROUTES.ADMIN}>Panel administracyjny</Link>
          </li>
        )}
        <li>
          <Link to={ROUTES.ACCOUNT}>Profil</Link>
        </li>
        <li>
          <Link to={ROUTES.CHAT}>Czat</Link>
        </li>
        <li>
          <SignOutButton />
        </li>
      </ul>
    </div>
  </header>
);

export default Navigation;
