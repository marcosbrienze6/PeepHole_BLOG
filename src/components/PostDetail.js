import { useState } from "react";
import styles from "./PostDetail.module.css";
import { Link } from "react-router-dom";

const PostDetail = ({ post }) => {
  // Função para formatar a URL do YouTube para o formato de embed

  const [isVideoLoaded, setVideoLoaded] = useState(false);

  const getYouTubeEmbedUrl = (url) => {
    const youtubeRegex =
      /(youtu\.be\/|youtube\.com\/(watch\?v=|embed\/|v\/|shorts\/))([\w]{11})/;
    const match = url.match(youtubeRegex);
    return match ? `https://www.youtube.com/embed/${match[3]}` : null;
  };

  return (
    <div className={styles.post_detail}>
      <h2>{post.title}</h2>
      <div>
        {post.mediaType === "image" ? (
          <img src={post.media} alt={post.title}></img>
        ) : isVideoLoaded ? (
          <iframe
            width="560"
            height="315"
            src={getYouTubeEmbedUrl(post.media)}
            title={post.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          ></iframe>
        ) : (
          <button className="btn" onClick={() => setVideoLoaded(true)}>
            Carregar vídeo
          </button>
        )}
      </div>
      <p>{post.body}</p>
      <p className={styles.createdby}>por: {post.createdBy}</p>
      <div className={styles.tags}>
        {post.tags.map((tag) => (
          <p key={tag}>
            <span>#</span>
            {tag}
          </p>
        ))}
      </div>
      <Link to={`/posts/${post.id}`} className="btn btn-outline">
        Ir para os comentários
      </Link>
    </div>
  );
};

export default PostDetail;
