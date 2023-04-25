import { ActionTypes } from "../Constants/ActionTypes"

export const setUserLogin = (login) => {
    return {
        type: ActionTypes.SET_USER_LOGIN,
        payload : login
    }
}
export const setConv= (members) => {
    return {
        type: ActionTypes.SET_CONVERSATION,
        payload : members
    }
}
export const setMess = (message) => {
    return {
        type: ActionTypes.SET_MESSAGE,
        payload : message
    }
}

export const setProfilerUtilisatuer = (user) => {
    return {
        type : ActionTypes.SET_PROFILE_UTILISATEUR,
        payload : user,
    }
}

export const removeSelectedUtilisateur = () => {
    return {
        type : ActionTypes.REMOVE_SELECTED_UTILISATEUR,
    }
}
