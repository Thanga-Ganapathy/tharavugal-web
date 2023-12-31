export default class APIClient {
  static async get(url, headers = {}) {
    const res = await fetch(url, {
      headers: {
        Authorization: JSON.parse(localStorage.getItem('user'))?.authToken,
        ...headers,
      },
    });

    if (!res.ok) {
      const error = new Error(res.statusText);
      error.status = res.status;
      if (res.status === 401) {
        window.sessionStorage.clear();
        localStorage.removeItem('user');
        window.location = '/';
      }
      throw error;
    }

    return res.json();
  }

  static async post(url, data, patch = false, headers = {}) {
    const response = await fetch(url, {
      method: patch ? 'PATCH' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: JSON.parse(localStorage.getItem('user'))?.authToken,
        ...headers,
      },
      body: JSON.stringify(data),
    });

    return {
      ok: response.ok,
      status: response.status,
      data: await response.json(),
    };
  }

  static async delete(url, data, headers = {}) {
    const searchParams = new URLSearchParams(data);
    const response = await fetch(url + `?${searchParams.toString()}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: JSON.parse(localStorage.getItem('user'))?.authToken,
        ...headers,
      },
      body: null,
    });

    return {
      ok: response.ok,
      status: response.status,
      data: await response.json(),
    };
  }
}
