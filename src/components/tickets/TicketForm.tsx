import React, { useState } from 'react';
// import type { CreateTicketDTO, TicketPriority } from '../../types/tickets';
import type { CreateTicketDTO } from '../../types/tickets';
import { PRIORITY_OPTIONS } from '../../utils/constants';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';

interface TicketFormProps {
  onSubmit: (data: CreateTicketDTO) => Promise<void>;
  loading: boolean;
  initialData?: Partial<CreateTicketDTO>;
}

export const TicketForm: React.FC<TicketFormProps> = ({
  onSubmit,
  loading,
  initialData = {},
}) => {
  const [formData, setFormData] = useState<CreateTicketDTO>({
    title: initialData.title || '',
    description: initialData.description || '',
    priority: initialData.priority || 'medium',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CreateTicketDTO, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CreateTicketDTO, string>> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (formData.title.length > 255) {
      newErrors.title = 'Title must be less than 255 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      await onSubmit(formData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof CreateTicketDTO]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <div className="bg-white rounded-lg shadow p-6">
        <Input
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
          placeholder="Enter ticket title"
          required
        />

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter ticket description (optional)"
          />
        </div>

        <Select
          label="Priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          options={PRIORITY_OPTIONS}
        />

        <div className="flex justify-end space-x-3 mt-6">
          <Button
            type="button"
            variant="secondary"
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Ticket'}
          </Button>
        </div>
      </div>
    </form>
  );
};