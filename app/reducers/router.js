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
  let newState = Object.assign({}, state);
  switch (action.state) {
    case 'PUSH':
      for (let i = 0;i < newState.routerStack.length;i++) {
        if (newState.routerStack[i] == action.payload) {
          let t = newState.routerStack[i];
          newState.routerStack[i] = newState.routerStack[newState.routerStack.length - 1];
          newState.routerStack[newState.routerStack.length - 1] = t;
          return newState;
        }
      }
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
      } else {
        newState.canPop = false;
      }
      return newState;
    default:
      return newState;
  }
}
