import React from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
// import SignOutButton from "../SignOut";
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
    <div class="menuToggle">
      <input type="checkbox" />

      <span></span>
      <span></span>
      <span></span>
      <ul className="menu">
        <i className="teacher_icon fas fa-user-graduate"></i>

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
      </ul>

      {/* <i class="fas fa-user-graduate"></i>
            
            <p class="logo_text">Akacjowe Menu</p> */}
    </div>
  </header>
);

export default Navigation;
