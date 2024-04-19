import { ADD_USER, REMOVE_USER } from "./actionTypes";

export function customerReducer(
  state: { name: string; age: number; id: number }[] = [],
  action: { type: string; payload: { name?: string; age?: number; id: number } }
) {
  switch (action.type) {
    case ADD_USER:
      return [...state, { ...action.payload }];
    case REMOVE_USER:
      return state.filter((user: any) => user.id !== action.payload.id);
    default:
      return state;
  }
}
