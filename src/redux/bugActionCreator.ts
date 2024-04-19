import { ADD_BUG, REMOVE_BUG, RESOLVE_BUG } from "./actionTypes";

export function addBug(payload: {
  id: number;
  description: string;
  resolved: boolean;
}) {
  return {
    type: ADD_BUG,
    payload,
  };
}

export function removeBug(payload: { id: number }) {
  return {
    type: REMOVE_BUG,
    payload,
  };
}

export function resolveBug(payload: { id: number }) {
  return {
    type: RESOLVE_BUG,
    payload,
  };
}
