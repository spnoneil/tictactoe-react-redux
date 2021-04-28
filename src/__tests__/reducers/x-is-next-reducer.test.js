import xIsNextReducer from '../../reducers/x-is-next-reducer';

describe('xIsNextReducer', () => {
  test('Should return default state if there is no action type passed into the reducer', () => {
    expect(xIsNextReducer(true, { type: null })).toEqual(true);
  });

  test('Should toggle xIsNext state to false', () => {
    expect(xIsNextReducer(true, { type: 'TOGGLE_NEXT' })).toEqual(false);
  });
});
