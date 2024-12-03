// Constants
import { DEFAULT_METADATA_INFO } from '@/constants';

// Types
import { MetadataTitle } from '@/types';

/**
 * A utility function to get the title from metadata.
 *
 * If the title is a string, it will be returned as is.
 * If the title is an object with an absolute property, the absolute property will be returned.
 * If the title is an object with a default property, the default property will be returned.
 * In all other cases, the default title from DEFAULT_METADATA_INFO will be returned.
 *
 * @param title - The title from metadata.
 * @returns The title as a string.
 */
export function formatMetadataTitle(title: MetadataTitle): string {
  if (!title) {
    return DEFAULT_METADATA_INFO.TITLE;
  }

  if (typeof title === 'string') {
    return title;
  }

  // Prefer returning absolute if available
  if ('absolute' in title && title.absolute) {
    return title.absolute;
  }

  // Use default if absolute is not available
  if ('default' in title && title.default) {
    return title.default;
  }

  return DEFAULT_METADATA_INFO.TITLE;
}
