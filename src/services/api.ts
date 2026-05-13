import axios from 'axios';
import type { Ticket, CreateTicketDTO, UpdateTicketDTO } from '../types/tickets';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const ticketService = {
  getAll: async (): Promise<Ticket[]> => {
    const response = await api.get('/tickets');
    return response.data.data;
  },

  getById: async (id: number): Promise<Ticket> => {
    const response = await api.get(`/tickets/${id}`);
    return response.data.data;
  },

  create: async (data: CreateTicketDTO): Promise<Ticket> => {
    const response = await api.post('/tickets', data);
    return response.data.data;
  },

  update: async (id: number, data: UpdateTicketDTO): Promise<Ticket> => {
    const response = await api.put(`/tickets/${id}`, data);
    return response.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/tickets/${id}`);
  },
};