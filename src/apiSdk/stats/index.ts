import axios from 'axios';
import queryString from 'query-string';
import { StatsInterface, StatsGetQueryInterface } from 'interfaces/stats';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getStats = async (query?: StatsGetQueryInterface): Promise<PaginatedInterface<StatsInterface>> => {
  const response = await axios.get('/api/stats', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createStats = async (stats: StatsInterface) => {
  const response = await axios.post('/api/stats', stats);
  return response.data;
};

export const updateStatsById = async (id: string, stats: StatsInterface) => {
  const response = await axios.put(`/api/stats/${id}`, stats);
  return response.data;
};

export const getStatsById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/stats/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteStatsById = async (id: string) => {
  const response = await axios.delete(`/api/stats/${id}`);
  return response.data;
};
