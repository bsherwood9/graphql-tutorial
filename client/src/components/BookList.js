import React from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

const BookList = props => {
  const displayBooks = () => {
    //This works pretty well. Need to expand this.
    let data = props.data;
    if (data.loading) {
      return <li>Loading Books...</li>;
    } else {
      return data.books.map(book => {
        console.log(book);
        return (
          <>
            <li key={book.id}>{book.name}</li>
            <li>{book.id}</li>
          </>
        );
      });
    }
  };

  return (
    <div>
      <ul id="book-list">{displayBooks()}</ul>
    </div>
  );
};

export default graphql(getBooksQuery)(BookList);
