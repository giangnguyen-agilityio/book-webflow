import { AVATAR_CONFIG, AVATAR_BASE_URL } from '@/constants';

/**
 * Randomly selects and returns an element from the given array
 * @template T Type of array elements
 * @param {T[]} elements Array to select from
 * @returns {T} Randomly selected element
 */
export const selectRandomElement = <T>(elements: T[]): T => {
  const randomIndex = Math.floor(Math.random() * elements.length);

  return elements[randomIndex];
};

/**
 * Builds URL parameters string from avatar configuration
 * @param {typeof AVATAR_CONFIG} config Avatar configuration object
 * @returns {string} URL parameters string
 */
export const buildAvatarUrlParams = (config: typeof AVATAR_CONFIG): string => {
  return Object.entries(config)
    .map(([key, values]) => `${key}=${selectRandomElement(values)}`)
    .join('&');
};

/**
 * Generates a random avatar URL using the avatar configuration
 * @returns {string} Complete avatar URL with random parameters
 */
export const generateRandomAvatar = (): string => {
  const queryParams = buildAvatarUrlParams(AVATAR_CONFIG);

  return `${AVATAR_BASE_URL}/?${queryParams}`;
};
