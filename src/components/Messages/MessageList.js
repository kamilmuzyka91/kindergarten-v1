import React from "react";

import MessageItem from "./MessageItem";

const MessageList = ({ messages, onEditMessage, onRemoveMessage }) => (
  <ul>
    <li className="messageList">
      {messages.map((message) => (
        <li>
          {" "}
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
