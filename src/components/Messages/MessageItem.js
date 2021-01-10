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
            </strong>
            {message.text} {message.editedAt && <span>(Edytowany)</span>}
          </span>
        )}

        {editMode ? (
          <span>
            <i
              className="save-icon icon far fa-save"
              onClick={this.onSaveEditText}
              title="zapisz"
            ></i>
            <i
              className="reset-icon icon fas fa-sync"
              onClick={this.onToggleEditMode}
              title="resetuj"
            ></i>
          </span>
        ) : (
          <i
            className="edit-icon icon far fa-edit"
            alt="edit"
            onClick={this.onToggleEditMode}
            title="edytuj"
          ></i>
        )}

        {!editMode && (
          <i
            class="delate-icon icon far fa-trash-alt"
            onClick={() => onRemoveMessage(message.uid)}
            title="usuń"
          ></i>
        )}
      </>
    );
  }
}

export default MessageItem;
