import { getCurrentPlayerData } from "/Utils/GlobalVariables.js";
import { router } from "/root/Router.js";
import { HOST } from "/Utils/GlobalVariables.js";
import { getLeagueColor } from "/Utils/LeaguesData.js";

const ProfileTemplate =  document.createElement('template');


ProfileTemplate.innerHTML = /*html*/`
    <style>
        a{
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .c-hexagon-content {
            width: 100%;
            height: 100%;
        }
    
    </style>
    <a href="/Profile/me">
        <c-hexagon width="110px" height="110px" apply="true" >
            <div slot="content" class="c-hexagon-content"></div>
        </c-hexagon>
        <user-rank> 
            <h2> 2 </h2>
        </user-rank>
    </a>
`
export class Profile extends HTMLElement{  
    constructor(){
        super();
        this.appendChild(ProfileTemplate.content.cloneNode(true))
        this.querySelector('a').addEventListener('click', (event)=>{

            event.preventDefault()
            const url = new URL(this.querySelector('a').href)
            router.handleRoute(url.pathname)
        })
    }

    async connectedCallback() {
        const currentPlayer = await getCurrentPlayerData();
        const profileImage = this.querySelector("c-hexagon");
        const element = this.querySelector(".c-hexagon-content");
        element.style.background = "url(" + HOST + currentPlayer.user.avatar + ") center / cover no-repeat";
        profileImage.bcolor = getLeagueColor(currentPlayer.stats.league);
        const userRank = this.querySelector("user-rank");
        userRank.querySelector("h2").textContent = currentPlayer.stats.rank;
        userRank.bcolor = profileImage.bcolor;
    }

    static observedAttributes = ["profile-image", "league", "rank"];

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName === "profile-image") {
            const element = this.querySelector(".c-hexagon-content");
            element.style.background = "url(" + HOST + newValue + ") center / cover no-repeat";
        }
        else if (attrName === "league") {
            const profileImage = this.querySelector("c-hexagon");
            profileImage.bcolor = getLeagueColor(newValue);
            const userRank = this.querySelector("user-rank");
            userRank.bcolor = profileImage.bcolor;
        }
        else if (attrName === "rank") {
            const userRank = this.querySelector("user-rank");
            userRank.querySelector("h2").textContent = newValue;
        }
    }

    set rank(val) {this.setAttribute("rank", val);}
    get rank() { return this.getAttribute("rank");}

    set league(val) {this.setAttribute("league", val);}
    get league() { return this.getAttribute("league");}

    set profileImage(val) {this.setAttribute("profile-image", val);}
    get profileImage() { return this.getAttribute("profile-image");}
    

}

