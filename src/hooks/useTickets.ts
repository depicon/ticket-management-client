import { useState, useEffect } from 'react';
import type { Ticket, CreateTicketDTO, UpdateTicketDTO } from '../types/tickets';
import { ticketService } from '../services/api';

export const useTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTickets = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ticketService.getAll();
      setTickets(data);
    } catch (err) {
      setError('Failed to fetch tickets');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createTicket = async (data: CreateTicketDTO) => {
    setLoading(true);
    setError(null);
    try {
      const newTicket = await ticketService.create(data);
      setTickets([newTicket, ...tickets]);
      return newTicket;
    } catch (err) {
      setError('Failed to create ticket');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTicket = async (id: number, data: UpdateTicketDTO) => {
    setLoading(true);
    setError(null);
    try {
      const updatedTicket = await ticketService.update(id, data);
      setTickets(tickets.map(t => t.id === id ? updatedTicket : t));
      return updatedTicket;
    } catch (err) {
      setError('Failed to update ticket');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

//   const deleteTicket = async (id: number) => {
//     setLoading(true);
//     setError(null);
//     try {
//       await ticketService.delete(id);
//       setTickets(tickets.filter(t => t.id !== id));
//     } catch (err) {
//       setError('Failed to delete ticket');
//       console.error(err);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

  useEffect(() => {
    fetchTickets();
  }, []);

  return {
    tickets,
    loading,
    error,
    fetchTickets,
    createTicket,
    updateTicket,
    // deleteTicket,
  };
};

export const useTicket = (id: number) => {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTicket = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ticketService.getById(id);
      setTicket(data);
    } catch (err) {
      setError('Failed to fetch ticket');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchTicket();
    }
  }, [id]);

  return { ticket, loading, error, fetchTicket };
};