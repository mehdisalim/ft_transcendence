// const SearchTemplate = document.createElement('template');

const SearchTemplate = `
    <div class="search-bar">
        <img draggable="false" class="search-icon" src="./images/svg-header/search.svg">
        <div class="vertical-line"></div>
        <input type="text" class="search-input" placeholder="SEARCH">
    </div>
`;

class SearchBar extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = SearchTemplate;
        // const element = this.attachShadow({mode : 'close'})
        // element.appendChild(SearchTemplate.content)
    }
}

customElements.define('search-bar', SearchBar);

export { SearchBar };
