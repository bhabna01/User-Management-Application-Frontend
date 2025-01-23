import { FaLock, FaLockOpen, FaTrash } from "react-icons/fa";

const Toolbar = ({ onBlock, onUnblock, onDelete }) => {
  return (
    <div className="d-flex mb-3">
      <button className="btn btn-primary me-2" onClick={onBlock}>
        <FaLock className="me-2" />
        Block
      </button>
      <button className="btn btn-secondary me-2" onClick={onUnblock}>
        <FaLockOpen className="me-2" />
        Unblock
      </button>
      <button className="btn btn-danger" onClick={onDelete}>
        <FaTrash className="me-2" />
        Delete
      </button>
    </div>
  );
};

export default Toolbar;