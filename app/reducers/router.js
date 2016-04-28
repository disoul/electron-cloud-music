'use strict'
import HomeContent from '../components/HomeContent.jsx';

export default function router(state, action) {
  if (action.type !== 'ROUTER') {
    if (state) {
      return state;
    } else {
      return {
        // default content
        routerStack: [HomeContent],
        canPop: false,
      };
    }
  }
  newState = Object.assign({}, state);
  switch (action.state) {
    case 'PUSH':
      newState.routerStack.push(action.payload);
      if (newState.routerStack.length > 1) {
        newState.canPop = true;
      }
      return newState;
    case 'POP':
      if (newState.routerStack.length > 1) {
        newState.routerStack.pop();
      }
      if (newState.routerStack.length > 1) {
        newState.canPop = true;
      }
      return newState;
    default:
      return newState;
  }
}
