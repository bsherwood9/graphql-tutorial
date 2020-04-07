import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
//components
import BookList from "./components/BookList";
import AddBookInput from "./components/AddBookInput";

//apollo client
const client = new ApolloClient({
  uri: `http://localhost:4000/graphql`
});
function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Brett's Reading List</h1>
        <BookList />
        <AddBookInput />
      </div>
    </ApolloProvider>
  );
}

export default App;
