import React from 'react';
import { Link } from 'react-router-dom';
import type { Ticket } from '../../types/tickets';
import { STATUS_COLORS, PRIORITY_COLORS } from '../../utils/constants';
import { Button } from '../common/Button';
// import { Modal } from '../common/Modal';

interface TicketListProps {
  tickets: Ticket[];
//   onDelete: (id: number) => Promise<void>;
  onStatusChange: (id: number, status: Ticket['status']) => Promise<void>;
  loading: boolean;
}

export const TicketList: React.FC<TicketListProps> = ({
  tickets,
//   onDelete,
  onStatusChange,
  loading,
}) => {
  // const [deleteId, setDeleteId] = useState<number | null>(null);

  // const handleDelete = async () => {
  //   if (deleteId) {
  //   //   await onDelete(deleteId);
  //     setDeleteId(null);
  //   }
  // };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading && tickets.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading tickets...</div>
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500 mb-4">No tickets found</p>
        <Link to="/create">
          <Button>Create your first ticket</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  #{ticket.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    to={`/tickets/${ticket.id}`}
                    className="text-blue-600 hover:text-blue-900 font-medium"
                  >
                    {ticket.title}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={ticket.status}
                    onChange={(e) =>
                      onStatusChange(ticket.id, e.target.value as Ticket['status'])
                    }
                    className={`text-sm rounded-full px-3 py-1 border-0 ${STATUS_COLORS[ticket.status]}`}
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`text-sm rounded-full px-3 py-1 ${PRIORITY_COLORS[ticket.priority]}`}
                  >
                    {ticket.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(ticket.created_at)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Link
                    to={`/tickets/${ticket.id}`}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    View
                  </Link>
                  {/* <button
                    onClick={() => setDeleteId(ticket.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <Modal
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        title="Delete Ticket"
      >
        <p className="mb-6 text-gray-600">
          Are you sure you want to delete this ticket? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <Button variant="secondary" onClick={() => setDeleteId(null)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Modal> */}
    </>
  );
};