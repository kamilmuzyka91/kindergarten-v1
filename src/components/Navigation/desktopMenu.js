// kopia desktop menu ze stylami

import React from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import SignOutButton from "../SignOut";
import { AuthUserContext } from "../Session";

import Hamburger from "./Hamburger";

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
    <Hamburger />
  </div>
);

export default Navigation;

.page_header_container {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  
    .page_header .container {
      height: 5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
  
      .header_logo {
        display: flex;
        align-items: center;
        font-family: $primary-font;
        .header_title {
          color: $kindergarten-color;
          margin-right: 1rem;
        }
        .logo_text {
          color: $form-color;
          font-weight: bold;
        }
      }
      .page_nav_list {
        display: flex;
        align-items: center;
        li {
          margin-left: 40px;
        }
        a {
          text-transform: uppercase;
          text-decoration: none;
          color: #8e9696;
          font-weight: 600;
          border-bottom: 4px solid transparent;
          letter-spacing: 0.1653rem;
          &:hover {
            color: #213131;
            border-color: $kindergarten-color;
          }
        }
      }
    }
    @include mobile {
      display: none;
    }
    @include tablet {
      display: none;
    }
  }
  

  <h1>Home Page</h1>
  <br />
  <p>Home Page jest dostępna dla wszystkich zarejestrowanych użytkowników</p>
  <br />
  <br />
  <section className="list">
    <article className="kids_games">img gry</article>
    <article className="kids_order">img zamówienia</article>
    <article className="kids_complaints">img skargi</article>
    <article className="kids_plans">img plany</article>
  </section>
</div>