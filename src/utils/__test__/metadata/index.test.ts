// Types
import { MetadataTitle } from '@/types';

// Constants
import { DEFAULT_METADATA_INFO } from '@/constants';

// Utils
import { formatMetadataTitle } from '@/utils';

describe('formatMetadataTitle', () => {
  it('should return default title when input is null or undefined', () => {
    expect(formatMetadataTitle(null)).toBe(DEFAULT_METADATA_INFO.TITLE);
    expect(formatMetadataTitle(undefined)).toBe(DEFAULT_METADATA_INFO.TITLE);
  });

  it('should return the string title directly when input is a string', () => {
    const title = 'Test Title';

    expect(formatMetadataTitle(title)).toBe(title);
  });

  it('should return absolute title when available', () => {
    const title = {
      absolute: 'Absolute Title',
      default: 'Default Title',
    };

    expect(formatMetadataTitle(title)).toBe('Absolute Title');
  });

  it('should return default title when absolute is not available', () => {
    const title = {
      default: 'Default Title',
    } as MetadataTitle;

    expect(formatMetadataTitle(title)).toBe('Default Title');
  });

  it('should return DEFAULT_METADATA_INFO.TITLE when object has no valid properties', () => {
    const title = {} as unknown as MetadataTitle;

    expect(formatMetadataTitle(title)).toBe(DEFAULT_METADATA_INFO.TITLE);
  });

  it('should return DEFAULT_METADATA_INFO.TITLE when properties are falsy', () => {
    const title = {
      absolute: '',
      default: '',
    };

    expect(formatMetadataTitle(title)).toBe(DEFAULT_METADATA_INFO.TITLE);
  });
});
