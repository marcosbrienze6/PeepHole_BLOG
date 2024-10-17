import styles from "./Profile.module.css";

//Hooks
import { useAuthValue } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import { useParams } from "react-router-dom";
const Profile = () => {
  const { user } = useAuthValue();

  const { id } = useParams();

  const { updatedUser, response } = useUpdateUser("users");

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");

  const handleUpdateUser = () => {
    const data = {
      displayName,
      email,
    };
    updatedUser(id, data);
  };

  return (
    <div className={styles.profile_container}>
      <h1>Mais informações sobre sua conta</h1>

      <div className={styles.row}>
        <h2>Seu nome:</h2>
        <span>{user.displayName}</span>

        {!response.loading && <button className="btn">Editar</button>}
        {response.loading && (
          <button onClick={handleUpdateUser} disabled className="btn">
            Aguarde...
          </button>
        )}
      </div>

      <div className={styles.row}>
        <h2>Seu email:</h2>
        <span>{user.email}</span>

        {!response.loading && <button className="btn">Editar</button>}
        {response.loading && (
          <button onClick={handleUpdateUser} disabled className="btn">
            Aguarde...
          </button>
        )}
      </div>

      <h2>Sua foto de perfil:</h2>
      <div className={styles.noimage}>Sem imagem de perfil</div>

      {/* {img.lenght === 0 ? (
        <div className={styles.noimage}>Sem imagem de perfil</div>
      ) : (
        <img />
      )} */}
    </div>
  );
};

export default Profile;
