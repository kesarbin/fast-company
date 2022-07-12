import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };
  const renderPhrase = (number) => {
    if (number > 4 && number < 15) return "человек тусанут";
    if (number % 10 === 2 || number % 10 === 3 || number % 10 === 4)
      return "человека тусанут";
    if (number % 10 === 1) return "человек тусанет";
    return "человек тусанут";
  };
  return (
    <>
      <h2>
        <span
          className={"badge bg-" + (users.length > 0 ? "primary" : "danger")}
        >
          {users.length > 0
            ? `${users.length} ${renderPhrase(users.length)} с тобой сегодня`
            : "Никто с тобой не тусанет"}
        </span>
      </h2>
      {users.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Кол-во встреч</th>
              <th scope="col">Оценка</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                  {user.qualities.map((item) => (
                    <span
                      className={"badge m-1 bg-" + item.color}
                      key={item._id}
                    >
                      {item.name}
                    </span>
                  ))}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}</td>
                <td>
                  <button
                    className={"btn btn-danger"}
                    onClick={() => handleDelete(user._id)}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;
