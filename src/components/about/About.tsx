import "./about.scss";

const About = () => {
  return (
    <div className="about">
      <div className="about__inner">
        <h1 className="about__title">React portfolio project</h1>
        <p className="about__item">
          GitHub:{" "}
          <a
            className="about__link"
            href="https://github.com/Evgenyloy/gamePortal"
            target="_blank"
            rel="noreferrer"
          >
            Game Portal
          </a>
        </p>
        <p className="about__item">
          API:{" "}
          <a
            className="about__link"
            href="https://rapidapi.com/digiwalls/api/mmo-games"
            target="_blank"
            rel="noopener noreferrer"
          >
            MMO Games
          </a>
        </p>
        <p className="about__item">
          Additional libraries:{" "}
          <span>
            {" "}
            Zustand, TanStack Query, React Router 6, React Transition Group
          </span>
        </p>
      </div>
    </div>
  );
};

export default About;
