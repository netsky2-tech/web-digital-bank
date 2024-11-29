"use client";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
} from "react-icons/fa";

const Notification = ({ message, type, duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <FaCheckCircle className="mr-2 text-green-600" />;
      case "error":
        return <FaExclamationCircle className="mr-2 text-red-600" />;
      case "warning":
        return <FaExclamationCircle className="mr-2 text-orange-600" />;
      case "info":
        return <FaInfoCircle className="mr-2 text-blue-600" />;
      default:
        return null;
    }
  };

  const getStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-600";
      case "error":
        return "bg-red-100 text-red-600";
      case "warning":
        return "bg-orange-100 text-orange-600";
      case "info":
        return "bg-blue-100 text-blue-600";
      default:
        return "";
    }
  };

  if (!visible) return null;

  return (
    <div
      className={`flex items-center p-3 rounded-lg shadow-md transition-all ${getStyles()}`}
      role="alert"
    >
      {getIcon()}
      <span>{message}</span>
    </div>
  );
};
Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default Notification;
