export function reducer(state: any = [], action: { type: string; payload: any }) {
  switch (action.type) {
    case "ADD_BUG":
      return [...state, action.payload];
    case "REMOVE_BUG":
      return state.filter((bug: any) => bug.id !== action.payload.id);
    case "RESOLVE_BUG":
      return state.map((bug: any) =>
        bug.id === action.payload.id ? { ...bug, resolved: true } : bug
      );
    default:
      return state;
  }
}
