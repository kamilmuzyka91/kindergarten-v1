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
  <header className="mobile_header">
    <div className="container">
      <nav className="mobile_menu">
        <input type="checkbox" />
        <span className="burger_line"></span>
        <span className="burger_line"></span>
        <span className="burger_line"></span>
        <ul className="menu">
          <div class="header_logo">
            <h1 class="header_title">
              <i class="fas fa-user-graduate"></i>
            </h1>
            <p class="logo_text">Akacjowe Menu</p>
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
      </nav>
    </div>
  </header>
);

export default Navigation;
