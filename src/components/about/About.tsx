import { aboutData } from "./about-data";
import "./about.scss";

const About = () => {
  return (
    <div className="about">
      <div className="about__inner">
        <h1 className="about__title">React portfolio project</h1>
        {aboutData.map((item, index) => (
          <p className="about__item" key={index}>
            <span className="about__name">{item.title}</span>
            {item.link ? (
              <a
                className="about__link"
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.text}
              </a>
            ) : (
              <span className="about__text"> {item.text}</span>
            )}
          </p>
        ))}
      </div>
    </div>
  );
};

export default About;
