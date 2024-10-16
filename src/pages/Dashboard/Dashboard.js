// CSS
import styles from "./Dashboard.module.css";

// Router
import { Link } from "react-router-dom";

// Hooks
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";
import { useState } from "react";

const Dashboard = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const { user } = useAuthValue();
  const uid = user.uid;

  const { documents: posts, loading } = useFetchDocuments("posts", null, uid); // Coleta os dados

  const { deleteDocument } = useDeleteDocument("posts"); // Delete o documento escolhido

  if (loading) return <p>Carregando sua Dashboard</p>;

  const openModal = (id) => {
    setPostToDelete(id); // Armazena o ID
    setModalOpen(true); // Abre o modal
  };

  const closeModal = () => {
    setPostToDelete(null); // Reseta o ID
    setModalOpen(false); // Fecha o modal
  };

  const confirmDelete = () => {
    deleteDocument(postToDelete); // Exclui o post
    closeModal(); // Fecha o modal
  };

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <p>Gerencie seus posts</p>

      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>Não foram encontrados posts</p>
          <Link to={"/post/create"} className="btn">
            Criar primeiro post
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.post_header}>
            <span>Título</span>
            <span>Ações</span>
          </div>
          {posts &&
            posts.map((post) => (
              <div key={post.id} className={styles.post_row}>
                <p>{post.title}</p>
                <div className={styles.action}>
                  <Link to={`/posts/${post.id}`} className="btn btn-outline">
                    Ver
                  </Link>
                  <Link
                    to={`/posts/edit/${post.id}`}
                    className="btn btn-outline"
                  >
                    Editar
                  </Link>
                  <button
                    className="btn btn-outline"
                    onClick={() => openModal(post.id)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
        </>
      )}

      {/* Modal de Confirmação */}
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Tem certeza que deseja excluir o post?</h3>
            <div className={styles.modalActions}>
              <button className="btn btn-danger" onClick={confirmDelete}>
                Confirmar
              </button>
              <button className="btn" onClick={closeModal}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
