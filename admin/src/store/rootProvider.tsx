/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { RootStore } from "./rootStore";

const RootContext = createContext<RootStore>({} as RootStore);

export function useRootStore() {
    return useContext(RootContext);
}

export const useWebSocket = () => {
    return useRootStore().webSocketStore
}

export const useNavigateMobx = () => {
    return useRootStore().navigatorStore
}

export const useMessage = () => {
    return useRootStore().messageRecordStore
}

export function RootStoreProvider({ children }: { children: JSX.Element }) {
    const rootStore: RootStore = new RootStore();
    return (
        <RootContext.Provider value={rootStore}>{children}</RootContext.Provider>
    );
}