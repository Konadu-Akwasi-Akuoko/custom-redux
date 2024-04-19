import { combineReducers, legacy_createStore as createStore } from "redux";
import { bugReducer } from "./reducer";
import { customerReducer } from "./customerReducer";

const rootReducer = combineReducers({
  bugs: bugReducer,
  customers: customerReducer,
});
export const store = createStore(rootReducer);
