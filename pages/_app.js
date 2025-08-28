import SideBar from "@/components/modules/SideBar";
import "@/styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";

export default function App({ Component, pageProps }) {
  return (
    <div className="flex">
      <AuthProvider>
        <SideBar />
        <Component {...pageProps} />
      </AuthProvider>
    </div>
  );
}
