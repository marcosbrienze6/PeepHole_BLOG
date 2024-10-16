//CSS
import { Link } from "react-router-dom";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.about}>
      <h3>
        Um pouco mais sobre a Peep <span>HOLE</span>
      </h3>
      <p>Projeto feito com React no front-end e Firebase no back-end.</p>
      <Link className="btn" to={"/posts/create"}>
        Criar post
      </Link>
    </div>
  );
};

export default About;
