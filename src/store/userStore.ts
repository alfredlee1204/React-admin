/*
 * @Descripttion: 
 * @Author: Lethan
 * @Date: 2022-12-26 18:43:19
 * @LastEditors: Lethan
 * @LastEditTime: 2022-12-28 15:08:02
 */
interface UserAction {
    type:"user/init" |"user/update",
    payload:any
}
interface PremissionAction {
    type:"premissionInit",
    payload:any
}
const initState = {

}
export const userReducer = (state:any=initState,action:UserAction) =>{
    let newState
    switch (action.type){
        case "user/init":
            newState=action.payload
            localStorage.setItem("userInfo",JSON.stringify(action.payload))
            return newState
        case "user/update":
            newState={state,...action.payload}
            return newState
        default:
            return state
        } 
}