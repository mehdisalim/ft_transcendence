import  {PlayerInfo} from "./Player-info.js";
import "./Pause-Game.js"

const HeaderTemplate = document.createElement('template');
import { userInfo, opponentInfo } from "/Components/Game/GamePlay/Lobby.js";
HeaderTemplate.innerHTML = /*html*/ `
<link rel="stylesheet" href="/Components/Game/GamePlay/GameTable.css">
<style>
    player-info{
        width: 20%;
            aspect-ratio: 4.2;
            border: 2px solid #00b9be;
            transform: translateY(0%);
            display: grid;
            grid-template-areas: "img player_info scor";
            grid-template-columns: 23.5% 35% 1fr;
        }
        pause-game{
            width: 5%;
            aspect-ratio: 1.5;
        }
</style>
<pause-game></pause-game>
`

export class GameHeader extends HTMLElement{
    constructor(state){
        super();
        this.state = state
        if (this.state == 'offline')
            HeaderTemplate.content.querySelector('pause-game').remove()
        this.appendChild(HeaderTemplate.content.cloneNode(true))
    }
    updateScore(score){
        
        const player = this.querySelector('player-info')
        player.newScore(score.player, userInfo)
        const opponent = this.querySelector('player-info[state="reverse"]')
        opponent.newScore(score.opponent, opponentInfo)
    }
    connectedCallback(){
        if(this.state !== 'offline'){
            const player = new PlayerInfo()
            player.newScore(0, userInfo)
            const opponent = new PlayerInfo()
            opponent.setAttribute('state', 'reverse')
            opponent.newScore(0, opponentInfo)
            this.insertBefore(player, this.querySelector('pause-game'))
            this.appendChild(opponent)
        }
    }
}
