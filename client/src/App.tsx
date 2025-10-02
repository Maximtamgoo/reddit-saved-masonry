import { useGetSignedInUser } from "./services/queries";
import Header from "./components/Header/Header";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";

export default function App() {
  const { isPending, isError } = useGetSignedInUser();

  if (isPending) return null;

  if (isError) return <LoginPage />;

  return (
    <>
      <Header />
      <MainPage />
    </>
  );
}
