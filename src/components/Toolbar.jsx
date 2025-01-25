
import React from 'react';
import { FaLock, FaLockOpen, FaTrash } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const Toolbar = ({ onBlock, onUnblock, onDelete }) => {
  return (
    <div className="d-flex mb-3">
      {/* Block button with tooltip */}
      <button
        className="btn btn-primary me-2"
        onClick={onBlock}
        data-tooltip-id="block-tooltip"
        data-tooltip-content="Block selected users"
      >
        <FaLock/>
      
      </button>
      <Tooltip id="block-tooltip" />

      {/* Unblock button with tooltip */}
      <button
        className="btn btn-secondary me-2"
        onClick={onUnblock}
        data-tooltip-id="unblock-tooltip"
        data-tooltip-content="Unblock selected users"
      >
        <FaLockOpen/>
       
      </button>
      <Tooltip id="unblock-tooltip" />

      {/* Delete button with tooltip */}
      <button
        className="btn btn-danger"
        onClick={onDelete}
        data-tooltip-id="delete-tooltip"
        data-tooltip-content="Delete selected users"
      >
        <FaTrash />
       
      </button>
      <Tooltip id="delete-tooltip" />
    </div>
  );
};

export default Toolbar;