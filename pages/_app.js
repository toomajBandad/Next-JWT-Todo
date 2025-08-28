import SideBar from "@/components/modules/SideBar";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="flex">
      <SideBar />
      <Component {...pageProps} />
    </div>
  );
}
