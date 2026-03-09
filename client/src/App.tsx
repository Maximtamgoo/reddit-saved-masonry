import { useUser } from "./services/queries";
import Header from "./components/Header/Header";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import { GalleryDialog } from "./components/Gallery/GalleryDialog";

export default function App() {
  const { isPending, isError } = useUser();

  if (isPending) return null;

  if (isError) return <LoginPage />;

  return (
    <>
      <Header />
      <GalleryDialog />
      <MainPage />
    </>
  );
}
