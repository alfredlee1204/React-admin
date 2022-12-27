interface UserAction {
    type:"userInit" |"userInfoUpdate",
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
        case "userInit":
            newState=action.payload
            localStorage.setItem("userInfo",JSON.stringify(action.payload))
            return newState
        case "userInfoUpdate":
            newState={state,...action.payload}
            return newState
        default:
            return state
        } 
}
export const premissionReducer = (state:any=initState,action:PremissionAction) =>{
    // let newState = JSON.parse(JSON.stringify(state))
    switch (action.type){
        case "premissionInit":
            localStorage.setItem("premission",JSON.stringify(action.payload))
            break
        }    

    return state
}