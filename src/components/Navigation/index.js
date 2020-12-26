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
  <div className="page_header_container">
    <header className="page_header">
      <div className="container">
        <div class="header_logo">
          <h1 class="header_title">
            <i class="fas fa-user-graduate"></i>
          </h1>
          <p class="logo_text">Akacjowe Przedszkole</p>
        </div>
        <nav className="page_nav">
          <ul className="page_nav_list">
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
        </nav>
      </div>
    </header>
  </div>
);

export default Navigation;
