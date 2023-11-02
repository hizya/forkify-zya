import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarks.js';
import bookmarks from './views/bookmarks.js';
import addRecipeView from './views/addRecipeView.js';
import { MODEL_CLOSE_SEC } from './config.js';

// Do try to change this one!!!!! keep that in your mind!!!!!
const controlReceipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // updatet the list of the results
    resultsView.update(model.getSearchResultsPage());

    bookmarksView.update(model.state.bookmarks);

    // update the list of bookmarks

    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
    // 2) render the recipe page

    console.log('recipe', model.state.recipe);
  } catch (err) {
    console.error(`${err} 💥💥💥`);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    resultsView.renderSpinner();
    await model.loadSearchResults(query);
    resultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
  } catch (error) {
    console.error(error);
    resultsView.renderError();
  }
};

const controlPaginations = function (page) {
  resultsView.render(model.getSearchResultsPage(page));
  paginationView.render(model.state.search);
};

const controlRecipeServings = function (servings) {
  model.updateServings(servings);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  console.log(model.state.recipe.bookmarked);
  if (!model.state.recipe.bookmarked) model.addBookmarks(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);
  recipeView.update(model.state.recipe);

  bookmarksView.render(model.state.bookmarks);
};

const controlRenderBookmark = function () {
  bookmarks.render(model.state.bookmarks);
};

const controlFormUpload = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // render the recipe
    recipeView.render(model.state.recipe);

    // render bookmark view
    bookmarks.render(model.state.bookmarks);

    // Change the URL id
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // display the success message
    addRecipeView.renderMessage();

    // close the form
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODEL_CLOSE_SEC * 1000);
  } catch (error) {
    console.error(`${error} 💥💥💥💥`);
    addRecipeView.renderError(error.message);
  }
};

const init = function () {
  bookmarks.addHandlerRender(controlRenderBookmark);
  recipeView.addHandlerRender(controlReceipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addhandlerClick(controlPaginations);
  recipeView.addHandlerUpdatingServings(controlRecipeServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  addRecipeView.addHandlerUpload(controlFormUpload);
};
init();
