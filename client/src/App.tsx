import { useGetSignedInUser } from "./services/queries";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";

export default function App() {
  const { isPending, isError } = useGetSignedInUser();

  if (isPending) return null;

  return (
    <>
      <Header />
      {isError ? <LoginPage /> : <MainPage />}
    </>
  );
}
