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
    title: 'Atomic Revolution',
    price: 24.99,
    description:
      'Delve into the fascinating world of quantum mechanics and discover its profound impact on modern science, technology, and daily life. From the mysteries of subatomic particles to groundbreaking applications in computing and medicine, this book unveils a revolutionary field reshaping our understanding of reality.',
    label: 'Printed Books',
    quantity: 10,
    bookInformation: {
      publisher: 'Quantum Horizons Press',
      publishedDate: '2023-05-18',
      language: 'English',
      paperback: 350,
      isbn: '978-1250812121',
      dimensions: {
        length: 8.2,
        width: 5.5,
        height: 0.9,
      },
    },
  },
  {
    id: '2',
    imageSrc: ImageStore.UnavailableImage,
    title: 'Pathfinders',
    price: 22.49,
    description:
      'Follow the extraordinary journeys of explorers and pioneers who pushed beyond known boundaries to uncover the hidden corners of the world. This compelling narrative combines adventure, history, and a deep dive into human curiosity and resilience.',
    label: 'Paperback',
    quantity: 8,
    bookInformation: {
      publisher: 'Horizon Explorers',
      publishedDate: '2022-09-12',
      language: 'English',
      paperback: 312,
      isbn: '978-1982151123',
      dimensions: {
        length: 7.9,
        width: 5.2,
        height: 0.8,
      },
    },
  },
  {
    id: '3',
    imageSrc: ImageStore.UnavailableImage,
    title: 'Time Whisper',
    price: 26.5,
    description:
      'A poetic exploration of the intricate relationship between time, space, and human existence. This thought-provoking book takes readers on a journey through the fabric of the cosmos, blending scientific insights with philosophical reflections to inspire awe and wonder.',
    label: 'Hardcover',
    quantity: 20,
    bookInformation: {
      publisher: 'Eternal Wordsmiths',
      publishedDate: '2024-01-08',
      language: 'English',
      paperback: 288,
      isbn: '978-0525559211',
      dimensions: {
        length: 8.1,
        width: 5.5,
        height: 0.9,
      },
    },
  },
  {
    id: '4',
    imageSrc: ImageStore.UnavailableImage,
    title: 'Shadows Within',
    price: 21.95,
    description:
      'An in-depth psychological exploration of the duality within the human mind. This book examines the interplay between light and shadow, hope and despair, and the struggles we face in navigating our inner worlds. A must-read for anyone interested in personal growth and understanding human behavior.',
    label: 'Printed Books',
    quantity: 12,
    bookInformation: {
      publisher: 'Mystic Ink',
      publishedDate: '2023-11-22',
      language: 'English',
      paperback: 370,
      isbn: '978-0671027032',
      dimensions: {
        length: 9.0,
        width: 6.0,
        height: 1.1,
      },
    },
  },
  {
    id: '5',
    imageSrc: ImageStore.UnavailableImage,
    title: 'Earth Story',
    price: 29.99,
    description:
      'A captivating tale of Earth’s evolution over 4.5 billion years. From its fiery origins to the lush planet we call home today, this book offers a compelling look at the geological and biological processes that shaped our world, enriched with vivid illustrations and insights from leading scientists.',
    label: 'Paperback',
    quantity: 15,
    bookInformation: {
      publisher: 'Chronicle Earth',
      publishedDate: '2021-03-15',
      language: 'English',
      paperback: 432,
      isbn: '978-0300246666',
      dimensions: {
        length: 10.5,
        width: 7.5,
        height: 1.2,
      },
    },
  },
  {
    id: '6',
    imageSrc: ImageStore.UnavailableImage,
    title: 'Cosmic Wonders',
    price: 34.5,
    description:
      'Embark on a breathtaking journey through the universe with this beautifully illustrated guide to celestial phenomena. Featuring stunning imagery and engaging storytelling, it explores the mysteries of galaxies, stars, and planets while providing insights into our place in the cosmos.',
    label: 'Printed Books',
    quantity: 18,
    bookInformation: {
      publisher: 'Celestial Press',
      publishedDate: '2023-06-15',
      language: 'English',
      paperback: 298,
      isbn: '978-1250237231',
      dimensions: {
        length: 8.6,
        width: 6.4,
        height: 0.9,
      },
    },
  },
  {
    id: '7',
    imageSrc: ImageStore.UnavailableImage,
    title: 'Digital Dawn',
    price: 19.99,
    description:
      'Explore how digital technology is revolutionizing our world in this thought-provoking book. From artificial intelligence to blockchain, it examines the innovations driving change across industries and society, offering readers a roadmap to thrive in the new digital age.',
    label: 'E-books',
    quantity: 50,
    bookInformation: {
      publisher: 'Tech Pioneers',
      publishedDate: '2023-01-12',
      language: 'English',
      paperback: 200,
      isbn: '978-1981104123',
      dimensions: {
        length: 6.5,
        width: 4.2,
        height: 0.7,
      },
    },
  },
  {
    id: '8',
    imageSrc: ImageStore.UnavailableImage,
    title: 'Mind Matters',
    price: 27.99,
    description:
      'This groundbreaking book offers a fresh perspective on how the human brain processes information and makes decisions. Drawing on cutting-edge neuroscience research, it delves into the mechanisms behind memory, perception, and emotions, empowering readers to unlock their cognitive potential.',
    label: 'Printed Books',
    quantity: 25,
    bookInformation: {
      publisher: 'Neuromind Press',
      publishedDate: '2023-07-22',
      language: 'English',
      paperback: 320,
      isbn: '978-1501230213',
      dimensions: {
        length: 8.2,
        width: 5.5,
        height: 0.8,
      },
    },
  },
  {
    id: '9',
    imageSrc: ImageStore.UnavailableImage,
    title: 'Future Visions',
    price: 23.45,
    description:
      'Take a visionary look into the future through scientifically grounded predictions about the next big breakthroughs in technology, health, and sustainability. This book combines expert analysis with imaginative storytelling to offer a roadmap for the years ahead.',
    label: 'Paperback',
    quantity: 10,
    bookInformation: {
      publisher: 'Visionary Press',
      publishedDate: '2022-11-15',
      language: 'English',
      paperback: 275,
      isbn: '978-1251124132',
      dimensions: {
        length: 7.8,
        width: 5.3,
        height: 0.9,
      },
    },
  },
  {
    id: '10',
    imageSrc: ImageStore.UnavailableImage,
    title: 'Hidden Realms',
    price: 32.99,
    description:
      'Discover the strange and mysterious worlds that lie beyond human understanding. From lost civilizations to unexplored natural wonders, this book uncovers the hidden corners of our planet and challenges the boundaries of what we think we know.',
    label: 'Hardcover',
    quantity: 30,
    bookInformation: {
      publisher: 'Mystic Explorers',
      publishedDate: '2024-02-10',
      language: 'English',
      paperback: 350,
      isbn: '978-1101224312',
      dimensions: {
        length: 9.1,
        width: 6.1,
        height: 1.2,
      },
    },
  },
];

export { MOCK_DEFAULT_BOOK_ITEM, MOCK_BOOK_LIST };
