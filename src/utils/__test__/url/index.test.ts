import { generateUrl } from '@/utils';

describe('generateUrl', () => {
  describe('Basic URL generation', () => {
    it('should return base URL when no params provided', () => {
      expect(generateUrl('/test')).toBe('/test');
    });

    it('should handle trailing slashes in base URL', () => {
      expect(generateUrl('/test/')).toBe('/test/');
    });
  });

  describe('Query Parameters', () => {
    it('should generate URL with single query parameter', () => {
      expect(generateUrl('/test', { queryParams: { page: 1 } })).toBe(
        '/test?page=1',
      );
    });

    it('should generate URL with multiple query parameters', () => {
      expect(
        generateUrl('/test', {
          queryParams: { page: 1, sort: 'desc' },
        }),
      ).toBe('/test?page=1&sort=desc');
    });

    it('should handle legacy query parameter format', () => {
      expect(generateUrl('/test', { page: 1, sort: 'desc' })).toBe(
        '/test?page=1&sort=desc',
      );
    });

    it('should ignore null or undefined query parameters', () => {
      expect(
        generateUrl('/test', {
          queryParams: { page: 1, sort: undefined, filter: null },
        }),
      ).toBe('/test?page=1');
    });
  });

  describe('Path Parameters', () => {
    it('should generate URL with path parameters', () => {
      expect(
        generateUrl('/test', {
          pathParams: ['123', 'edit'],
        }),
      ).toBe('/test/123/edit');
    });

    it('should filter out falsy path parameters', () => {
      expect(
        generateUrl('/test', {
          pathParams: ['123', null, 'edit', undefined],
        }),
      ).toBe('/test/123/edit');
    });
  });

  describe('Combined Parameters', () => {
    it('should handle both path and query parameters', () => {
      expect(
        generateUrl('/test', {
          pathParams: ['123', 'edit'],
          queryParams: { preview: true },
        }),
      ).toBe('/test/123/edit?preview=true');
    });

    it('should handle empty query params with path params', () => {
      expect(
        generateUrl('/test', {
          pathParams: ['123'],
          queryParams: {},
        }),
      ).toBe('/test/123');
    });

    it('should handle empty path params with query params', () => {
      expect(
        generateUrl('/test', {
          pathParams: [],
          queryParams: { page: 1 },
        }),
      ).toBe('/test?page=1');
    });
  });
});
