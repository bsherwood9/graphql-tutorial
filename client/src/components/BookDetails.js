import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { getBookQuery } from "./../queries/queries";

const BookDetails = ({ book_id }) => {
  const { loading, data } = useQuery(getBookQuery, {
    variables: { id: book_id }
  });
  const displayBookDetails = () => {
    if (data) {
      return (
        <div>
          <h2>{data.book.name}</h2>
          <p>{data.book.genre}</p>
          <p>{data.book.author.name}</p>
          <p>All Books by this author:</p>
          <ul className="other-books">
            {data.book.author.books.map(item => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return <div>No Books selected</div>;
    }
  };

  return <div id="book-details">{displayBookDetails()}</div>;
};

export default BookDetails;
