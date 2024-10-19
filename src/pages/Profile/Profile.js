import { useEffect, useState } from "react";
import styles from "./Profile.module.css";

import { useAuthValue } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

import { Timestamp } from "firebase/firestore";

import { useAuthentication } from "../../hooks/useAuthentication";

const Profile = () => {
  const { user } = useAuthValue();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState("");

  const { id } = useParams();
  // const { document: post } = useFetchDocument("posts", id);

  // const navigate = useNavigate();
  const { updateUser } = useAuthentication();

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!displayName || !email) {
      setFormError("Nome e email são obrigatórios.");
      return;
    }

    const userData = {
      displayName,
      email,
      updatedAt: Timestamp.now(),
    };

    const res = await updateUser(userData);
    console.log(res);
    // navigate("/");
  };

  return (
    <div className={styles.profile_container}>
      <h1>Mais informações sobre seu perfil</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Seu nome:</span>
          <input
            type="text"
            name="displayName"
            required
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
        </label>

        <label>
          <span>Seu email:</span>
          <input
            type="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>

        <button className="btn">Salvar</button>

        {/* {!response.loading && <button className="btn">Salvar</button>}
        {response.loading && (
          <button disabled className="btn">
            Aguarde...
          </button>
        )}

        {response.error && <p className="error">{response.error}</p>} */}
      </form>
    </div>
  );
};

export default Profile;
