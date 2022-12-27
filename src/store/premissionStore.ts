interface PremissionAction {
    type:"premissionInit",
    val:any
}
const initState = {

}
export const premissionReducer = (state:any=initState,action:PremissionAction) =>{
    // let newState = JSON.parse(JSON.stringify(state))
    switch (action.type){
        case "premissionInit":
            localStorage.setItem("premission",JSON.stringify(action.val))
            break
        }    

    return state
}
