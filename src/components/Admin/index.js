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
    // pobranie userów z interfejsu API realtime database do zarządzania nimi
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
        <br />
        <h1>Panel administracyjny</h1>
        <br />
        {loading && (
          <div>
            <i class="loading fas fa-spinner fa-spin"></i>
          </div>
        )}
        <h2>Lista użytkowników:</h2>
        <UserList users={users} />
      </>
    );
  }
}

const UserList = ({ users }) => (
  <>
    <ul>
      {users.map((user) => (
        <li key={user.uid}>
          <span>
            <strong>ID:</strong> {user.uid}
          </span>

          <span>
            <strong>E-Mail :</strong> {user.email}
          </span>

          <span>
            <strong>Username:</strong> {user.username}
          </span>
          <hr />
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
