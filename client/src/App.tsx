import { useGetSignedInUser } from "./services/queries";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";

export default function App() {
  const { data, isPending, isError } = useGetSignedInUser();

  if (isPending) return null;

  return (
    <>
      <Header username={data?.name} icon_img={data?.icon_img} />
      {isError ? <LoginPage /> : <MainPage />}
    </>
  );
}
