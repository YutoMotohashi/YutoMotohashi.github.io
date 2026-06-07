export const siteUrl = 'https://yutomotohashi.github.io';
export const defaultTitle = 'Yuto Motohashi | 本橋悠人';
export const defaultDescription = 'Official webpage of Yuto Motohashi. Discover the work of Yuto Motohashi, a quantum engineer specializing in trapped ion quantum computers. Learn about my research, publications, and contributions to quantum computing. | 本橋悠人の公式ウェブサイトです。イオントラップ方式の量子コンピュータを専門とする量子エンジニアです。研究内容、発表論文をご覧ください';

export function createPageMetadata(pathname, overrides = {}) {
  return {
    title: overrides.title ?? defaultTitle,
    description: overrides.description ?? defaultDescription,
    alternates: {
      canonical: pathname,
    },
  };
}

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: defaultTitle,
  description: defaultDescription,
  verification: {
    google: 'fCEFYasOakKKA_2EZiHN0QmJTZq1Nju5N3XWzCYKrfw',
  },
};
