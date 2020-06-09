import { throttle, delay,select, all, put, fork, call, takeEvery} from 'redux-saga/effects';

const getState = state => {
  return state
}

export function* alterValues() {
  const state = yield select(getState)

  yield put( { type : 'ALTER_SECONDARY_VALUES',
    payload : {
      a : state.generic.primaryValues.a * 2,
      b : state.generic.primaryValues.b.map(v => v * 2),
      c : state.generic.primaryValues.c.map(v => v.a * 2)      
    }
  })
}

export default function* rootSaga () {
  yield takeEvery('ALTER_PRIMARY_VALUES', alterValues)
};
