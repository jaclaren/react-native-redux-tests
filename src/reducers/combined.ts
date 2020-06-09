import { combineReducers } from 'redux'
import genericReducer from './generic.ts'

export const allReducers = combineReducers(
  {
    generic : genericReducer
})
