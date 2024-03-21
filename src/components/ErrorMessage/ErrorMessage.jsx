import css from "./ErrorMessage.module.css";

const ErrorMessage = ({ error }) => {
  return <p>{error}</p>;
};

export default ErrorMessage;