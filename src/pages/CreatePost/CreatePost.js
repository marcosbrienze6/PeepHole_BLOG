import { useState } from "react";
import styles from "./CreatePost.module.css";

import { useAuthValue } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { Timestamp } from "firebase/firestore";

const CreatePost = () => {
  const [title, setTitle] = useState("");

  const [media, setMedia] = useState("");

  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();

  const navigate = useNavigate();

  const { insertDocument, response } = useInsertDocument("posts");

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormError("");

    if (!title || !media || !body || !tags) {
      setFormError("Por favor, preencha todos os campos.");
      return;
    }

    if (!media.startsWith("http://") && !media.startsWith("https://")) {
      setFormError(
        "A URL da mídia precisa começar com 'http://' ou 'https://'."
      );
      return;
    }
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    let mediaType = "";
    try {
      const mediaURL = new URL(media);

      if (
        mediaURL.pathname.match(/\.(mp4|webm|ogg)$/) ||
        media.includes("youtube.com") ||
        media.includes("youtu.be")
      ) {
        mediaType = "video";
        console.log("É um vídeo");
      } else {
        mediaType = "image";
        console.log("É uma imagem");
      }
    } catch (error) {
      setFormError("A URL da mídia precisa ser válida.");
      return;
    }

    if (formError) return;

    insertDocument({
      title,
      media,
      mediaType,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
      createdAt: Timestamp.now(),
    });

    navigate("/");
  };
  return (
    <div className={styles.create_post}>
      <h2>Comente sobre algo</h2>
      <p>Dê uma espiada, e fale o que quiser</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="title"
            required
            placeholder="Pense num título bom"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>

        <label>
          <span>URL da imagem ou video:</span>
          <input
            type="text"
            name="media"
            required
            placeholder="Coloque a URL"
            onChange={(e) => setMedia(e.target.value)}
            value={media}
          />
        </label>

        <label>
          <span>Conteúdo:</span>
          <textarea
            name="body"
            required
            value={body}
            placeholder="Insira o conteúdo do post"
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </label>

        <label>
          <span>TAGS:</span>
          <input
            type="text"
            name="tags"
            required
            placeholder="Separe as tags por vírgula"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>

        {!response.loading && <button className="btn">Criar post</button>}
        {response.loading && (
          <button disabled className="btn">
            Aguarde...
          </button>
        )}

        {response.error && <p className="error">{response.error}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
