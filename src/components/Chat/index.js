import React, { Component } from "react";
import { compose } from "recompose";

import { withAuthorization, withEmailVerification } from "../Session";
import { withFirebase } from "../Firebase";
import Messages from "../Messages";
import Navigation from "../Navigation";

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
    };
  }

  componentDidMount() {
    this.props.firebase.users().on("value", (snapshot) => {
      this.setState({
        users: snapshot.val(),
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    return (
      <>
        <Navigation />
        <div className="chatBox_container">
          <Messages users={this.state.users} />
        </div>
        <hr />
      </>
    );
  }
}

const condition = (authUser) => !!authUser;

export default compose(
  withFirebase,
  withEmailVerification,
  withAuthorization(condition)
)(Chat);
