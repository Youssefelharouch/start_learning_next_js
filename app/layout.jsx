import Navbar from "../components/Navbar";
import { orbitron } from "./fonts";
import "./globals.css";

export const metadata = {
  title:{
    default:'Indie Gamer',
    template:'%s | Indie Gamer',
  },  
  description:'Only the best indie games',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={orbitron.variable}>
      <body className="bg-orange-50 flex flex-col px-4 min-h-screen gap-2  py-2">
        <header>
          <Navbar />
        </header>
        <main className="grow py-3">{children}</main>
        <footer className="border-t py-3 text-center text-slate-500 text-xs">
          Game data and images courtesy of {' '}
          <a
            href="https://rawg.io/"
            target="_blank"
            className="text-orange-800 hover:underline"
          >
            RAWG
          </a>
        </footer>
      </body>
    </html>
  );
}
