import { ADD_BUG, ADD_USER, REMOVE_BUG, REMOVE_USER, RESOLVE_BUG } from "./actionTypes";
import { store } from "./store";

const unsubscribe = store.subscribe(() => {
  console.log("Store changed!", store.getState());
});

store.dispatch({
  type: ADD_BUG,
  payload: { id: 1, description: "Bug 1", resolved: false },
});

store.dispatch({
    type: ADD_USER,
    payload: { name: "John Doe", age: 25, id: 1 },
})

store.dispatch({
  type: ADD_BUG,
  payload: { id: 2, description: "Bug 2", resolved: false },
});

store.dispatch({
    type: ADD_USER,
    payload: { name: "Jane Doe", age: 22, id: 2 },
})

store.dispatch({
    type: REMOVE_USER,
    payload: { id: 1 },
})

store.dispatch({
  type: RESOLVE_BUG,
  payload: { id: 1 },
});


store.dispatch({
  type: REMOVE_BUG,
  payload: { id: 2 },
});

unsubscribe();
