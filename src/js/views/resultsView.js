import previewView from './previewView.js';
import View from '../views/View.js';

class ResultsVIew extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again ;)'; //should be an intrintic property of the view itself
  _message = '';
  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value;
    this._parentEl.querySelector('.search__field').value = '';
    return query;
  }
  _generateMarkup() {
    return this._data.map(recipe => previewView.render(recipe, false)).join('');
  }
  addHandlerSearch(handler) {
    this._parentEl
      .querySelector('.search__btn')
      .addEventListener('click', e => {
        e.preventDefault();
        handler();
      });
  }
}

export default new ResultsVIew();
