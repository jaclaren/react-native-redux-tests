import SagaTester from 'redux-saga-tester';

import combineReducers from '../src/reducers/combined.ts'
import genericReducer from '../src/reducers/generic.ts'
import rootSaga from '../src/sagas/generic.ts'
import {alterValues} from '../src/actions/generic.ts'

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

const middlewareMeta = 'MIDDLEWARE_TEST';

const middleware = store => next => action => next({
    ...action,
    meta : middlewareMeta
});

test('with redux-saga-tester', async () => {
  const sagaTester = new SagaTester({
    generic : { ...initialState },
    reducers: { generic : genericReducer },
    middlewares : [middleware]
  });

  sagaTester.start(rootSaga);

  const newA = 55;

  sagaTester.dispatch({ type : 'ALTER_PRIMARY_VALUES', payload : { a : newA }});

  await sagaTester.waitFor('ALTER_PRIMARY_VALUES');
  await sagaTester.waitFor('ALTER_SECONDARY_VALUES');

  expect(sagaTester.getState().generic).toEqual({
    primaryValues : Object.assign({}, initialState.primaryValues, { a: newA }),
    secondaryValues : {
      a : newA * 2,
      b : initialState.primaryValues.b.map(v => v * 2),
      c : initialState.primaryValues.c.map(v => v.a * 2)
    }
  });
});
