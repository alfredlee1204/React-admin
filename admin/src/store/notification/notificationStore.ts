import { makeAutoObservable } from "mobx";
import { RootStore } from "../rootStore";

class NotificationStore {
    #root: RootStore;
    premission: NotificationPermission = "default"

    constructor(root: RootStore) {
        this.#root = root;
        makeAutoObservable(this)
    }

    init() {
        Notification.requestPermission((status) => {
            this.premission = status; // 仅当值为 "granted" 时显示通知
        });
    }

    sendNotification({ title, body }: { title: string, body: string }) {
        if (this.premission === "granted") {
            const data = JSON.parse(body)
            const notification = new Notification(title, { body: data.content });
            notification.onclick = () => {
                if (this.#root.navigatorStore._navigate) {
                    this.#root.navigatorStore._navigate('/customerService/user/' + data.user_id)
                }
            };
        }
    }
}

export default NotificationStore