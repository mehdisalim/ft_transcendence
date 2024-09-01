export class OthersSearchSection extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <div class="search-sections">
                <h2 class="result-section-title">OTHERS</h2>
                <div class="result-section-content">
                    <div class="item">
                        <div class="profile-item">
                            <p>SETTINGS</p>
                        </div>
                        <div class="search-actions">
                            <img src="../../assets/icons/arrow-forward-icon.svg" class="read-message" width="32px" height="32px"></img>
                        </div>
                    </div>
                    <div class="item">
                        <div class="profile-item">
                            <p>CHAT</p>
                        </div>
                        <div class="search-actions">
                            <img src="../../assets/icons/arrow-forward-icon.svg" class="read-message" width="32px" height="32px"></img>
                        </div>
                    </div>
                    <div class="item">
                        <div class="profile-item">
                            <p>PROFILE</p>
                        </div>
                        <div class="search-actions">
                            <img src="../../assets/icons/arrow-forward-icon.svg" class="read-message" width="32px" height="32px"></img>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    connectedCallback() {

    }
}

customElements.define("others-search-section", OthersSearchSection);