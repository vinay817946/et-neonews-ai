
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "ET NeoNews AI",
  description: "AI-native business news experience",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
