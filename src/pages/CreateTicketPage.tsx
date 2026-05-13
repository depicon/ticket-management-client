import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layouts/Layout';
import { TicketForm } from '../components/tickets/TicketForm';
import { useTickets } from '../hooks/useTickets';
import type { CreateTicketDTO } from '../types/tickets';

export const CreateTicketPage: React.FC = () => {
  const navigate = useNavigate();
  const { createTicket, loading } = useTickets();

  const handleSubmit = async (data: CreateTicketDTO) => {
    const newTicket = await createTicket(data);
    navigate(`/tickets/${newTicket.id}`);
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Ticket</h1>
      <TicketForm onSubmit={handleSubmit} loading={loading} />
    </Layout>
  );
};