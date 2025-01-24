import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function NotFound(): null {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/", { replace: true });
  }, [navigate]);

  return null;
}
