import React from "react";

import MessageItem from "./MessageItem";

const MessageList = ({ messages, onEditMessage, onRemoveMessage }) => (
  <ul className="message__list">
    <li className="message__item">
      {messages.map((message) => (
        <li key={message.uid} className="user__item">
          <MessageItem
            key={message.uid}
            message={message}
            onEditMessage={onEditMessage}
            onRemoveMessage={onRemoveMessage}
          />
        </li>
      ))}
    </li>
  </ul>
);

export default MessageList;
