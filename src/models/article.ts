import { StaticImageData } from 'next/image';

interface Article {
  id: string;
  title: string;
  author: string;
  imageSrc: string | StaticImageData;
  createdDate: string;
  description: string;
  content: string;
}

export type { Article };
