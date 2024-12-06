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
      'This article explores how artificial intelligence is transforming healthcare by enhancing diagnostic accuracy, streamlining administrative processes, and personalizing patient care.',
    content:
      'Artificial intelligence (AI) is revolutionizing the healthcare industry, promising faster and more accurate medical diagnoses, optimized treatment plans, and improved patient outcomes. From leveraging machine learning algorithms to identify disease patterns in medical imaging to deploying AI-powered chatbots for patient interaction, the integration of AI is driving efficiency and accessibility. However, its adoption also raises ethical concerns about data privacy, job displacement, and the risk of biased algorithms. In this article, we delve into the multifaceted impact of AI in healthcare and discuss the challenges and opportunities it presents for medical professionals and patients alike.',
  },
  {
    id: '2',
    title: 'Sustainable Urban Planning: Building Green Cities',
    author: 'Michael Rodriguez',
    imageSrc: ImageStore.UnavailableImage,
    createdDate: '2023-07-22',
    description:
      'An in-depth look at sustainable urban development strategies, including green infrastructure, renewable energy integration, and eco-friendly building practices.',
    content:
      'As urban populations continue to grow, the need for sustainable city planning becomes increasingly critical. This article examines innovative approaches such as vertical forests, smart grids, and eco-districts designed to minimize environmental impact while enhancing the quality of urban life. By incorporating renewable energy sources, improving public transportation systems, and preserving natural habitats within city limits, planners are redefining what it means to live in harmony with nature. Learn how cities around the world are adopting green practices to combat climate change and promote sustainable growth.',
  },
  {
    id: '3',
    title: 'The Rise of Quantum Computing',
    author: 'Dr. Sarah Johnson',
    imageSrc: ImageStore.UnavailableImage,
    createdDate: '2023-09-03',
    description:
      'A comprehensive guide to understanding quantum computing and its potential to solve complex problems beyond the capabilities of classical computers.',
    content:
      'Quantum computing represents a paradigm shift in how we process and analyze data. Unlike classical computers that use bits, quantum computers leverage qubits, which can exist in multiple states simultaneously. This unique capability enables them to perform calculations at unprecedented speeds, solving problems in cryptography, material science, and artificial intelligence. In this article, we discuss the principles of quantum mechanics that underpin this technology, its current limitations, and the industries poised for transformation as quantum computing becomes a practical reality.',
  },
  {
    id: '4',
    title: 'Cybersecurity in the Age of IoT',
    author: 'Alex Thompson',
    imageSrc: ImageStore.UnavailableImage,
    createdDate: '2023-11-18',
    description:
      'An examination of the security challenges posed by the Internet of Things and strategies to mitigate risks.',
    content:
      'The Internet of Things (IoT) has connected billions of devices, from smart home systems to industrial equipment, creating a seamless digital ecosystem. However, this connectivity also introduces significant security vulnerabilities, including unauthorized access, data breaches, and malware attacks. This article explores the key threats facing IoT networks and outlines best practices for safeguarding these systems. Topics include device authentication, network encryption, and the role of artificial intelligence in threat detection and response.',
  },
  {
    id: '5',
    title: 'The Psychology of Social Media Addiction',
    author: 'Dr. Lisa Patel',
    imageSrc: ImageStore.UnavailableImage,
    createdDate: '2024-01-07',
    description:
      'Exploring the mental health implications of excessive social media use and strategies for fostering healthy online habits.',
    content:
      'Social media platforms are designed to capture and hold our attention, often leading to addictive behaviors. This article delves into the psychological mechanisms behind social media addiction, including the role of dopamine and the impact of curated content on self-esteem. We also examine the negative effects of excessive use, such as anxiety, depression, and social isolation. Finally, practical tips for setting boundaries and promoting mindful social media use are provided to help readers achieve a healthier digital balance.',
  },
  {
    id: '6',
    title: 'Renewable Energy: Powering the Future',
    author: 'David Wilson',
    imageSrc: ImageStore.UnavailableImage,
    createdDate: '2024-02-29',
    description:
      'Discovering the latest advancements in renewable energy technologies and their potential to drive global sustainability.',
    content:
      'The shift toward renewable energy sources such as solar, wind, and hydropower is essential for combating climate change and reducing our reliance on fossil fuels. In this article, we highlight groundbreaking innovations, including floating solar farms, next-generation wind turbines, and energy storage solutions. We also discuss the economic and environmental benefits of transitioning to renewable energy, as well as the challenges associated with scaling these technologies for widespread adoption.',
  },
  {
    id: '7',
    title: 'The Ethics of Gene Editing',
    author: 'Prof. Maria Garcia',
    imageSrc: ImageStore.UnavailableImage,
    createdDate: '2023-06-11',
    description:
      'Debating the moral and societal implications of using technologies like CRISPR for genetic modification.',
    content:
      'Gene editing technologies like CRISPR have opened the door to unprecedented possibilities, from curing genetic disorders to enhancing human capabilities. However, these advancements also raise profound ethical questions. Should we allow genetic modifications for non-medical purposes? What are the long-term effects of altering the human genome? This article explores these complex issues, balancing the promise of scientific progress with the need for ethical guidelines to prevent misuse.',
  },
  {
    id: '8',
    title: 'Machine Learning in Financial Markets',
    author: 'James Lee',
    imageSrc: ImageStore.UnavailableImage,
    createdDate: '2023-08-19',
    description:
      'An analysis of how machine learning is transforming stock trading, risk assessment, and financial decision-making.',
    content:
      'Machine learning has become a game-changer in financial markets, enabling traders and analysts to process vast amounts of data and uncover hidden patterns. From algorithmic trading strategies to predictive models for risk management, AI-driven tools are reshaping the financial landscape. This article examines the applications of machine learning in finance, the challenges of model interpretability, and the ethical considerations surrounding AI-driven decision-making in high-stakes environments.',
  },
  {
    id: '9',
    title: 'The Neuroscience of Creativity',
    author: 'Dr. Rachel Brown',
    imageSrc: ImageStore.UnavailableImage,
    createdDate: '2023-10-05',
    description:
      'Unraveling the brain mechanisms that drive creative thinking and how to harness them for innovation.',
    content:
      'Creativity is one of the most fascinating aspects of human cognition, involving a complex interplay between various brain regions. This article explores the neuroscience behind creative processes, including the role of the prefrontal cortex, the default mode network, and dopamine pathways. We also provide practical insights into how individuals can enhance their creativity through activities such as meditation, brainstorming, and exposure to diverse perspectives.',
  },
  {
    id: '10',
    title: 'Space Tourism: The Next Frontier',
    author: 'Chris Anderson',
    imageSrc: ImageStore.UnavailableImage,
    createdDate: '2023-12-30',
    description:
      'An exploration of the emerging space tourism industry and its potential to make space travel accessible to the masses.',
    content:
      'Space tourism is no longer a distant dream, with private companies like SpaceX and Blue Origin leading the charge to commercialize space travel. This article examines the current state of the industry, the challenges of safety and affordability, and the broader implications of humanity venturing into space for leisure. Discover the milestones achieved so far and what lies ahead for this groundbreaking frontier.',
  },
  {
    id: '11',
    title: 'The Future of Work: Remote and AI-Assisted',
    author: 'Emma Taylor',
    imageSrc: ImageStore.UnavailableImage,
    createdDate: '2024-02-14',
    description:
      'Analyzing how remote work and artificial intelligence are reshaping workplaces and workforce dynamics.',
    content:
      'The workplace of the future is rapidly evolving, driven by advancements in technology and shifting societal norms. This article explores how remote work is becoming the new normal, with AI-powered tools enabling seamless collaboration and productivity. We discuss the benefits of these changes, such as increased flexibility and cost savings, as well as the challenges, including maintaining work-life balance and addressing skill gaps in the workforce.',
  },
  {
    id: '12',
    title: 'Blockchain Beyond Cryptocurrency',
    author: 'Daniel Kim',
    imageSrc: ImageStore.UnavailableImage,
    createdDate: '2023-04-01',
    description:
      'Exploring innovative applications of blockchain technology in industries such as healthcare, supply chain, and entertainment.',
    content:
      'While blockchain is best known as the backbone of cryptocurrencies, its applications extend far beyond digital currencies. This article highlights how blockchain is revolutionizing various sectors, from improving transparency in supply chain management to enabling secure and decentralized healthcare records. We also discuss the potential of smart contracts and tokenization to unlock new business models and address longstanding industry challenges.',
  },
];

export { MOCK_ARTICLE_LIST };
