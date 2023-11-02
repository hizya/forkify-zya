import icon from 'url:../../img/icons.svg';
import View from './View.js';
/* <button class="btn--inline pagination__btn--prev">
<svg class="search__icon">
  <use href="${icon}#icon-arrow-left"></use>
</svg>
<span>Page 1</span>
</button>
<button class="btn--inline pagination__btn--next">
<span>Page 3</span>
<svg class="search__icon">
  <use href="src/img/icons.svg#icon-arrow-right"></use>
</svg>
</button> */
class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');
  _generateMarkup() {
    const numsPage = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const curPage = this._data.page;
    if (curPage === 1 && numsPage > 1) {
      return this._generateMarkupButton('next');
    }
    // Last page
    if (numsPage === curPage && curPage > 1) {
      return this._generateMarkupButton('prev');
    }
    // Other page
    if (curPage < numsPage) {
      return `${this._generateMarkupButton('prev')}
     ${this._generateMarkupButton('next')}`;
    }
    // Page 1, and there are NO other pages
    return ``;
  }
  addhandlerClick(handler) {
    this._parentEl.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
  getCurrentPage() {
    return this._page;
  }
  _generateMarkupButton(dir) {
    const getPoint = dir =>
      dir === 'next' ? this._data.page + 1 : this._data.page - 1;
    // prettier-ignore
    return `<button data-goto="${getPoint(dir)}" class="btn--inline pagination__btn--${dir}">
              <span>Page ${getPoint(dir)}</span>
              <svg class="search__icon">
              <use href="${icon}#icon-arrow-${dir==='next'?'right':'left'}"></use>
              </svg>
            </button>`;
  }
}

export default new PaginationView();
