//CSS
import styles from "./Navbar.module.css";

//Hooks
import { useAuthentication } from "../hooks/useAuthentication";
import { useAuthValue } from "../context/AuthContext";

//React Router
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const { user } = useAuthValue();

  const { logout } = useAuthentication();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const navigate = useNavigate();

  const handleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const goToProfile = () => {
    setModalIsOpen(false);

    navigate("/profile");
  };

  return (
    <nav className={styles.navbar}>
      <NavLink to={"/"} className={styles.brand}>
        Peep<span>Hole</span>
      </NavLink>
      <ul className={styles.links_list}>
        <li>
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li>
          <NavLink to={"/about"}>About</NavLink>
        </li>
        {/* LOGIN/CADASTRO */}
        {!user && (
          <>
            <li>
              <NavLink to={"/login"}>Login</NavLink>
            </li>
            <li>
              <NavLink to={"/register"}>Register</NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink to={"/posts/create"}>Postar</NavLink>
            </li>
            <li>
              <NavLink to={"/dashboard"}>Meus posts</NavLink>
            </li>
          </>
        )}

        {user && (
          <>
            <li>
              <NavLink>
                <button onClick={handleModal}>Eu{modalIsOpen ? "" : ""}</button>

                {modalIsOpen && (
                  <div className={styles.modal}>
                    <div className={styles.modalContent}>
                      <NavLink to={"/profile"}>
                        <button onClick={goToProfile}>Ver meu perfil</button>
                      </NavLink>
                    </div>
                  </div>
                )}
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <li>
            <button onClick={logout}>Sair</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
