import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  //cleanup
  //deal with memory leak

  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  //function to register a user
  const createUser = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(null);

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = response.user;

      await updateProfile(user, {
        displayName: data.displayName,
      });

      return user;
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      let systemErrorMessage;

      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "Esse email já está cadastrado.";
      } else {
        systemErrorMessage = "Algo deu errado, tente novamente mais tarde.";
      }

      setError(systemErrorMessage);
    } finally {
      setLoading(false);
    }
  };

  //function to sign up

  const loginUser = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(null);

    try {
      const res = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = res.user;

      return user;
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      let systemErrorMessage;

      if (error.message.includes("user-not-found")) {
        systemErrorMessage = "Usuário não encontrado.";
      } else if (error.message.includes("invalid")) {
        systemErrorMessage = "Email ou senha incorretas.";
      } else {
        systemErrorMessage = "Algo deu errado :/";
      }

      setError(systemErrorMessage);
    } finally {
      setLoading(false);
    }
  };

  //function to logout
  const logout = () => {
    checkIfIsCancelled();

    signOut(auth);
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    loginUser,
  };
};
