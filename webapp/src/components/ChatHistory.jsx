import React from 'react';
import { Clock, ChevronLeft } from 'lucide-react';

export const ChatHistory = ({ isOpen, onClose, messages, onSelectMessage }) => {
  // Group messages by date
  const groupMessagesByDate = () => {
    const groups = {};
    messages.forEach(message => {
      const date = message.timestamp ? new Date(message.timestamp) : new Date();
      const dateKey = date.toLocaleDateString();
      
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(message);
    });
    return groups;
  };

  const messageGroups = groupMessagesByDate();

  return (
    <div 
      className={`fixed left-0 top-0 h-screen bg-white dark:bg-gray-800 border-r dark:border-gray-700 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } w-[280px] z-50`}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium dark:text-white">Chat History</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <ChevronLeft size={20} />
          </button>
        </div>
        
        <div className="space-y-4">
          {Object.entries(messageGroups).map(([date, msgs]) => (
            <div key={date}>
              <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                {date === new Date().toLocaleDateString() ? 'Today' : date}
              </h3>
              <div className="space-y-3">
                {msgs.map((msg, index) => (
                  <button
                    key={index}
                    onClick={() => onSelectMessage(msg)}
                    className="w-full flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded cursor-pointer text-left"
                  >
                    <Clock size={18} />
                    <span className="truncate">{msg.content.substring(0, 30)}...</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};