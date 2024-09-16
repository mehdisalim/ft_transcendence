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
    constructor(){
        super();
        this.appendChild(HeaderTemplate.content.cloneNode(true))
    }
    updateScore(score){
        
        const player = this.querySelector('player-info')
        player.newScore(score.player, userInfo)
        const opponent = this.querySelector('player-info[state="reverse"]')
        opponent.newScore(score.opponent, opponentInfo)
        // console.log('update : ', score);
        // const player1 = this.querySelector('.playerscor')
        // const player1Img = this.querySelector('.GamePlayer')
        // const player1Name = this.querySelector('.playerinfo')
        // player1.querySelector('h1').textContent = score.player
        // player1Img.src = userInfo.picture;
        // player1Name.querySelector('p').textContent = userInfo.username

        // const player2 = this.querySelector('.playerscor1')
        // const player2Img = this.querySelector('.GamePlayer1')
        // const player2Name = this.querySelector('.playerinfo1')
        // player2.querySelector('h1').textContent = score.opponent
        // player2Img.src = opponentInfo.picture;
        // console.log(player1Name);
        // console.log(player2Name);
        // player2Name.querySelector('p').textContent = opponentInfo.username
    }
    connectedCallback(){
        const player = new PlayerInfo()
        player.newScore(0, userInfo)
        this.insertBefore(player, this.querySelector('pause-game'))
        const opponent = new PlayerInfo()
        opponent.setAttribute('state', 'reverse')
        opponent.newScore(0, opponentInfo)
        this.appendChild(opponent)
    }
}
