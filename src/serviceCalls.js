import axios from "axios";

let endpoint = "http://ec2-54-145-81-149.compute-1.amazonaws.com:8080";

export const createRecipe = async (recipe) => {
  await axios.post(endpoint + "/api/recipe", recipe, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getRecipes = async () =>{
  const response = await axios.get(endpoint + "/api/recipes");
  return response.data
};

export const updateRecipe = async (recipeId, recipe) => {
  await axios.put(endpoint + `/api/recipe/${recipeId}`, recipe, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteRecipe = async (recipeId) => {
  await axios.delete(endpoint + `/api/recipe/${recipeId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
