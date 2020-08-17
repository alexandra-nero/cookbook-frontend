import React, { useEffect, useState } from "react";
import { Input, Grid, Button, Icon, Card, Transition, Loader } from "semantic-ui-react";
import RecipeCard from "./RecipeCard";
import { getRecipes, searchRecipe } from "../serviceCalls";

function ViewRecipes({ onCreateRecipe, onSuccessfulDelete, onEditRecipe }) {
  const [recipes, setRecipes] = useState([]);
  const [shouldRefresh, setShouldRefresh] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isCurrent = true;
    (async () => {
      if (isCurrent) {
        if (shouldRefresh) {
          window.scrollTo(0, 0)
          setRecipes(await getRecipes());
        }
        setShouldRefresh(false);
      }
    })();
    return () => {
      isCurrent = false
    }
  }, [shouldRefresh]);


  function refreshRecipesAfterDelete(recipe) {
    setShouldRefresh(true);
    onSuccessfulDelete(recipe.recipeName);
  }

  async function submitSearch(event) {
    if (event.key === 'Enter') {
      setIsLoading(true);
      setRecipes([await searchRecipe(event.target.value)]);
      setIsLoading(false);
    }
  }

  return (
    <Grid padded>
      <Grid.Row columns="equal">
        <Grid.Column>
          <Input
            fluid
            placeholder="Search Recipe"
            icon={<Icon name="search" color='orange' inverted circular link />}
            onKeyPress={async (event) => await submitSearch(event)} />
        </Grid.Column>
        <Grid.Column textAlign="right">
          <Button color="orange" onClick={() => onCreateRecipe()}>
            <Icon name="plus" />
            New Recipe
          </Button>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          {isLoading || shouldRefresh ?
            (<p style={{ color: 'grey', cursor: 'pointer' }}>
              <Icon
                loading
                color='grey'
                name="spinner"
              ></Icon>{"\tRefresh Recipes"}
            </p>) :
            (<p style={{ color: 'grey', cursor: 'pointer' }}
              onClick={() => setShouldRefresh(true)}>
              <Icon
                name="refresh"
                color='grey'
              ></Icon>{"\tRefresh Recipes"}
            </p>
            )
          }
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          {isLoading || shouldRefresh ?
            <Loader active inline='centered' disabled={false} size='huge'>Loading Recipes...</Loader> :
            <Card.Group itemsPerRow={1}>
              <Transition.Group
                duration={1500}
              >
                {recipes.map((r) => (
                  <RecipeCard
                    recipe={r}
                    refreshRecipesAfterDelete={refreshRecipesAfterDelete}
                    onEditRecipe={onEditRecipe}
                    key={"recipeCard" + r._id}
                  />
                ))}
              </Transition.Group>
            </Card.Group>
          }
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default ViewRecipes;
