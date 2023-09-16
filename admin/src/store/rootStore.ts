import { MessageRecordStore } from "./messageRecord/messageRecordStore";
import NavigatorStore from "./navigator/navigator";
import NotificationStore from "./notification/notificationStore";
import { WebSocketStore } from "./socket/webSocketStore";

export class RootStore {
    webSocketStore: WebSocketStore;
    messageRecordStore: MessageRecordStore;
    notificationStore: NotificationStore;
    navigatorStore: NavigatorStore;

    constructor() {
        this.webSocketStore = new WebSocketStore(this);
        this.messageRecordStore = new MessageRecordStore();
        this.notificationStore = new NotificationStore(this);
        this.navigatorStore = new NavigatorStore();
    }
}