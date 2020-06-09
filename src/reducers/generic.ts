import Constants from '../utils/constants.ts'

export const initialState = {
  primaryValues: {
    a : 1,
    b : [1,2,3],
    c : [{ a: 1 }, { a : 1}]
  },
  secondaryValues : {
    a : null,
    b : null,
    c : null
  }
}

const genericReducer = (state = initialState, action) => {

  switch(action.type) {
    case 'ALTER_PRIMARY_VALUES':
        return Object.assign({}, state,
          { primaryValues : {
            ...state.primaryValues,
            ...action.payload
          }}
        )
      break;

    case 'ALTER_SECONDARY_VALUES':
        return Object.assign({}, state,
          { secondaryValues : {
            ...state.secondaryValues,
            ...action.payload
          }}
        )
      break;

    case 'ALTER_VALUES':
        return Object.assign({}, state, action.payload)
      break;
  }

  return state;
}

export default genericReducer
