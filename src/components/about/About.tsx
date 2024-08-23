import './about.scss';

const About = () => {
  return (
    <div className="about">
      <div className="about__inner">
        <h1 className="about__title">React educational project</h1>
        <p className="about__item">
          gitHub:{' '}
          <a
            className="about__link"
            href="https://github.com/Evgenyloy/gamePortal"
            target="_blank"
            rel="noreferrer"
          >
            gamePortal
          </a>
        </p>
        <p className="about__item">
          api:{' '}
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
          additional libraries:{' '}
          <span> redux, react router 6, RTK Query, react transition group</span>
        </p>
      </div>
    </div>
  );
};

export default About;
