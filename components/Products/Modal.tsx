import { XMarkIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup the event listener on component unmount or when isOpen changes
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div style={overlayStyle}>
      <div ref={modalRef} style={modalStyle}>
        {/* <button onClick={onClose} style={closeButtonStyle}>Close</button> */}
        {children}
      </div>
    </div>
  );
};

// Styles (customize as needed)
const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: '4%',
    right: '25%',
    bottom: 0,
    backdropFilter: 'blur(4px)', // Adjust the blur value as needed
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Optional: a semi-transparent background to enhance the effect
  
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  

const modalStyle: React.CSSProperties = {
  background: 'white',
  //padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  //height:'200px'
};

const closeButtonStyle: React.CSSProperties = {
  marginBottom: '10px',
};

export default Modal;
