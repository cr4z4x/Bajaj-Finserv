import React, { useState } from 'react';
import { Stethoscope, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <Stethoscope size={28} className="text-sky-600" />
            <h1 className="ml-2 text-xl font-bold text-gray-900">DoctorConnect</h1>
          </motion.div>
          
          <nav className="hidden md:flex space-x-8">
            {['Find Doctors', 'Specialties', 'About Us'].map((item) => (
              <motion.a
                key={item}
                whileHover={{ scale: 1.05 }}
                className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                href="#"
              >
                {item}
              </motion.a>
            ))}
            <motion.a
              whileHover={{ scale: 1.05 }}
              className="text-sky-600 hover:text-sky-800 px-3 py-2 text-sm font-medium"
              href="#"
            >
              Login
            </motion.a>
          </nav>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>
      
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['Find Doctors', 'Specialties', 'About Us', 'Login'].map((item) => (
                <motion.a
                  key={item}
                  whileHover={{ scale: 1.05 }}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    item === 'Login'
                      ? 'text-sky-600 hover:text-sky-800'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  href="#"
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;