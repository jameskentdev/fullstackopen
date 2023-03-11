import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (token, blog) => {
  const config = {
    headers: { Authorization: `Bearer:${token}` },
  };

  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create };
