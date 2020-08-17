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
          header="Recipe created!"
          content={`Recipe, "${newRecipeName}", has been added to the database`}
        />
      </Transition>
      <Transition visible={deletionSuccess} animation="scale" duration={500}>
        <Message
          onDismiss={() => setDeletionSuccess(false)}
          header="Recipe deleted!"
          content={`Recipe, "${deletedRecipeName}", has been removed from the database`}
        />
      </Transition>
      <Transition visible={editSuccess} animation="scale" duration={500}>
        <Message
          onDismiss={() => setEditSuccess(false)}
          header="Recipe edited!"
          content={`Recipe, "${editedRecipeName}", has been edited in the database`}
        />
      </Transition>
    </>
  );
}

export default MessageBar;
