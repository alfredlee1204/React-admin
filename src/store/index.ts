/*
 * @Descripttion: 
 * @Author: Lethan
 * @Date: 2022-12-26 18:43:19
 * @LastEditors: Lethan
 * @LastEditTime: 2022-12-27 17:18:46
 */
import { combineReducers, legacy_createStore } from "redux";
import {userReducer} from "./userStore";
import {premissionReducer} from "./premissionStore";

const rootReducer = combineReducers({
    userReducer,
    premissionReducer
  });
  
export const store = legacy_createStore(rootReducer,(window as any).__REDUX_DEVTOOLS_EXTENSION__&&(window as any).__REDUX_DEVTOOLS_EXTENSION__())

