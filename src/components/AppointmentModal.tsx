import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { X, Clock } from 'lucide-react';
import { Doctor } from '../types';
import 'react-day-picker/dist/style.css';

interface AppointmentModalProps {
  doctor: Doctor;
  isOpen: boolean;
  onClose: () => void;
}

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
];

const AppointmentModal: React.FC<AppointmentModalProps> = ({ doctor, isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      const formattedDate = format(selectedDate, 'PPP');
      toast.success(`Appointment booked with Dr. ${doctor.name} for ${formattedDate} at ${selectedTime}`);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Book Appointment</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Select Date</h3>
                <div className="border rounded-lg p-2">
                  <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    fromDate={new Date()}
                    disabled={{ before: new Date() }}
                    modifiers={{
                      available: (date) => date.getDay() !== 0 // Disable Sundays
                    }}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Select Time</h3>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((time) => (
                    <motion.button
                      key={time}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedTime(time)}
                      className={`flex items-center justify-center gap-1 p-2 rounded-md border text-sm ${
                        selectedTime === time
                          ? 'bg-sky-50 border-sky-200 text-sky-700'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <Clock size={14} />
                      {time}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 border-t pt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBooking}
                disabled={!selectedDate || !selectedTime}
                className={`w-full py-2 rounded-md text-white flex items-center justify-center gap-2 ${
                  selectedDate && selectedTime
                    ? 'bg-sky-600 hover:bg-sky-700'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Confirm Booking
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AppointmentModal;