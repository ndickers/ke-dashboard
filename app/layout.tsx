import "@/app/ui/global.css";
import { inter } from "./ui/fonts";
import { ToastContainer } from "react-toastify";
import SessProvider from "./Providers/SessProvider";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <SessProvider>{children}</SessProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
