import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Spinner from "./Spinner";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isPending, isAuthenticated } = useUser();

  // 2. If there is NO authenticated user, redirect to the /login

  useEffect(() => {
    if (!isAuthenticated && !isPending) navigate("/login");
  }, [isAuthenticated, navigate, isPending]);

  // 3. While loading, show a spinner
  if (isPending)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. If there IS a user, render the app
  if (isAuthenticated) return children;
};

export default ProtectedRoute;
