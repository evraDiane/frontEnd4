import { ActionTypes } from "../Constants/ActionTypes"
export const setEmployes = (employes) => {
    return {
        type : ActionTypes.SET_EMPLOYES,
        payload : employes,
    }
}

export const selectedEmploye = (employe) => {
    return {
        type : ActionTypes.SELECTED_EMPLOYE,
        payload : employe,
    }
}
export const removeSelectedEmploye = () => {
    return {
        type : ActionTypes.REMOVE_SELECTED_EMPLOYE,
    }
}