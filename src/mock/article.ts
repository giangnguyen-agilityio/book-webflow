// Models
import { Article } from '@/models';

// Constants
import { ImageStore } from '@/constants';

const MOCK_ARTICLE_LIST: Article[] = [
  {
    id: '1',
    title: 'The Future of Artificial Intelligence in Healthcare',
    author: 'Dr. Emily Chen',
    imageSrc: ImageStore.UnavailableImage,
    createdDate: '2023-05-15',
    description:
      'Exploring the potential impact of AI on medical diagnosis and treatment.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: '2',
    title: 'Sustainable Urban Planning: Building Green Cities',
    author: 'Michael Rodriguez',
    imageSrc: ImageStore.UnavailableImage,
    createdDate: '2023-07-22',
    description:
      'Innovative approaches to creating environmentally friendly urban spaces.',
    content:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    id: '3',
    title: 'The Rise of Quantum Computing',
    author: 'Dr. Sarah Johnson',
    imageSrc: ImageStore.UnavailableImage,
    createdDate: '2023-09-03',
    description:
      'Understanding the potential of quantum computers to revolutionize data processing.',
    content:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    id: '4',
    title: 'Cybersecurity in the Age of IoT',
    author: 'Alex Thompson',
    imageSrc: ImageStore.UnavailableImage,
    createdDate: '2023-11-18',
    description:
      'Addressing security challenges in the growing Internet of Things ecosystem.',
    content:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: '5',
    title: 'The Psychology of Social Media Addiction',
    author: 'Dr. Lisa Patel',
    imageSrc: ImageStore.UnavailableImage,
    createdDate: '2024-01-07',
    description:
      'Examining the mental health impacts of excessive social media use.',
    content:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
  },
  {
    id: '6',
    title: 'Renewable Energy: Powering the Future',
    author: 'David Wilson',
    imageSrc: ImageStore.UnavailableImage,
    createdDate: '2024-02-29',
    description:
      'Advancements in solar, wind, and other sustainable energy technologies.',
    content:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos.',
  },
  {
    id: '7',
    title: 'The Ethics of Gene Editing',
    author: 'Prof. Maria Garcia',
    imageSrc: ImageStore.UnavailableImage,
    createdDate: '2023-06-11',
    description:
      'Debating the moral implications of CRISPR and other genetic modification techniques.',
    content:
      'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
  },
  {
    id: '8',
    title: 'Machine Learning in Financial Markets',
    author: 'James Lee',
    imageSrc: ImageStore.UnavailableImage,
    createdDate: '2023-08-19',
    description:
      'How AI is transforming stock trading and investment strategies.',
    content:
      'Sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
  },
  {
    id: '9',
    title: 'The Neuroscience of Creativity',
    author: 'Dr. Rachel Brown',
    imageSrc: ImageStore.UnavailableImage,
    createdDate: '2023-10-05',
    description:
      'Unraveling the brain processes behind innovative thinking and artistic expression.',
    content:
      'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.',
  },
  {
    id: '10',
    title: 'Space Tourism: The Next Frontier',
    author: 'Chris Anderson',
    imageSrc: ImageStore.UnavailableImage,
    createdDate: '2023-12-30',
    description:
      'Exploring the possibilities and challenges of commercial space travel.',
    content:
      'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.',
  },
  {
    id: '11',
    title: 'The Future of Work: Remote and AI-Assisted',
    author: 'Emma Taylor',
    imageSrc: ImageStore.UnavailableImage,
    createdDate: '2024-02-14',
    description:
      'Predicting how technology will reshape the workplace in the coming decades.',
    content:
      'Vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos.',
  },
  {
    id: '12',
    title: 'Blockchain Beyond Cryptocurrency',
    author: 'Daniel Kim',
    imageSrc: ImageStore.UnavailableImage,
    createdDate: '2023-04-01',
    description:
      'Innovative applications of blockchain technology in various industries.',
    content:
      'Ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint.',
  },
];

export { MOCK_ARTICLE_LIST };
