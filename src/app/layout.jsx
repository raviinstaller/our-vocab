import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { WordContextProvider } from "@/providers/WordsProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Let's create our Vocabulary together.",
  description:
    "Here we can add the words that we learn daily, doesn't matter if its in any video or book.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WordContextProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </WordContextProvider>
      </body>
    </html>
  );
}
