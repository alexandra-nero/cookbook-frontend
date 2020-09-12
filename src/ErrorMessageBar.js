import React from "react";
import { Transition, Message } from "semantic-ui-react";

function ErrorMessageBar({ 
  creationError,
  setCreationError, 
  deletionError,
  setDeletionError, 
  editError,
  setEditError 
}) {
  return (
    <>
      <Transition visible={creationError} animation="scale" duration={500}>
        <Message
          onDismiss={() => setCreationError(false)}
          header="Error"
          content={"There was an error in creating a new recipe"}
        />
      </Transition>
      <Transition visible={deletionError} animation="scale" duration={500}>
        <Message
          onDismiss={() => setDeletionError(false)}
          header="Error"
          content={"There was an error in deleting the recipe"}
        />
      </Transition>
      <Transition visible={editError} animation="scale" duration={500}>
        <Message
          onDismiss={() => setEditError(false)}
          header="Error"
          content={"There was an error in editing the recipe"}
        />
      </Transition>
    </>
  );
}

export default ErrorMessageBar;
