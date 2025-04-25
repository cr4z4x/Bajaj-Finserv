import React, { useState } from 'react';
import { Doctor } from '../types';
import { Calendar, Clock, DollarSign, Video, Building, MapPin, Globe, Share2, Star, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import AppointmentModal from './AppointmentModal';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Dr. ${doctor.name}`,
          text: `Check out Dr. ${doctor.name}, ${doctor.specialities.map(s => s.name).join(', ')} at ${doctor.clinic.name}`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      }
    } catch (error) {
      toast.error('Failed to share');
    }
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        data-testid="doctor-card" 
        className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-full md:w-24 h-24 rounded-full shrink-0 mx-auto md:mx-0 overflow-hidden bg-sky-100 flex items-center justify-center relative group"
          >
            {doctor.photo ? (
              <img 
                src={doctor.photo} 
                alt={doctor.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl font-semibold text-sky-600">
                {doctor.name_initials}
              </span>
            )}
            <motion.div 
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center"
            >
              <Star className="text-yellow-400" size={24} />
            </motion.div>
          </motion.div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h2 
                  data-testid="doctor-name" 
                  className="text-xl font-semibold text-gray-800"
                >
                  {doctor.name}
                </h2>
                <p className="text-sm text-gray-500">{doctor.clinic.name}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleShare}
                className="text-gray-500 hover:text-sky-600 transition-colors"
              >
                <Share2 size={20} />
              </motion.button>
            </div>
            
            <div className="mt-2 flex flex-wrap gap-2" data-testid="doctor-specialty">
              {doctor.specialities.map((specialty, index) => (
                <motion.span 
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800"
                >
                  {specialty.name}
                </motion.span>
              ))}
            </div>
            
            {doctor.doctor_introduction && (
              <p className="mt-2 text-sm text-gray-600">{doctor.doctor_introduction}</p>
            )}
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-gray-500" />
                <span 
                  data-testid="doctor-experience" 
                  className="text-sm text-gray-600"
                >
                  {doctor.experience}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <DollarSign size={16} className="text-gray-500" />
                <span 
                  data-testid="doctor-fee" 
                  className="text-sm text-gray-600"
                >
                  {doctor.fees}
                </span>
              </div>
            </div>
            
            <div className="mt-2 flex items-center gap-2">
              <Globe size={16} className="text-gray-500" />
              <span className="text-sm text-gray-600">
                Speaks: {doctor.languages.join(', ')}
              </span>
            </div>
            
            <div className="mt-2 flex items-center gap-2">
              <MapPin size={16} className="text-gray-500" />
              <span className="text-sm text-gray-600">
                {doctor.clinic.address.locality}, {doctor.clinic.address.city}
              </span>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {doctor.video_consult && (
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-sky-100 text-sky-800"
                >
                  <Video size={14} className="mr-1" />
                  Video Consult
                </motion.span>
              )}
              {doctor.in_clinic && (
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
                >
                  <Building size={14} className="mr-1" />
                  In Clinic
                </motion.span>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsModalOpen(true)}
            className="flex-1 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-md transition-colors flex items-center justify-center gap-2"
          >
            <Calendar size={16} />
            Book Appointment
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setShowContact(!showContact);
              if (!showContact) {
                toast.success('Contact number copied to clipboard!');
              }
            }}
            className="px-4 py-2 border border-sky-600 text-sky-600 hover:bg-sky-50 rounded-md transition-colors flex items-center justify-center"
          >
            <Phone size={16} />
          </motion.button>
        </div>
      </motion.div>
      
      <AppointmentModal
        doctor={doctor}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default DoctorCard;