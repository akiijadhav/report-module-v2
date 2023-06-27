import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

function useRequestUtilities() {
  const router = useRouter();

  const logoutUser = useCallback(() => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('applicationKey');
    router.push('/login');
  }, []);

  const fetchWrapper = useCallback(async function (props: {
    url: RequestInfo | URL;
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    includeAuthToken?: boolean;
    body?: any;
    contentType?: string;
    applicationIdentifier?: string;
    initiate?: () => any;
    handleResponse: (response: Response) => any;
    handleError: (error: any) => any;
    handleFinally?: () => any;
    applicationKey?: string;
  }) {
    const {
      url,
      method = 'GET',
      includeAuthToken = false,
      body,
      initiate,
      handleResponse,
      handleError,
      handleFinally,
      applicationKey,
    } = props;
    const options: RequestInit = {
      method,
    };
    if (includeAuthToken || body) {
      const headersInit: HeadersInit = {};
      options.headers = headersInit;
      if (body) {
        if (body instanceof FormData) {
          options.body = body;
        } else {
          options.headers['Content-Type'] =
            props.contentType || 'application/json';

          options.body = props.contentType ? body : JSON.stringify(body);
          const applicationKeyFromStorage =
            localStorage.getItem('applicationKey');
          if (!applicationKeyFromStorage) {
            options.headers['x-api-key'] = applicationKey;
          } else {
            options.headers['x-api-key'] = applicationKeyFromStorage;
          }
        }
      }
      if (includeAuthToken) {
        options.headers.Authorization = `Bearer ${localStorage.getItem(
          'accessToken',
        )}`;
      }
    }
    if (initiate) {
      initiate();
    }
    try {
      const response = await fetch(url, options);

      if (includeAuthToken && response.status === 401) {
        return;
      }
      handleResponse(response);
    } catch (error) {
      handleError(error);
    } finally {
      if (handleFinally) {
        handleFinally();
      }
    }
  },
  []);

  return {
    fetchWrapper,
    nextJsRouter: router,
    logoutUser,
  };
}
export default useRequestUtilities;
