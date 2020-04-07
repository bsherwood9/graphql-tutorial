import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  getAuthorsQuery,
  getBooksQuery,
  addBookMutation
} from "../queries/queries";
const initialValues = {
  name: "",
  genre: "",
  authorId: ""
};

const AddBookInput = () => {
  const [inputState, setInputState] = useState(initialValues);
  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [addBook] = useMutation(addBookMutation);

  const displayAuthors = () => {
    if (loading) {
      return <option disabled>Loading Authors...</option>;
    } else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  };

  const handleChange = e => {
    const update = { ...inputState, [e.target.name]: e.target.value };
    setInputState(update);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("This is the inputState", inputState);
    addBook({
      variables: { ...inputState },
      refetchQueries: [{ query: getBooksQuery }]
    });
  };

  return (
    <form id="add-book" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="name">Book Name:</label>
        <input type="text" onChange={handleChange} name="name" />
      </div>
      <div className="field">
        <label htmlFor="genre">Genre:</label>
        <input type="text" onChange={handleChange} name="genre" />
      </div>
      <div className="field">
        <label htmlFor="authorId">Author:</label>
        <select onChange={handleChange} name="authorId">
          <option>Select Author</option>
          {displayAuthors()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default AddBookInput;
