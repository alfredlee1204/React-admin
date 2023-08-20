import { createContext } from "react";
import { MessageStore } from "./messageStore";
const messageStore = new MessageStore()
const SocketContext = createContext<MessageStore>(messageStore);

export default SocketContext