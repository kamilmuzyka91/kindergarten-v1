import React, { Component } from "react";

import { AuthUserContext } from "../Session";
import { withFirebase } from "../Firebase";
import MessageList from "./MessageList";

class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      loading: false,
      messages: [],
      limit: 5,
    };
  }

  componentDidMount() {
    this.onListenForMessages();
  }

  onListenForMessages = () => {
    this.setState({ loading: true });

    this.props.firebase
      .messages()
      .orderByChild("createdAt")
      .limitToLast(this.state.limit)
      .on("value", (snapshot) => {
        const messageObject = snapshot.val();

        if (messageObject) {
          const messageList = Object.keys(messageObject).map((key) => ({
            ...messageObject[key],
            uid: key,
          }));

          this.setState({
            messages: messageList,
            loading: false,
          });
        } else {
          this.setState({ messages: null, loading: false });
        }
      });
  };

  componentWillUnmount() {
    this.props.firebase.messages().off();
  }

  onChangeText = (event) => {
    this.setState({ text: event.target.value });
  };

  onCreateMessage = (event, authUser) => {
    this.props.firebase.messages().push({
      text: this.state.text,
      userId: authUser.uid,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    this.setState({ text: "" });

    event.preventDefault();
  };

  onEditMessage = (message, text) => {
    this.props.firebase.message(message.uid).set({
      ...message,
      text,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  onRemoveMessage = (uid) => {
    this.props.firebase.message(uid).remove();
  };

  onNextPage = () => {
    this.setState(
      (state) => ({ limit: state.limit + 5 }),
      this.onListenForMessages
    );
  };

  render() {
    const { users } = this.props;
    const { text, messages, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div>
            {!loading && messages && (
              <button
                className="btn_show_older_message"
                type="button"
                onClick={this.onNextPage}
              >
                Pokaż starsze wiadomości
              </button>
            )}

            {loading && <div className="load_older_message">Pobieram ...</div>}

            {messages && (
              <MessageList
                messages={messages.map((message) => ({
                  ...message,
                  user: users
                    ? users[message.userId]
                    : { userId: message.userId },
                }))}
                onEditMessage={this.onEditMessage}
                onRemoveMessage={this.onRemoveMessage}
              />
            )}

            {!messages && <div className="chat_title">Zacznij czat...</div>}

            <form
              className="form_chatBox"
              onSubmit={(event) => this.onCreateMessage(event, authUser)}
            >
              <input
                className="input_message"
                type="text"
                value={text}
                onChange={this.onChangeText}
              />
              <button className="send_message" type="submit">
                Wyślij
              </button>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Messages);
