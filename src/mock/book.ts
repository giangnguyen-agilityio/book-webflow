// Models
import { Book } from '@/models';

// Constants
import { ImageStore } from '@/constants';

const MOCK_DEFAULT_BOOK_ITEM: Book = {
  id: '1',
  imageSrc: ImageStore.ErrorImage,
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

export { MOCK_DEFAULT_BOOK_ITEM };
