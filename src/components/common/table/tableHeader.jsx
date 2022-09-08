import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const handleSort = (item) => {
        if (item === selectedSort.path) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ path: item, order: "asc" });
        }
    };
    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <>
                        <th
                            key={column}
                            onClick={
                                columns[column].path
                                    ? () => handleSort(columns[column].path)
                                    : undefined
                            }
                            {...{ role: columns[column].path && "button" }}
                            scope="col"
                        >
                            {columns[column].name}
                            {selectedSort.path === columns[column].path &&
                                selectedSort.order === "asc" && (
                                    <i className="bi bi-caret-up-fill"></i>
                                )}
                            {selectedSort.path === columns[column].path &&
                                selectedSort.order === "desc" && (
                                    <i className="bi bi-caret-down-fill"></i>
                                )}
                        </th>
                    </>
                ))}
                <th />
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
