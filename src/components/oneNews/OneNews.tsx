import  { useEffect, useRef, useMemo } from "react";
import { CSSTransition } from "react-transition-group";
import { newsStore } from "../../store/newsStore";
import "./oneNews.scss";

const OneNews = () => {
  const news = newsStore.use.selectedNews();
  const nodeRef = useRef(null);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  const processHtmlContent = (html: string): string => {
    if (!html) return "";

    let processedHtml = html.replace(
      /(src|href)=["']\.\.\/([^"']+)["']/g,
      (match, attribute, path) => {
        return `${attribute}="https://www.mmobomb.com/${path}"`;
      },
    );

    processedHtml = processedHtml.replace(
      /<a\s+(.*?)href="([^"]+)"(.*?)>/gi,
      '<a $1href="$2" target="_blank" rel="noopener noreferrer" $3>',
    );

    return processedHtml;
  };

  const processedContent = useMemo(() => {
    return processHtmlContent(news.article_content);
  }, [news.article_content]);

  return (
    <CSSTransition
      classNames="transition"
      nodeRef={nodeRef}
      in
      timeout={200}
      appear
    >
      <article className="certain-news" ref={nodeRef}>
        <div className="container">
          <div className="certain-news__header">
            <h3 className="certain-news__title">{news.title}</h3>
            <p className="certain-news__desc">{news.short_description}</p>
          </div>
          <div
            className="certain-news__content"
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />
        </div>
      </article>
    </CSSTransition>
  );
};

export default OneNews;
