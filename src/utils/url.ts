type URLParams = Record<string, string | number | boolean | undefined | null>;

interface GenerateUrlOptions {
  pathParams?: (string | number | undefined | null)[];
  queryParams?: URLParams;
}

/**
 * Generates a URL with both path and query parameters
 * @param baseUrl - Base URL path
 * @param options - Object containing path and query parameters
 * @returns Formatted URL string
 */
export const generateUrl = (
  baseUrl: string,
  options?: GenerateUrlOptions | URLParams,
): string => {
  // Handle legacy case where options is directly query params
  if (options && !('pathParams' in options) && !('queryParams' in options)) {
    options = { queryParams: options as URLParams };
  }

  const { pathParams, queryParams } = options || {};

  // Handle path parameters
  let finalPath = baseUrl;

  if (Array.isArray(pathParams) && pathParams.length) {
    finalPath = [baseUrl, ...pathParams.filter(Boolean)].join('/');
  }

  // Handle query parameters
  if (!queryParams || Object.keys(queryParams).length === 0) {
    return finalPath;
  }

  const searchParams = new URLSearchParams();
  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  const searchString = searchParams.toString();

  return searchString ? `${finalPath}?${searchString}` : finalPath;
};
