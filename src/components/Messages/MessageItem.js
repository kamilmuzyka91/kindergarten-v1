import React, { Component } from "react";

class MessageItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editText: this.props.message.text,
    };
  }

  onToggleEditMode = () => {
    this.setState((state) => ({
      editMode: !state.editMode,
      editText: this.props.message.text,
    }));
  };

  onChangeEditText = (event) => {
    this.setState({ editText: event.target.value });
  };

  onSaveEditText = () => {
    this.props.onEditMessage(this.props.message, this.state.editText);

    this.setState({ editMode: false });
  };

  render() {
    const { message, onRemoveMessage } = this.props;
    const { editMode, editText } = this.state;

    return (
      <>
        {editMode ? (
          <input
            className="input_message"
            type="text"
            value={editText}
            onChange={this.onChangeEditText}
          />
        ) : (
          <span className="user_message">
            <strong className="user_name">
              {message.user.username || message.user.userId}
            </strong>{" "}
            {message.text} {message.editedAt && <span>(Edited)</span>}
          </span>
        )}

        {editMode ? (
          <span>
            <button className="btn_save_message" onClick={this.onSaveEditText}>
              Zapisz
            </button>
            <button
              className="btn_reset_message"
              onClick={this.onToggleEditMode}
            >
              Resetuj
            </button>
          </span>
        ) : (
          <button className="btn_edit_message" onClick={this.onToggleEditMode}>
            Edytuj
          </button>
        )}

        {!editMode && (
          <button
            className="btn_remove_message"
            type="button"
            onClick={() => onRemoveMessage(message.uid)}
          >
            Usuń
          </button>
        )}
      </>
    );
  }
}

export default MessageItem;
