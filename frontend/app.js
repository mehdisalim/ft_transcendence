import { ChatComponent } from "./ChatComponents/ChatComponent.js";
import { ChatItemComponent } from "./ChatComponents/ChatList/ChatItemComponent.js";
import { ChatListComponent } from "./ChatComponents/ChatList/ChatListComponent.js";
import { ChatFooterComponent } from "./ChatComponents/ChatRoom/ChatFooterComponent.js";
import { ChatHeaderComponent } from "./ChatComponents/ChatRoom/ChatHeaderComponent.js";
import { ChatRoomComponent } from "./ChatComponents/ChatRoom/ChatRoomComponent.js";
import { FriendItemComponent } from "./ChatComponents/Friends/FriendItemComponent.js";
import { FriendsListComponent } from "./ChatComponents/Friends/FriendsListComponent.js";
import { CoverComponent } from "./ProfileComponents/CoverComponent.js";
import { CustomGraph } from "./ProfileComponents/GraphComponent/CustomGraph.js";
import { ProfileComponent } from "./ProfileComponents/ProfileComponent.js";
import { CustomProgressBar } from "./ProfileComponents/StatsComponents/LeagueComponents/CustomProgressBar.js";
import { LeagueInfo } from "./ProfileComponents/StatsComponents/LeagueComponents/LeagueInfo.js";
import { LeagueItem } from "./ProfileComponents/StatsComponents/LeagueComponents/LeagueItem.js";
import { RecordComponent } from "./ProfileComponents/StatsComponents/RecordMatchesComponents/RecordComponent.js";
import { StatsContainer } from "./ProfileComponents/StatsComponents/StatsContainer.js";
import { DateComponent } from "./ProfileComponents/TableComponents/BodyComponents/Date/DateComponent.js";
import { CustomTable } from "./ProfileComponents/TableComponents/CustomTable.js";
import { AchievementComponent } from "./ProfileComponents/UserInfosComponents/AchievementComponent.js";
import { LinkComponent } from "./ProfileComponents/UserInfosComponents/LinkComponent.js";
import { ProfileInfoComponent } from "./ProfileComponents/UserInfosComponents/ProfileInfoComponent.js";
import { UserInfoComponent } from "./ProfileComponents/UserInfosComponents/UserInfoComponent.js";
import { UserInfoContainerComponent } from "./ProfileComponents/UserInfosComponents/UserInfoContainer.js";

customElements.define("chat-footer", ChatFooterComponent);
customElements.define("chat-header", ChatHeaderComponent);
customElements.define("chat-room", ChatRoomComponent);
customElements.define("friend-item", FriendItemComponent);
customElements.define("friends-list", FriendsListComponent);
customElements.define("chat-item", ChatItemComponent);
customElements.define("chat-list", ChatListComponent);
customElements.define("chat-page", ChatComponent);
customElements.define("cover-component", CoverComponent);
customElements.define("profile-info-component", ProfileInfoComponent);
customElements.define("user-info-component", UserInfoComponent);
customElements.define("link-component", LinkComponent);
customElements.define("achievement-component", AchievementComponent);
customElements.define("user-info-container", UserInfoContainerComponent);
customElements.define("league-item", LeagueItem);
customElements.define("custom-progress-bar", CustomProgressBar);
customElements.define("record-component", RecordComponent);
customElements.define("league-info", LeagueInfo);
customElements.define("stats-container", StatsContainer);
customElements.define("custom-graph", CustomGraph);
customElements.define("date-component", DateComponent);
window.customElements.define("custom-table", CustomTable);
window.customElements.define("profile-component", ProfileComponent);