// Game
import { Lobby } from "./Components/Game/GamePlay/Lobby.js"
import { Buttons } from "./Components/Game/GamePlay/buttons.js"
import { SinglePlayer } from './Components/Game/GamePlay/SinglePlayer/SinglePlayerCart.js'
import { MultiPlayer } from './Components/Game/GamePlay/MultiPlayer/MultiPlayerCart.js'
import { OnlineGame } from './Components/Game/GamePlay/GameOnline/OnlineGameCart.js'
import { PageName } from "./Components/Game/GamePlay/PageName.js";
import { PlayerBorder } from "./Components/Game/GamePlay/PlayerBorder.js";
import { LaunchingGame } from './Components/Game/GamePlay/launchingGame.js'
import { GameTable } from './Components/Game/GamePlay/GameTable.js'
import { GameHeader } from './Components/Game/GamePlay/GameHeader.js'
import { GameOver } from './Components/Game/GamePlay/GameOver.js';
import { GameSelection } from './Components/Game/GameSelection.js'

import { HeaderBar } from './Components/Header/header-bar.js'
import { SearchBar } from './Components/Header/Search-bar.js'
import { UserRank } from './Components/Header/UserRank.js'
import { Hexagon } from './Components/Header/hexagon.js'
import { Profile } from './Components/Header/profile.js'

import { SideBarButtonIcons } from './Components/side-bar/sb-icon.js'
import { SideBarButtonText } from './Components/side-bar/sb-text.js'
import { SideBarButton } from './Components/side-bar/sb-button.js'
import { CustomButton } from "./Components/Tournament/CustomButton.js";
import { TournamentComponent } from "./Components/Tournament/TournamentComponent.js";

import { SettingsComponent } from "./Components/Settings/SettingsComponent.js"

import { createWebSocketsForTournaments } from "./Utils/TournamentWebSocketManager.js";



customElements.define("header-bar", HeaderBar)
customElements.define("sb-button", SideBarButton)
customElements.define('sb-text',SideBarButtonText)
customElements.define('sb-icon',SideBarButtonIcons)
customElements.define('c-hexagon',Hexagon)
customElements.define('search-bar', SearchBar);
customElements.define('c-profile', Profile)
customElements.define('user-rank',UserRank)
customElements.define('game-over', GameOver)
customElements.define('game-table', GameTable)
customElements.define('launching-game', LaunchingGame)
customElements.define('game-header', GameHeader)
customElements.define('page-name',PageName)
customElements.define('player-border',PlayerBorder)
customElements.define('game-lobby', Lobby)
customElements.define("single-player", SinglePlayer)
customElements.define("multi-player", MultiPlayer)
customElements.define("online-game", OnlineGame)
customElements.define('c-button', Buttons)
customElements.define('game-selection', GameSelection)

createWebSocketsForTournaments();
import SignupPage from "./User/SignupPage.js";
import LoginPage from "./User/LoginPage.js";
import EmailConf from "./User/EmailConf.js";
import OAuth from "./User/Oauth.js";
import { router } from './root/Router.js';


customElements.define("signup-page", SignupPage);
customElements.define("login-page", LoginPage);
customElements.define("email-page", EmailConf);
customElements.define("oauth-callback", OAuth);

document.addEventListener('DOMContentLoaded', (event) => {
    window.addEventListener("popstate", () =>
        router.handleRoute(window.location.pathname)
    );
});