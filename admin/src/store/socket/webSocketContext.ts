import { createContext } from "react";
import { WebSocketStore } from "./webSocketStore";
const webSocketStore = new WebSocketStore()
const WebSocketContext = createContext<WebSocketStore>(webSocketStore);

export default WebSocketContext