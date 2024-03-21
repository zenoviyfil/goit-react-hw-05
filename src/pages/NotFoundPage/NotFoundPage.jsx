import css from './NotFoundPage.module.css'
import { useRef } from 'react';
import { Link, useLocation } from "react-router-dom";

const NotFoundPage = () => {
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? "/");

  return (
    <div>
      <h1>404</h1>
      <h2>PAGE NOT FOUND</h2>
      <Link to={backLinkRef.current}>Get Out of Here</Link>

    </div>
  )
}

export default NotFoundPage