import { MessageRecordStore } from "./messageRecord/messageRecordStore";
import { WebSocketStore } from "./socket/webSocketStore";

export class RootStore {
    webSocketStore: WebSocketStore;
    messageRecordStore: MessageRecordStore;

    constructor() {
        this.webSocketStore = new WebSocketStore(this);
        this.messageRecordStore = new MessageRecordStore();
    }
}