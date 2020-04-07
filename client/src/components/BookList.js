import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { getBooksQuery } from "../queries/queries";

//components
import BookDetails from "./BookDetails";

const BookList = () => {
  const { loading, data } = useQuery(getBooksQuery);
  const [bookId, setBookId] = useState("");
  const displayBooks = () => {
    //This works pretty well. Need to expand this.
    if (loading) {
      return <li>Loading Books...</li>;
    } else {
      return data.books.map(book => {
        return (
          <li key={book.id} onClick={e => setBookId(book.id)}>
            {book.name}
          </li>
        );
      });
    }
  };
  return (
    <div>
      <ul id="book-list">{displayBooks()}</ul>
      <BookDetails book_id={bookId} />
    </div>
  );
};

export default BookList;
