export default (state={stepNumber: 0}, action) => {
  const { stepNumber, type } = action
  switch (type) {
    case 'SET_STEP':
      return { ...state, stepNumber: stepNumber }
    default:
      return state;
  }
}