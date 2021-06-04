import React, { useContext } from "react";
import { Transition, Message } from "semantic-ui-react";
import { MessageBarContext } from "./MessageBarContext";

function MessageBar() {
  const { state, dispatch } = useContext(MessageBarContext);
  const { header, messageContent } = state;
  return (
    <Transition visible={Boolean(messageContent)} animation="scale" duration={500}>
      <Message
        onDismiss={() => dispatch({type: 'CLEAR_MESSAGE'})}
        header={header}
        content={messageContent}
      />
    </Transition>
  );
}

export default MessageBar;
