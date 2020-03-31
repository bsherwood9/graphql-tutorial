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

function BookList(props) {
  const displayBooks = _ => {
    props.data.loading ? (
      <div>Loading Books...</div>
    ) : (
      props.data.books.map(book => {
        <li>{book.name}</li>;
      })
    );
  };
  return (
    <div>
      <ul id="book-list">{displayBooks()}</ul>
    </div>
  );
}

export default graphql(getBooksQuery)(BookList);
