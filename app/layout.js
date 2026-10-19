import "./globals.css";
import FacebookPixel from "@/components/FacebookPixel";

export const metadata = {
  title: "Acceso Oficial | Plataforma N° 1 de Argentina",
  description: "Configuración de acceso oficial. Sistema 24/7 operativo.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <FacebookPixel />
      </head>
      <body>{children}</body>
    </html>
  );
}
