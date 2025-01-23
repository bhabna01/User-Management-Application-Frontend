/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const UserTable = ({ users, selectedUsers, setSelectedUsers }) => {
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      setSelectedUsers(users.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId) => {
    // eslint-disable-next-line react/prop-types
    if (selectedUsers.includes(userId)) {
      // eslint-disable-next-line react/prop-types
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>
            <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Last Login</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {users.sort((a, b) => new Date(b.last_login) - new Date(a.last_login)).map((user) => (
          <tr key={user.id}>
            <td>
              <input type="checkbox" checked={selectedUsers.includes(user.id)} onChange={() => handleSelectUser(user.id)} />
            </td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{new Date(user.last_login).toLocaleString()}</td>
            <td>{user.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;