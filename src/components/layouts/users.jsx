import React, { useState, useEffect } from "react";
import { paginate } from "../../utils/paginate";
import Pagination from "../common/pagination";
import api from "../../api";
import PropTypes from "prop-types";
import GroupList from "../common/groupList";
import SearchStatus from "../ui/searchStatus";
import UserTable from "../ui/usersTable";
import _ from "lodash";
const Users = () => {
    const [selectedProf, setSelectedProf] = useState();
    const [professions, setProfessions] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [dataSearch, setDataSearch] = useState("");
    const pageSize = 4;
    const [users, setUsers] = useState();
    const [searchedUsers, setSearchedUsers] = useState();
    useEffect(() => {
        api.users.fetchAll().then((data) => {
            setUsers(data);
            setSearchedUsers(data);
        });
    }, []);
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
        console.log(id);
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);
    useEffect(() => {
        if (!searchedUsers) return;
        setUsers(
            searchedUsers.filter((user) => {
                return user.name
                    .toLowerCase()
                    .includes(dataSearch.toLowerCase());
            })
        );
    }, [dataSearch]);
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        setDataSearch("");
    };
    const clearFilter = () => {
        setSelectedProf();
    };
    const handleSort = (item) => {
        setSortBy(item);
        console.log(item);
    };
    const handleChangeSearch = ({ target }) => {
        setDataSearch(target.value);
        setCurrentPage(1);
        clearFilter();
    };
    if (users) {
        const filteredUsers = selectedProf
            ? users.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
              )
            : users;
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const userCrop = paginate(sortedUsers, currentPage, pageSize);

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <input
                        type="text"
                        placeholder="Найти..."
                        onChange={handleChangeSearch}
                        value={dataSearch}
                    />
                    {count > 0 && (
                        <UserTable
                            users={userCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "loading";
};

Users.propTypes = {
    users: PropTypes.array.isRequired
};

export default Users;
