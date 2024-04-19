import { ADD_BUG, REMOVE_BUG, RESOLVE_BUG } from "./actionTypes";

export function bugReducer(
  state: { id: number; description: string; resolved: boolean }[] = [],
  action: {
    type: string;
    payload: { id: number; description?: string; resolved?: boolean };
  }
) {
  switch (action.type) {
    case ADD_BUG:
      return [...state, action.payload];
    case REMOVE_BUG:
      return state.filter((bug: any) => bug.id !== action.payload.id);
    case RESOLVE_BUG:
      return state.map((bug: any) =>
        bug.id === action.payload.id ? { ...bug, resolved: true } : bug
      );
    default:
      return state;
  }
}
