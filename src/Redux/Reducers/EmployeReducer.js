import { ActionTypes } from "../Constants/ActionTypes"
import employe_01 from '../../Assets/images/employe_01.jpg'
import employe_02 from '../../Assets/images/employe_02.jpg'
const initialState = {
    employes: [
        // {pseudo_employe:"Employe_item_01",prenom_employe:"Oussama",specialite_employe:"front End",support_divinatoire_employe:"Le Tarot de Marseil",image_employe:employe_01,statut_employe:true},
        // {pseudo_employe:"Employe_item_02",prenom_employe:"Tarik",specialite_employe:"Mathématique",support_divinatoire_employe:"Le Tarot de Paris",image_employe:employe_02,statut_employe:true},
    ]
}

export const employeReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_EMPLOYES:
            return { ...state, employes: payload };
        case ActionTypes.REMOVE_SELECTED_EMPLOYE:
            return {};
        default:
            return state;
    }
}

export const selectedEmployeReducer = (state = [{}], { type, payload }) => {
    switch (type) {
        case ActionTypes.SELECTED_EMPLOYE:
            return { ...state, ...payload };
        default:
            return state;
    }
}