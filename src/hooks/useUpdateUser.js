import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { updateCurrentUser } from "firebase/auth";

const initialState = {
  loading: null,
  error: null,
};

const updateUser = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "UPDATED_USER":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useUpdateUser = (user) => {
  const [response, dispatch] = useReducer(updateUser, initialState);

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const updatedUser = async (id, data) => {
    checkCancelBeforeDispatch({ type: "LOADING" });

    try {
      const userRef = user(db, user, id);

      await updateCurrentUser(userRef, data);

      checkCancelBeforeDispatch({
        type: "UPDATED_USER",
      });
    } catch (error) {
      console.log("deu erro", error);
      checkCancelBeforeDispatch({ type: "ERROR", payload: error.message });
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { updatedUser, response };
};
