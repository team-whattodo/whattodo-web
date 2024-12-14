import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import styles from './layout.module.css';

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-prendard",
  weight: "100 900",
});

const doHyeon = localFont({
  src: "./fonts/DoHyeon-Regular.ttf",
  variable: "--font-dohyeon",
  weight: "100 900",
});

const jua = localFont({
  src: './fonts/Jua-Regular.ttf',
  variable: '--font-jua',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: "왓투두 | 할 일과 개발을 한번에",
  description: "할 일과 개발을 한번에",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} ${doHyeon.variable} ${jua.variable}`}>
        <div className={styles.container}>{children}</div>
      </body>
    </html>
  );
};

export default RootLayout;
