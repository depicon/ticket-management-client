import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layouts/Layout';
import { TicketList } from '../components/tickets/TicketList';
// import { Button } from '../components/common/Button';
import { useTickets } from '../hooks/useTickets';

export const TicketsPage: React.FC = () => {
//   const navigate = useNavigate();
//   const { tickets, loading, updateTicket, deleteTicket } = useTickets();
  const { tickets, loading, updateTicket } = useTickets();

  const handleStatusChange = async (id: number, status: any) => {
    await updateTicket(id, { status });
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Tickets</h1>
        {/* <Button onClick={() => navigate('/create')}>Create New Ticket</Button> */}
      </div>
      <TicketList
        tickets={tickets}
        // onDelete={deleteTicket}
        onStatusChange={handleStatusChange}
        loading={loading}
      />
    </Layout>
  );
};