import React, { useState } from "react";
import { Form, FormControl } from "react-bootstrap";

export const SearchForm = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    if (newSearchTerm === "") {
      onSearch("");
    } else {
      onSearch(newSearchTerm);
    }
  };

  return (
    <Form className="mx-auto col-4">
      <FormControl
        className="mr-sm-2"
        id="search-bar"
        type="text"
        placeholder="Search movies by title..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </Form>
  );
};
