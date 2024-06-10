import { useEffect } from "react";
import { useAuth } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";

function isProtected({ children }) {
  const { isAuthenticated } = useAuth();
  const Navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) Navigate("/");
    },
    [isAuthenticated, Navigate]
  );

  return isAuthenticated ? children : null;
}
export default isProtected;
