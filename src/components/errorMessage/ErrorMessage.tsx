import "./errorMessage.scss";

export function ErrorMessage() {
  return (
    <p className="error-message">
      «Сервер временно не отвечает. Это может быть связано с региональными
      ограничениями. <br /> Пожалуйста, повторите попытку позже или используйте
      VPN»
    </p>
  );
}

export function ErrorMessageSmall() {
  return (
    <div className="error">
      <span className="error-text-1">Something Went Wrong!</span>
      <span className="error-text">Please refresh page to load data</span>
    </div>
  );
}
