import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom'
import { Button } from "semantic-ui-react";
import ViewRecipes from "./view/ViewRecipes";
import EditRecipe from "./edit/EditRecipe";
import "./stylesheets/index.css";
import MessageBar from "./MessageBar";
import Header from "./Header"

function CookbookApp({ setAccessToken }) {
  const [showEditPage, setShowEditPage] = useState(false);

  const [creationSuccess, setCreationSuccess] = useState(false);
  const [deletionSuccess, setDeletionSuccess] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);
  const [newRecipeName, setNewRecipeName] = useState("");
  const [deletedRecipeName, setDeletedRecipeName] = useState("");
  const [editedRecipeName, setEditedRecipeName] = useState("");

  const [recipeToEdit, setRecipeToEdit] = useState(defaultRecipe);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEditSuccess(false);
      setDeletionSuccess(false);
      setCreationSuccess(false);
    }, 7000);
    return () => clearTimeout(timer);
  }, [creationSuccess, deletionSuccess, editSuccess]);

  function handleSelectEditRecipe(recipe) {
    setRecipeToEdit(recipe);
    setShowEditPage(true);
  }

  function handleSuccessfulEditRecipe(recipeName) {
    setEditedRecipeName(recipeName);
    setEditSuccess(true);
    setShowEditPage(false);
  }

  function handleCreateRecipe(recipeName) {
    setRecipeToEdit(defaultRecipe);
    setNewRecipeName(recipeName);
    setCreationSuccess(true);
    setShowEditPage(false);
  }

  function handleDeleteRecipe(recipeName) {
    setDeletedRecipeName(recipeName);
    setDeletionSuccess(true);
  }

  return (
    <>
      <Header styleValue={"orangeMenuStyle"} setAccessToken={setAccessToken}/>
      <MessageBar
        creationSuccess={creationSuccess}
        newRecipeName={newRecipeName}
        setCreationSuccess={setCreationSuccess}
        deletionSuccess={deletionSuccess}
        deletedRecipeName={deletedRecipeName}
        setDeletionSuccess={setDeletionSuccess}
        editSuccess={editSuccess}
        editedRecipeName={editedRecipeName}
        setEditSuccess={setEditSuccess}
      />
      {showEditPage ? (
        <EditRecipe
          onBackToMyRecipes={() => setShowEditPage(false)}
          onSuccessfulCreate={(name) => handleCreateRecipe(name)}
          onSuccessfulEdit={(name) => handleSuccessfulEditRecipe(name)}
          inputtedRecipe={recipeToEdit}
        />
      ) : (
          <ViewRecipes
            onCreateRecipe={() => {
              setShowEditPage(true);
              setRecipeToEdit(defaultRecipe);
            }}
            onSuccessfulDelete={(name) => handleDeleteRecipe(name)}
            onEditRecipe={handleSelectEditRecipe}
          />
        )}
    </>
  );
}
export default CookbookApp;

export const defaultRecipe = {
  steps: [""],
  ingredients: [{}],
  recipename: "",
  servings: 0,
  author: "",
  cooktime: 0,
  preptime: 0
};
