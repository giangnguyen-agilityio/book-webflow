import { StaticImageData } from 'next/image';

export interface Book {
  id: string;
  imageSrc: string | StaticImageData;
  title: string;
  price: number;
  description: string;
  label: string;
  quantity: number;
  bookInformation: {
    publisher: string;
    publishedDate: string;
    language: string;
    paperback: number;
    isbn: string;
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
  };
}
