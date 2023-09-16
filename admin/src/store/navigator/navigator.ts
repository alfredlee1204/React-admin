import { makeAutoObservable } from "mobx";
import { NavigateFunction } from "react-router-dom";

class NavigatorStore {
    constructor() {
        makeAutoObservable(this)
    }

    _navigate: NavigateFunction | null = null

    init = (navigate: NavigateFunction) => {
        this._navigate = navigate;
    }
}

export default NavigatorStore