// Models
import { Book } from '@/models';

// Constants
import { ImageStore } from '@/constants';

const MOCK_DEFAULT_BOOK_ITEM: Book = {
  id: '1',
  imageSrc: ImageStore.UnavailableImage,
  title: 'Sample Book',
  price: 19.99,
  description: 'A sample book description',
  label: 'Fiction',
  quantity: 10,
  bookInformation: {
    publisher: 'Sample Publisher',
    publishedDate: '2023-01-01',
    language: 'English',
    paperback: 200,
    isbn: '1234567890',
    dimensions: {
      length: 8,
      width: 5,
      height: 1,
    },
  },
};

const MOCK_BOOK_LIST: Book[] = [
  {
    id: '1',
    imageSrc: ImageStore.UnavailableImage,
    title: "Atomic One's",
    price: 23.89,
    description:
      'Dive into the mysteries of quantum mechanics and discover its impact on modern technology.',
    label: 'Printed Books',
    quantity: 10,
    bookInformation: {
      publisher: 'Quantum Press',
      publishedDate: '2022-07-15',
      language: 'English',
      paperback: 320,
      isbn: '978-1111111111',
      dimensions: {
        length: 8.2,
        width: 5.2,
        height: 0.6,
      },
    },
  },
  {
    id: '2',
    imageSrc: ImageStore.UnavailableImage,
    title: "Atomic One's",
    price: 23.89,
    description:
      'An adventurous tale of courage and discovery in uncharted territories.',
    label: 'Printed Books',
    quantity: 8,
    bookInformation: {
      publisher: 'Horizon Publishers',
      publishedDate: '2021-11-10',
      language: 'English',
      paperback: 280,
      isbn: '978-2222222222',
      dimensions: {
        length: 7.8,
        width: 5.0,
        height: 0.7,
      },
    },
  },
  {
    id: '3',
    imageSrc: ImageStore.UnavailableImage,
    title: "Atomic One's",
    price: 23.89,
    description:
      'A poetic journey through the realms of time and space, filled with captivating prose.',
    label: 'Hardcover',
    quantity: 20,
    bookInformation: {
      publisher: 'Eternal Words',
      publishedDate: '2023-04-22',
      language: 'English',
      paperback: 150,
      isbn: '978-3333333333',
      dimensions: {
        length: 8.0,
        width: 5.0,
        height: 0.5,
      },
    },
  },
  {
    id: '4',
    imageSrc: ImageStore.UnavailableImage,
    title: 'The Dark Light',
    price: 23.89,
    description:
      'Explore the duality of light and shadow in this intriguing psychological thriller.',
    label: 'Printed Books',
    quantity: 12,
    bookInformation: {
      publisher: 'Mystery Ink',
      publishedDate: '2023-03-14',
      language: 'English',
      paperback: 340,
      isbn: '978-4444444444',
      dimensions: {
        length: 9.0,
        width: 6.0,
        height: 0.9,
      },
    },
  },
  {
    id: '5',
    imageSrc: ImageStore.UnavailableImage,
    title: 'The Dark Light',
    price: 23.89,
    description:
      'A compelling narrative of the planet’s history and its evolution over billions of years.',
    label: 'Paperback',
    quantity: 15,
    bookInformation: {
      publisher: 'Earth Chronicles',
      publishedDate: '2020-12-01',
      language: 'English',
      paperback: 400,
      isbn: '978-5555555555',
      dimensions: {
        length: 10.0,
        width: 7.0,
        height: 1.0,
      },
    },
  },
  {
    id: '6',
    imageSrc: ImageStore.UnavailableImage,
    title: 'The Dark Light',
    price: 23.89,
    description:
      'Discover the wonders of the cosmos through stunning visuals and thought-provoking narratives.',
    label: 'Printed Books',
    quantity: 18,
    bookInformation: {
      publisher: 'Cosmic Publications',
      publishedDate: '2023-06-30',
      language: 'English',
      paperback: 220,
      isbn: '978-6666666666',
      dimensions: {
        length: 8.5,
        width: 6.0,
        height: 0.8,
      },
    },
  },
];

export { MOCK_DEFAULT_BOOK_ITEM, MOCK_BOOK_LIST };
