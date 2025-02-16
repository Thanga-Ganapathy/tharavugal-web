import { isJSON } from "@opentf/std";

export default class APIClient {
  static getAuthHeaders(headers = {}) {
    const user = localStorage.getItem('user');

    if (isJSON(user)) {
      try {
        const parsedUser = JSON.parse(user);
        const authToken = parsedUser?.authToken;
        if (authToken) {
          return {
            Authorization: `Bearer ${authToken}`,
            ...headers,
          };
        }
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
      }
    }
  
    return headers; // Return default headers if no authToken found
  }
  
  static async request(url, options = {}) {
    try {
      const response = await fetch(url, options);
      const contentType = response.headers.get('Content-Type');
      const data = contentType && contentType.includes('application/json')
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        if (response.status === 401) {
          window.sessionStorage.clear();
          localStorage.removeItem('user');
          window.location = '/';
        }
        
        // For 4xx (Client Errors) and 5xx (Server Errors), just throw an error
        const error = new Error(data.message || response.statusText);
        error.status = response.status;
        error.data = data; // Include the response data in case of an error
        throw error;
      }

      return data; // Return successful response
    } catch (error) {
      console.error('API Request Error:', error);
      throw error; // Throw the error to be handled by the calling component
    }
  }

  static async get(url, headers = {}) {
    const options = {
      method: 'GET',
      headers: APIClient.getAuthHeaders(headers), // Directly call APIClient.getAuthHeaders
    };
    return APIClient.request(url, options); // Directly call APIClient.request
  }

  static async post(url, data, patch = false, headers = {}) {
    const options = {
      method: patch ? 'PATCH' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...APIClient.getAuthHeaders(headers), // Directly call APIClient.getAuthHeaders
      },
      body: JSON.stringify(data),
    };
    return APIClient.request(url, options); // Directly call APIClient.request
  }

  static async delete(url, data = {}, headers = {}) {
    const searchParams = new URLSearchParams(data).toString();
    const options = {
      method: 'DELETE',
      headers: APIClient.getAuthHeaders(headers), // Directly call APIClient.getAuthHeaders
    };

    const deleteUrl = searchParams ? `${url}?${searchParams}` : url;
    return APIClient.request(deleteUrl, options); // Directly call APIClient.request
  }
}
