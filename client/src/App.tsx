import { useGetSignedInUser } from "./services/queries";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
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
