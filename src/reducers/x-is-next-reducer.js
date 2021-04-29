export default (state={xIsNext: true}, action) => {
  switch (action.type) {
  case 'TOGGLE_NEXT':
    return { ...state, xIsNext: !state.xIsNext };
  case 'NEXT_PLAYER':
    return { ...state, xIsNext: action.xIsNext };
  default:
    return state;
  };
}

// export default (state=true, action) => {
//   switch (action.type) {
//   case 'TOGGLE_NEXT':
//     return !state;
//   default:
//     return state;
//   };
// }
