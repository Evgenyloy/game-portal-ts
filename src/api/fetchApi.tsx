const API_BASE_URL = "https://mmo-games.p.rapidapi.com";

const headers = {
  "x-rapidapi-key": "91b58b67a8msh2bd4b616724fea5p1339a3jsn28cd7698ccec",
  "x-rapidapi-host": "mmo-games.p.rapidapi.com",
};

export const fetchApi = async <T,>(
  endpoint: string,
  params?: Record<string, string>
): Promise<T> => {
  const queryParams = params ? `?${new URLSearchParams(params)}` : "";
  const url = `${API_BASE_URL}${endpoint}${queryParams}`;

  const response = await fetch(url, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
