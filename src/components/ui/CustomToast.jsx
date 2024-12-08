import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomToast = ({ message }) => {
  const notify = () => {
    toast(message, {
      position: "top-right", // Position of the toast
      autoClose: 5000, // Auto close after 5 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark", // Change to "light" or customize as needed
    });
  };

  return (
    <>
      <button onClick={notify}>Show Notification</button>
      <ToastContainer />
    </>
  );
};

export default CustomToast; 