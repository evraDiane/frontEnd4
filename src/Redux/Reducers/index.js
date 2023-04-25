import { combineReducers } from 'redux'
import { employeReducer , selectedEmployeReducer } from './EmployeReducer'
import {  userReducer } from './UserReducers'

const reducers = combineReducers({
    allEmployes : employeReducer,
    employe : selectedEmployeReducer,
    user : userReducer,
})

export default reducers