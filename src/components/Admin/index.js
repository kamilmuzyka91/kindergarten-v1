import React, { Component } from "react";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import { withAuthorization, withEmailVerification } from "../Session";
import * as ROLES from "../../constants/roles";

import Navigation from "../Navigation";

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    // pobranie userów z interfejsu API realtime database
    this.setState({ loading: true });

    this.props.firebase.users().on("value", (snapshot) => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map((key) => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }
  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;
    return (
      <>
        <Navigation />
        <section className="admin__panel">
          <h1 className="section__title">
            Panel administratora
            <div className="loading">
              {loading && (
                <div>
                  <i className="fas fa-spinner fa-spin"></i>
                </div>
              )}
            </div>
          </h1>

          <p className="user__list">Lista użytkowników:</p>
          <div className="user__list__item">
            <UserList users={users} />
          </div>
        </section>
      </>
    );
  }
}

const UserList = ({ users }) => (
  <>
    <ul className="users__list">
      {users.map((user) => (
        <li className="users__value" key={user.uid}>
          <p className="users__item">
            <strong>Użytkownik :</strong> {user.username}
          </p>

          <p className="users__item">
            <strong>E-Mail :</strong> {user.email}
          </p>

          <p className="users__item">
            <strong>Identyfikator :</strong> {user.uid}
          </p>
          <hr/>
        </li>
        
      ))}
    </ul>
  </>
);

const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withEmailVerification,
  withAuthorization(condition),
  withFirebase
)(AdminPage);
