interface UserAction {
    type:"userInit" |"updateUserInfo",
    val:any
}

let reducer = (state:any,action:UserAction) =>{
    // let newState = JSON.parse(JSON.stringify(state))
    switch (action.type){
        case "userInit":
            localStorage.setItem("userInfo",JSON.stringify(action.val))
            break
        }

    return state
}

export default reducer