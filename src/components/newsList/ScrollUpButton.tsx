import { useEffect, useState } from "react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";

const ScrollUpButton = () => {
  const [scrollUp, setScrollUp] = useState<boolean>(false);

  useEffect(() => {
    const scrollUpHandler = () => {
      const scrollY = window.scrollY;
      setScrollUp(scrollY > 700);
    };

    window.addEventListener('scroll', scrollUpHandler);
    return () => window.removeEventListener('scroll', scrollUpHandler);
  }, []);

  const onBtnUpClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  const btnUpClassName = scrollUp ? 'btn-up' : 'btn-up btn-up_hide';

  return (
    <div className={btnUpClassName} onClick={onBtnUpClick}>
      <BsFillArrowUpCircleFill />
    </div>
  );
};

export default ScrollUpButton