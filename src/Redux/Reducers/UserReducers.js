import { ActionTypes } from "../Constants/ActionTypes"

const intialUser = {
    
}

export const userReducer = (state=intialUser,{type,payload}) => {
    switch (type) {
        case ActionTypes.SET_USER_LOGIN :
            return {...state,login:payload}
        case ActionTypes.REMOVE_SELECTED_UTILISATEUR:
            return {};
        default:
            return state;
    }
}
