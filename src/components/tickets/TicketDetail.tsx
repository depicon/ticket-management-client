import React, { useState } from 'react';
import type { Ticket, UpdateTicketDTO } from '../../types/tickets';
import { STATUS_COLORS, PRIORITY_COLORS, STATUS_OPTIONS, PRIORITY_OPTIONS } from '../../utils/constants';
import { Button } from '../common/Button';
import { Select } from '../common/Select';
import { Input } from '../common/Input';

interface TicketDetailProps {
  ticket: Ticket;
  onUpdate: (id: number, data: UpdateTicketDTO) => Promise<void>;
//   onDelete: (id: number) => Promise<void>;
  loading: boolean;
}

export const TicketDetail: React.FC<TicketDetailProps> = ({
  ticket,
  onUpdate,
//   onDelete,
  loading,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<UpdateTicketDTO>({
    title: ticket.title,
    description: ticket.description || '',
    status: ticket.status,
    priority: ticket.priority,
  });

  const handleSave = async () => {
    await onUpdate(ticket.id, editData);
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Edit Ticket #{ticket.id}</h2>
        <Input
          label="Title"
          value={editData.title}
          onChange={(e) => setEditData({ ...editData, title: e.target.value })}
        />
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Select
          label="Status"
          value={editData.status}
          onChange={(e) => setEditData({ ...editData, status: e.target.value as Ticket['status'] })}
          options={STATUS_OPTIONS}
        />
        <Select
          label="Priority"
          value={editData.priority}
          onChange={(e) => setEditData({ ...editData, priority: e.target.value as Ticket['priority'] })}
          options={PRIORITY_OPTIONS}
        />
        <div className="flex justify-end space-x-3 mt-6">
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            Save Changes
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {ticket.title}
            </h2>
            <div className="flex space-x-2">
              <span className={`text-sm rounded-full px-3 py-1 ${STATUS_COLORS[ticket.status]}`}>
                {ticket.status.replace('_', ' ')}
              </span>
              <span className={`text-sm rounded-full px-3 py-1 ${PRIORITY_COLORS[ticket.priority]}`}>
                {ticket.priority}
              </span>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="secondary" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
            {/* <Button variant="danger" onClick={() => onDelete(ticket.id)}>
              Delete
            </Button> */}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
          <p className="text-gray-900 whitespace-pre-wrap">
            {ticket.description || 'No description provided.'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Created</h3>
            <p className="text-gray-900">{formatDate(ticket.created_at)}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Last Updated</h3>
            <p className="text-gray-900">{formatDate(ticket.updated_at)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};