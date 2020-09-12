import React from "react";
import { Transition, Message } from "semantic-ui-react";

function MessageBar({ 
  creationSuccess, 
  newRecipeName, 
  setCreationSuccess, 
  deletionSuccess, 
  deletedRecipeName, 
  setDeletionSuccess, 
  editSuccess, 
  editedRecipeName, 
  setEditSuccess 
}) {
  return (
    <>
      <Transition visible={creationSuccess} animation="scale" duration={500}>
        <Message
          onDismiss={() => setCreationSuccess(false)}
          header="Success!"
          content={`Recipe, "${newRecipeName}", has been created`}
        />
      </Transition>
      <Transition visible={deletionSuccess} animation="scale" duration={500}>
        <Message
          onDismiss={() => setDeletionSuccess(false)}
          header="Success!"
          content={`Recipe, "${deletedRecipeName}", has been deleted`}
        />
      </Transition>
      <Transition visible={editSuccess} animation="scale" duration={500}>
        <Message
          onDismiss={() => setEditSuccess(false)}
          header="Success!"
          content={`Recipe, "${editedRecipeName}", has been edited`}
        />
      </Transition>
    </>
  );
}

export default MessageBar;
