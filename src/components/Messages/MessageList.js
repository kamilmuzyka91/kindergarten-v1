import React from "react";

import MessageItem from "./MessageItem";

const MessageList = ({ messages, onEditMessage, onRemoveMessage }) => (
  <ul className="message__list">
    <li className="message__item">
      {messages.map((message) => (
        <li className="user__item">
          {" "}
          <MessageItem
            key={message.uid}
            message={message}
            onEditMessage={onEditMessage}
            onRemoveMessage={onRemoveMessage}
          />
          <hr />
        </li>
      ))}
    </li>
  </ul>
);

export default MessageList;
