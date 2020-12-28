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
    <div className="hamburger_container">
      <div className="menuToggle">
        <input type="checkbox" />

        <span></span>
        <span></span>
        <span></span>
   
      <ul className="menu">
        <div className="header_logo">
          <i className="teacher_icon fas fa-user-graduate"></i>
        </div>
        <Link to={ROUTES.HOME}>
          <li>Strona główna</li>
        </Link>
        {!!authUser.roles[ROLES.ADMIN] && (
          <Link to={ROUTES.ADMIN}>
            <li>Panel administracyjny</li>
          </Link>
        )}
        <Link to={ROUTES.ACCOUNT}>
          <li>Profil</li>
        </Link>
        <Link to={ROUTES.CHAT}>
          <li>Czat</li>
        </Link>
        <li>
          <SignOutButton />
        </li>
      </ul>
    </div>
    </div>
  </header>
);

export default Navigation;
