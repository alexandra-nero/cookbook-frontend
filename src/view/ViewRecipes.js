import React, { useEffect, useState, useRef } from "react";
import { Input, Grid, Button, Icon, Card, Transition, Loader, Pagination } from "semantic-ui-react";
import RecipeCard from "./RecipeCard";
import { getRecipes, searchRecipe } from "../serviceCalls";

function ViewRecipes({ 
  token, 
  currentUser, 
  onCreateRecipe, 
  onSuccessfulDelete, 
  onEditRecipe,
  onFailedDelete, 
  onFailedEdit, 
}) {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchField, setSearchField] = useState("");
  const [shouldRefresh, setShouldRefresh] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [disablePagination, setDisablePagination] = useState(false);
  const [errorState, setErrorState] = useState("")
  
  const totalNumberOfRecipes = useRef(null);
  const PAGESIZE = 5;

  useEffect(() => {
    let isCurrent = true;
    (async () => {
      if (isCurrent) {
        if (shouldRefresh) {
          window.scrollTo(0, 0)
          const response = await getRecipes({
            pageSize: PAGESIZE,
            pageCount: currentPage
          }, token);
          if (response.status !== 200) {
            setErrorState("Error Retrieving Recipes");
            setRecipes([]);
          } else {
            setErrorState(false);
            setRecipes(response.data.recipes);
            totalNumberOfRecipes.current = response.data.numberOfRecipes
          }
          setIsLoading(false);
          setDisablePagination(false);
        }
        setShouldRefresh(false);
      }
    })();
    return () => {
      isCurrent = false
    }
  }, [shouldRefresh, token, currentPage]);


  function refreshRecipesAfterDelete(recipe) {
    setShouldRefresh(true);
    onSuccessfulDelete(recipe.recipeName);
  }

  function refreshAndClearError(){
    setShouldRefresh(true);
    setErrorState("");
  }

  async function submitSearch() {
    setIsLoading(true);
    if (searchField !== ""){
      const response = await searchRecipe(searchField, token);
      if (response.status !== 200) {
        setErrorState("Recipe Not Found");
        setRecipes([]);
        totalNumberOfRecipes.current = 1
      } else {
        setErrorState("");
        setRecipes(response.data);
      }
      totalNumberOfRecipes.current = 1
      setIsLoading(false);
      setDisablePagination(true);
    } else {
      setShouldRefresh(true);
    }
  }

  async function onInputChange(event) {
    if (event.key === 'Enter') {
      submitSearch();
    }
  }

  async function switchPage(activePage){
    setCurrentPage(activePage);
    setShouldRefresh(true);
  }

  return (
    <Grid padded>
      <Grid.Row columns="equal">
        <Grid.Column>
          <Input
            fluid
            placeholder="Search Recipe"
            icon={<Icon name="search" color='orange' inverted circular link onClick={() => submitSearch()} />}
            onChange={(event) => setSearchField(event.target.value)}
            onKeyPress={async (event) => await onInputChange(event)} />
        </Grid.Column>
        <Grid.Column textAlign="right">
          <Button color="orange" onClick={() => onCreateRecipe()}>
            <Icon name="plus" />
            New Recipe
          </Button>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={8}>
          {isLoading || shouldRefresh ?
            (<p style={{ color: 'grey', cursor: 'pointer' }}>
              <Icon
                loading
                color='grey'
                name="spinner"
              ></Icon>{"\tRefresh Recipes"}
            </p>) :
            (<p style={{ color: 'grey', cursor: 'pointer' }}
              onClick={() => refreshAndClearError()}>
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
          {errorState !== ""  && <h1>{errorState}</h1>
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
                    token={token}
                    currentUser={currentUser}
                    recipe={r}
                    refreshRecipesAfterDelete={refreshRecipesAfterDelete}
                    onEditRecipe={onEditRecipe}
                    onFailedDelete={onFailedDelete}
                    onFailedEdit={onFailedEdit}
                    key={"recipeCard" + r._id}
                  />
                ))}
              </Transition.Group>
            </Card.Group>
          }
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
      <Grid.Column>
        <Pagination 
          defaultActivePage={1} 
          totalPages={Math.ceil(totalNumberOfRecipes.current/PAGESIZE) || 1} 
          firstItem={null}
          lastItem={null}
          disabled={disablePagination}
          pointing
          secondary
          value={currentPage}
          onPageChange={(e, { activePage })=>switchPage(activePage)}
          style={{marginBottom: '40px'}}
        />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default ViewRecipes;
