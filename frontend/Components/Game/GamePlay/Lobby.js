import { PlayerBorder } from "/Components/Game/GamePlay/PlayerBorder.js";
import { GameHeader } from "/Components/Game/GamePlay/GameHeader.js"
import { GameTable } from "/Components/Game/GamePlay/GameTable.js"
import { getCurrentPlayerData, HOST, PROFILE_API_URL, wsUrl, TOURNAMENT_API_URL } from "/Utils/GlobalVariables.js";
import { getApiData } from "/Utils/APIManager.js";
import { router } from "/root/Router.js";
import { displayToast } from "/Components/CustomElements/CustomToast.js";
import { hideFriendsRequestList, hideRightSideBar } from "/Components/Header/header-bar.js";
import { closeAndRemovePlayerFromTournament } from "/Utils/TournamentWebSocketManager.js";
import { isTokenValid } from "/root/fetchWithToken.js";

const lobby = document.createElement('template');
const playerSlot = document.createElement('template');
const opponentSlot = document.createElement('template');
const AiGameTemplate = document.createElement('template');
const OnlineGameTemplate = document.createElement('template');
const timer = document.createElement('template')
let searching_images = [
	{
		picture: HOST + `/media/defaults/ace.jpeg`,
		username: 'ACE'
	},
	{
		picture: HOST + `/media/defaults/aizen.jpeg`,
		username: 'AIZEN'
	},
	{
		picture: HOST + `/media/defaults/fshiguro.jpeg`,
		username: 'FUSHIGURO'
	},
	{
		picture: HOST + `/media/defaults/toji.jpeg`,
		username: 'TOJI'
	},
	{
		picture: HOST + `/media/defaults/zuro.jpeg`,
		username: 'ZURO'
	}
]

export let userInfo = {
	picture: HOST + `/media/defaults/ace.jpeg`,
	username: 'Player1',
	color: 'white',
}

export let opponentInfo = {
	picture: HOST + `/media/defaults/ace.jpeg`,
	username: 'Player2',
	color: 'black',
}

playerSlot.innerHTML = /*html*/ `
	<slot  name="PlayerImg" slot="Player"> </slot>
	<slot  name="PlayerName" slot="Name"> </slot>
`

AiGameTemplate.innerHTML = /*html*/ `
	<link rel="stylesheet" href="/Components/Game/GamePlay/AiLobby.css">
	<img id='Player' class="Player" slot="PlayerImg" alt="Player" />
	<h1 id='NPlayer' class="Name" slot="PlayerName"></h1>
	<h1 id='Opponent' class="Opponent" slot="searshing"></h1>
	<h1 id='NOpponent' class="Name" slot="OpponentName"></h1>
`

OnlineGameTemplate.innerHTML = /*html*/ `
	<link rel="stylesheet" href="/Components/Game/GamePlay/OnlineGameLobby.css">
	<div class="searshingImgs" slot="searshing">
		<img id='Opponent1' class="PlayerS" alt="searchingImg"/>
		<img id='Opponent2' class="PlayerS" alt="searchingImg"/>
		<img id='Opponent3' class="PlayerS" alt="searchingImg"/>
		<img id='Opponent4' class="PlayerS" alt="searchingImg"/>
		<img id='Opponent5' class="PlayerS" alt="searchingImg"/>
	</div>

	<img id='Player' class="Player" slot="PlayerImg" alt="" />
	<h1 id='NPlayer' class="Name" slot="PlayerName"></h1>
`

opponentSlot.innerHTML = /*html*/ `

	<slot  name="searshing" slot="searching"> </slot>
	<slot name="OpponentName" slot="Name"></slot>
	`

lobby.innerHTML =  /* html */ `
	<link rel="stylesheet" href="/Components/Game/GamePlay/Lobby.css">
	<page-name width="35%">
		<div slot="text" class="pageNameText">
			<h1>MATCH MAKING</h1>
		</div>
	</page-name>

	<div class="VS">
	</div>
	<div class="lines"></div>
	`



export class Lobby extends HTMLElement{
	tournament_id;
	beforeunloadFunction;
	get tournament_id() {return this.tournament_id;}



	constructor(opponentId, time, tournament_id){
		super();
		this.socket = null;
		this.time = -1;
		this.beforeunloadFunction = async function (e) {
			e.preventDefault();
			e.returnValue = '';
			if (tournament_id && tournament_id !== 'null' && tournament_id !== 'undefined')
			{
				const xhr = new XMLHttpRequest();
				const accessToken = localStorage.getItem('accessToken');
				if (!accessToken || !(await isTokenValid(accessToken))) {
					console.log("Access token is missing.");
					return null;
				}
				xhr.open('POST', `${TOURNAMENT_API_URL}tournament/${tournament_id}/player/leave/`, true);
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
				xhr.send();
			}
		};
		window.addEventListener('beforeunload', this.beforeunloadFunction);
		userInfo.username = 'Player1';
		userInfo.picture = HOST + `/media/defaults/ace.jpeg`;
		opponentInfo.username = 'Player2';
		opponentInfo.picture = HOST + `/media/defaults/ace.jpeg`;
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(lobby.content.cloneNode(true));
		this.setSlots(playerSlot.content, 'false')
		this.setSlots(opponentSlot.content, 'true')
		this.game_shrink_interval = setInterval(() => {
			clearInterval(this.game_shrink_interval);
			document.body.classList.toggle('body-game-shrink', true);
		}, 1000);
		this.headerAnimation();
		this.sidebarAnimation();
		this.footerAnimation();
		document.body.querySelector('.alerts').style.display = 'none';
		hideRightSideBar();
		hideFriendsRequestList();
		if(opponentId && time)
		{
			this.time = time;
			this.OnlineGame(opponentId);
		}
	}
	footerAnimation(){
		const footerBar = document.body.querySelector('footer-bar');
		footerBar.setExitEventListeners();
	}
	headerAnimation(){
		const headerBar = document.body.querySelector('header-bar');
		this.header_interval = headerBar.headerUp();
	}

	sidebarAnimation(){
		const sideBar = document.body.querySelector('side-bar');
		const Buttons = sideBar.shadowRoot.querySelector('.buttons');
		const clickedButtons = Buttons.querySelector('.on');
	
		sideBar.classList.toggle('transform-1s', true);
		sideBar.classList.toggle('left', true);
		if(clickedButtons)
			clickedButtons.classList.toggle('on', false);
		sideBar.classList.toggle('p-animation', true);
		this.sid_bar_Intirval = setInterval(() => {
			clearInterval(this.sid_bar_Intirval);
			sideBar.shadowRoot.innerHTML = '';
			sideBar.classList.toggle('left', false);
		}, 1000);
	}

	setSlots(template, revers){
		const border = new PlayerBorder();

		border.setAttribute('revers', revers);
		border.appendChild(template.cloneNode(true))
		this.shadowRoot.appendChild(border.cloneNode(true))
	}
	async getData(str)
	{
		try{
			const response = await fetch(str);
			if(response.ok)
				return response.json();
			throw new Error("cant recive anything")
		}
		catch(error){
			console.log(error)
		}
	}

	async openSocket(userId){
		this.socket = new WebSocket(`${wsUrl}ws/matchmaking/${userId}/`);
		this.socket.onopen = (e) => {
		};
		const startTime = new Date().getTime();

		this.socket.onmessage = (e) => {
			var data = JSON.parse(e.data).message;
			if (Number(data.user_1) === userId) {
				this.set_player_interval = setInterval(() => {
					clearInterval(this.set_player_interval);
					this.setPlayer(data.user_2)
				}, 5000);
				this.game_mode_interval = setInterval(() => {
					clearInterval(this.game_mode_interval);
					this.gameMode(data.room_group_name)
				}, 6000);
			} else if (Number(data.user_2) === userId) {
				this.set_player_interval = setInterval(() => {
					clearInterval(this.set_player_interval);
					this.setPlayer(data.user_1)
				}, 5000);
				this.game_mode_interval = setInterval(() => {
					clearInterval(this.game_mode_interval);
					this.gameMode(data.room_group_name)
				}, 6000);
			} else {
				this.time = data.time;
				this.updateTimer();
			}
		};
		this.socket.onclose = (e) => {
			this.socket = null;
			this.remove();
		};
		this.socket.onerror = (e) => {
			displayToast("error", "You are Already Playing");

		};
	}

	async setSearchImages(){
		let delay = 0; 
		const turnTime = 1;
		const Players = OnlineGameTemplate.content.querySelectorAll('.PlayerS');
		let delayNumber = (turnTime / 2) / Players.length;
		Players.forEach((element, index)=>{
			element.style.animationDelay = `${delay}s`;
			element.style.setProperty('--dest', ((Players.length - 1) * 100) + '%');
			element.style.setProperty('--numsec', turnTime);
			element.src = searching_images[index].picture;
			delay += delayNumber;
		})
	}

	async OnlineGame(opponentId)
	{
		const user_data = await getCurrentPlayerData();
		userInfo.id = user_data.id;
		userInfo.picture = HOST + user_data.user.avatar;
		userInfo.username = user_data.user.username;
		const root = document.querySelector('root-content');
		const p_img = OnlineGameTemplate.content.getElementById('Player');
		const p_h1 = OnlineGameTemplate.content.getElementById('NPlayer');
		p_img.src = userInfo.picture;
		p_h1.textContent = userInfo.username;
		if(!opponentId){
			await this.setSearchImages();
			this.open_socket_interval = setInterval(async () => {
				clearInterval(this.open_socket_interval);
				await this.openSocket(userInfo.id);
			}, 1500);
			this.appendChild(OnlineGameTemplate.content.cloneNode(true));
		}
		else {
			this.appendChild(OnlineGameTemplate.content.cloneNode(true));
			await this.setPlayer(opponentId);
			let room_group_name;
			if(opponentId > userInfo.id)
				room_group_name = 'game_' + userInfo.id + '_' + opponentId;
			else
				room_group_name = 'game_' + opponentId + '_' + userInfo.id;
			this.inter = setInterval(() => {
				this.time -= 1;
				if(this.time <= 0)
					clearInterval(this.inter);
				this.updateTimer();
			}, 1000);
			this.gameMode(room_group_name);
		}
		root.innerHTML = ``;
		root.appendChild(this);
	}
	OflineGame(){
		const root = document.querySelector('root-content')
		this.shadowRoot.innerHTML = ``;
		root.innerHTML = ``;
		root.appendChild(this);
		this.interval = setInterval(() => {
			clearInterval(this.interval)
			this.time = 0;
			this.playeGame('offline', '', false)
		}, 1000);
	}
	async setPlayer(opponentId){
		const h1 = document.createElement('h1');
		const Players = this.querySelectorAll('.PlayerS');
		const turnTime = 10;
		let delay = 0;
		let delayNumber = (turnTime / 2) / Players.length;
		const opponent = await getApiData(PROFILE_API_URL + `${opponentId}/`);
		opponentInfo.id = opponentId;
		opponentInfo.picture = HOST + opponent.user.avatar;
		opponentInfo.username = opponent.user.username;
		h1.id = 'NOpponent';
		h1.classList = 'Name';
		h1.slot = 'OpponentName';
		h1.textContent = opponentInfo.username;
		Players[0].src = opponentInfo.picture
		Players.forEach((element)=>{
			element.style.animationDelay = `${delay}s`;
			element.style.setProperty('--numsec', turnTime);
			element.style.setProperty('--dest', ((Players.length - 1) * 100) + '%');
			element.style.opacity = '1';
			delay += delayNumber;
		})
		this.appendChild(h1.cloneNode(true));
	}
	async SinglePlayer()
	{
		const root = document.querySelector('root-content')
		const p_img = AiGameTemplate.content.getElementById('Player')
		const p_h1 = AiGameTemplate.content.getElementById('NPlayer')
		const o_img = AiGameTemplate.content.getElementById('Opponent')
		const o_h1 = AiGameTemplate.content.getElementById('NOpponent')
		const user_data = await getCurrentPlayerData();
		userInfo.id = user_data.id;
		userInfo.picture = HOST + user_data.user.avatar;
		userInfo.username = user_data.user.username;
		p_h1.textContent = userInfo.username;
		p_img.src = userInfo.picture;
		o_img.textContent = 'AI';
		o_h1.textContent = 'AI';
		this.createTimer('coming soon');
		this.appendChild(AiGameTemplate.content.cloneNode(true));
		this.createTimer('comming soon');
		root.innerHTML = ``;
		root.appendChild(this);
	}
	async playeGame(state, room_group_name, save){
		clearInterval(this.interval)
		clearInterval(this.set_player_interval);
		let game_play = undefined; 
		if(this.state !== 'offline')
			game_play = await getApiData(HOST + `/game/game_play/`);
		const header = new GameHeader(state);
		const game = new GameTable(state, room_group_name, game_play, save);
		const root = document.body.querySelector('root-content');
		const headerBar = document.body.querySelector('header-bar');

		headerBar.classList.toggle('up-100', false);
		
		headerBar.innerHTML = '';
		headerBar.appendChild(header);
		root.innerHTML = ``;
		game.id = this.tournament_id;
		root.appendChild(game);
	}
	gameMode(room_group_name){
		if (this.socket)
			this.socket.send(JSON.stringify({'message': 'start'}));
		const PlayerS = this.querySelectorAll('.PlayerS')
		PlayerS.forEach((element, index)=>{
			if(index !== 0)
				element.remove()
			else{
				element.style.animation = 'none';
				if(this.time == -1)
					this.createTimer(4);
				else
					this.createTimer(this.time);
				this.countdown = setInterval(async()=>{
				if(this.time <= 0){
					if(this.socket){
						this.socket.onclose = async (e) => {
							this.socket = null;
							await this.playeGame(undefined, room_group_name, true);
						};
						if(this.socket)
							this.socket.close();
					}
					else
						await this.playeGame(undefined, room_group_name, false);
					clearInterval(this.countdown)
				}
				},1000)
			}
		})
	}
	createTimer(time){
		timer.innerHTML = /*html*/ `
			<link rel="stylesheet", href="/Components/Game/GamePlay/Timer.css">
			<div class="descounter">
				<h1>${time}</h1>
			</div>
		`
		this.shadowRoot.appendChild(timer.content.cloneNode(true));
	}
	updateTimer(){
		const h1 = this.shadowRoot.querySelector('.descounter h1');
		h1.textContent = this.time;
	}
	async disconnectedCallback(){
		clearInterval(this.inter)
		clearInterval(this.countdown)
		clearInterval(this.interval)
		clearInterval(this.set_player_interval);
		clearInterval(this.game_mode_interval);
		clearInterval(this.game_shrink_interval);
		clearInterval(this.open_socket_interval);
		clearInterval(this.header_interval);
		clearInterval(this.sid_bar_Intirval);
		window.removeEventListener('beforeunload', this.beforeunloadFunction);
		// Close WebSocket and remove the player
		router.randred = false;
		if(this.time > 0 || this.time === -1){
			if(this.socket)
				this.socket.close();
			if (this.tournament_id && this.tournament_id != 'null' && this.tournament_id != 'undefined')
				await closeAndRemovePlayerFromTournament(this.tournament_id)
			router.handleRoute(window.location.pathname);
		}
	}
}

