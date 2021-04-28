export default (state=true, action) => {
  switch (action.type) {
  case 'TOGGLE_NEXT':
    return !state;
  default:
    return state;
  };
}
