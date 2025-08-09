import { useState, useEffect } from 'react';
import {
  CreateStudyDayDto,
  StudyDayDto,
  UpdateStudyDayDto,
  StudyDayStatus,
} from '../../models/studyDay';
import { studyDayApi } from '../../api/studyDayApi';

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  mode: 'create' | 'edit';
  initialData?: StudyDayDto;
}

const statusOptions: StudyDayStatus[] = ['NotStarted', 'InProgress', 'Completed'];

const StudyDayForm = ({ open, onClose, onSuccess, mode, initialData }: Props) => {
  const [form, setForm] = useState<CreateStudyDayDto | UpdateStudyDayDto>({
    targetDate: initialData?.targetDate || '',
    note: initialData?.note || '',
    ...(mode === 'edit' && initialData
      ? {
          id: initialData.id,
          status: initialData.status,
        }
      : {}),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async () => {
  try {
    if (mode === 'create') {
      const createDto: CreateStudyDayDto = {
        targetDate: (form as CreateStudyDayDto).targetDate,
        note: form.note || '',
      };
      await studyDayApi.create(createDto);
    } else {
      const updateDto: UpdateStudyDayDto = {
        id: (form as UpdateStudyDayDto).id,
        targetDate: (form as UpdateStudyDayDto).targetDate,
        note: form.note || '',
        status: (form as UpdateStudyDayDto).status,
      };
      await studyDayApi.update(updateDto);
    }

    onSuccess();
    onClose();
  } catch (error) {
    console.error('❌ Error submitting form:', error);
  }
};

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          {mode === 'create' ? '➕ Add Study Day' : '✏️ Edit Study Day'}
        </h2>

        <div className="space-y-4">
          {/* Target Date (chỉ hiển thị ở chế độ edit) */}
          {mode === 'edit' && (
            <div>
              <label className="block font-medium text-sm mb-1">Target Date</label>
              <input
                type="date"
                name="targetDate"
                value={(form as UpdateStudyDayDto).targetDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                disabled
              />
            </div>
          )}

          {/* Note input */}
          <div>
            <label className="block font-medium text-sm mb-1">Note</label>
            <input
              type="text"
              name="note"
              value={form.note}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              placeholder="Enter note for this day"
            />
          </div>

          {/* Status select (only in edit mode) */}
          {mode === 'edit' && (
            <div>
              <label className="block font-medium text-sm mb-1">Status</label>
              <select
                name="status"
                value={(form as UpdateStudyDayDto).status}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button className="btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleSubmit}>
            {mode === 'create' ? 'Create' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudyDayForm;
