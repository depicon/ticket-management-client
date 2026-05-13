import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../components/layouts/Layout';
import { TicketDetail } from '../components/tickets/TicketDetail';
import { useTicket, useTickets } from '../hooks/useTickets';
import type { UpdateTicketDTO } from '../types/tickets';

export const TicketDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { ticket, loading: loadingTicket } = useTicket(Number(id));
  // const { updateTicket, deleteTicket, loading: updating } = useTickets();
  const { updateTicket, loading: updating} = useTickets();

  const handleUpdate = async (ticketId: number, data: UpdateTicketDTO) => {
    await updateTicket(ticketId, data);
  };

  // const handleDelete = async (ticketId: number) => {
  //   // await deleteTicket(ticketId);
  //   navigate('/');
  // };

  if (loadingTicket) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading ticket...</div>
        </div>
      </Layout>
    );
  }

  if (!ticket) {
    return (
      <Layout>
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Ticket Not Found</h2>
          <p className="text-gray-500 mb-4">The ticket you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-900"
          >
            Return to Tickets
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-4">
        <button
          onClick={() => navigate('/')}
          className="text-blue-600 hover:text-blue-900"
        >
          ← Back to Tickets
        </button>
      </div>
      <TicketDetail
        ticket={ticket}
        onUpdate={handleUpdate}
        // onDelete={handleDelete}
        loading={updating}
      />
    </Layout>
  );
};