import React from "react";

import AuthUserContext from "./context";
import { withFirebase } from "../Firebase";

const needsEmailVerification = (authUser) =>
  authUser &&
  !authUser.emailVerified &&
  authUser.providerData
    .map((provider) => provider.providerId)
    .includes("password");

const withEmailVerification = (Component) => {
  class WithEmailVerification extends React.Component {
    constructor(props) {
      super(props);

      this.state = { isSent: false };
    }

    onSendEmailVerification = () => {
      this.props.firebase
        .doSendEmailVerification()
        .then(() => this.setState({ isSent: true }));
    };
    render() {
      return (
        <AuthUserContext.Consumer>
          {(authUser) =>
            needsEmailVerification(authUser) ? (
              <div>
                {this.state.isSent ? (
                  <p>
                    Email weryfikacyjny został wysłany, sprawdź folder ze spamem
                    lub odśwież bieżącą stronę.
                  </p>
                ) : (
                  <p>
                    Proszę zweryfikować swój email klikając w link aby korzystać
                    z wszystkich możliwości aplikacji. W niektórych przypadkach
                    wiadomość mogła trafić do folderu SPAM.
                  </p>
                )}
              </div>
            ) : (
              <Component {...this.props} />
            )
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return withFirebase(WithEmailVerification);
};

export default withEmailVerification;
