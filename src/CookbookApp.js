import React, { useState, useEffect } from "react";
import ViewRecipes from "./view/ViewRecipes";
import EditRecipe from "./edit/EditRecipe";
import "./stylesheets/index.css";
import MessageBar from "./MessageBar";
import Header from "./Header"
import ErrorMessageBar from "./ErrorMessageBar";

function CookbookApp({ token, currentUser, setAccessToken }) {
  const [showEditPage, setShowEditPage] = useState(false);

  const [creationSuccess, setCreationSuccess] = useState(false);
  const [deletionSuccess, setDeletionSuccess] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);
  const [newRecipeName, setNewRecipeName] = useState("");
  const [deletedRecipeName, setDeletedRecipeName] = useState("");
  const [editedRecipeName, setEditedRecipeName] = useState("");
  
  const [creationError, setCreationError] = useState(false);
  const [deletionError, setDeletionError] = useState(false);
  const [editError, setEditError] = useState(false);

  const [recipeToEdit, setRecipeToEdit] = useState({...defaultRecipe});

  useEffect(() => {
    const timer = setTimeout(() => {
      setEditSuccess(false);
      setDeletionSuccess(false);
      setCreationSuccess(false);
    }, 7000);
    return () => clearTimeout(timer);
  }, [creationSuccess, deletionSuccess, editSuccess]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEditError(false);
      setDeletionError(false);
      setCreationError(false);
    }, 7000);
    return () => clearTimeout(timer);
  }, [creationError, deletionError, editError]);

  function handleSelectEditRecipe(recipe) {
    setRecipeToEdit(recipe);
    setShowEditPage(true);
  }

  function handleSuccessfulEditRecipe(recipeName) {
    setEditedRecipeName(recipeName);
    setEditSuccess(true);
    setShowEditPage(false);
  }

  function onFailedEdit() {
    setShowEditPage(false);
    setEditError(true)
  }

  function handleCreateRecipe(recipeName) {
    defaultRecipe.ingredients = [{}];
    setRecipeToEdit({...defaultRecipe});
    setNewRecipeName(recipeName);
    setCreationSuccess(true);
    setShowEditPage(false);
  }

  function onFailedCreate() {
    setShowEditPage(false);
    setCreationError(true);
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
      <ErrorMessageBar 
        creationError={creationError}
        setCreationError={setCreationSuccess}
        deletionError={deletionError}
        setDeletionError={setDeletionError}
        editError={editError}
        setEditError={setEditError}
      />
      {showEditPage ? (
        <EditRecipe
          token={token}
          currentUser={currentUser}
          onBackToMyRecipes={() => setShowEditPage(false)}
          onSuccessfulCreate={(name) => handleCreateRecipe(name)}
          onSuccessfulEdit={(name) => handleSuccessfulEditRecipe(name)}
          onFailedCreate={()=>onFailedCreate()}
          onFailedEdit={()=>onFailedEdit()}
          inputtedRecipe={recipeToEdit}
        />
      ) : (
          <ViewRecipes
            token={token}
            currentUser={currentUser}
            onCreateRecipe={() => {
              setShowEditPage(true);
              setRecipeToEdit(defaultRecipe);
            }}
            onSuccessfulDelete={(name) => handleDeleteRecipe(name)}
            onEditRecipe={handleSelectEditRecipe}
            onFailedDelete={()=>setDeletionError(true)}
            onFailedEdit={()=>onFailedEdit()}
          />
        )}
    </>
  );
}
export default CookbookApp;

export const defaultRecipe = {
  steps: [""],
  ingredients: [{name:"", amount:0, measurement: ""}],
  recipename: "",
  servings: 0,
  author: "",
  cooktime: 0,
  preptime: 0
};
