import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Header from '@/4 widgets/Header/index';
import Footer from '@/4 widgets/Footer/index';
import Main from '@/4 widgets/Main/index';

import { logger } from '@/5 features/Logger/index.server';
import { CustomError } from '@/5 features/Logger/index';

import './globals.css';

const robotoNormal = localFont({
  src: '../assets/fonts/Roboto.woff',
  variable: '--font-roboto',
});
const futuraCondBold = localFont({
  src: '../assets/fonts/FuturaPTCondBold.otf',
  variable: '--font-futura-pt-cond-bold',
});

export const metadata: Metadata = {
  title: 'Multimedia Case',
  description: 'Multimedia Case',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  try {
    return (
      <html lang="en">
        <body className={`${robotoNormal.variable} ${futuraCondBold.variable}`}>
          <Header />
          <Main>{children}</Main>
          <Footer />
        </body>
      </html>
    );
  } catch (error) {
    logger.info('!!!!!!!!!!!!!!!!!!!!!');
    if (error instanceof CustomError) {
      logger.error(error);
    } else {
      logger.error(
        new CustomError({
          message: 'Unknown error',
        }),
      );
    }
  }
}
