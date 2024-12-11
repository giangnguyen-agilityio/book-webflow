export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

interface RequestOptions {
  endpoint: string;
  config?: RequestInit;
}

interface GenericRequestOptions<TBody> extends RequestOptions {
  method: HttpMethod;
  body?: TBody;
}

class HttpClient {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = process.env.API_URL || '';
  }

  // Common method to send request
  private async sendRequest<TResponse>({
    endpoint,
    config,
  }: RequestOptions): Promise<TResponse> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...config,
        headers: {
          Accept: 'application/json',
          ...config?.headers,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Request failed');
      }

      const contentType = response.headers.get('Content-Type');

      if (contentType?.includes('application/json')) {
        return response.json();
      }

      return response.text() as unknown as TResponse;
    } catch (error) {
      throw error instanceof Error
        ? error
        : new Error('Network error occurred');
    }
  }

  // GET request
  async get<TResponse>(options: RequestOptions): Promise<TResponse> {
    return this.sendRequest<TResponse>({
      ...options,
      config: {
        ...options.config,
        method: HttpMethod.GET,
      },
    });
  }

  // Generic request with body (POST, PUT, PATCH, DELETE)
  async request<TBody, TResponse>({
    method,
    endpoint,
    body,
    config,
  }: GenericRequestOptions<TBody>): Promise<TResponse> {
    return this.sendRequest<TResponse>({
      endpoint,
      config: {
        ...config,
        method,
        headers: {
          'Content-Type': 'application/json',
          ...config?.headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      },
    });
  }
}

export const httpClient = new HttpClient();
