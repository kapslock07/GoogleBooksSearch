import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";

function Saved() {
  // Setting our component's initial state
  const [savedBooks, setSavedBooks] = useState([]);

  // Load all books and store them with setBooks
  useEffect(() => {
    loadSavedBooks();
  }, []);

  // Loads all books and sets them to books
  function loadSavedBooks() {
    API.getBooks()
      .then((res) => {
        console.log(res);
        setSavedBooks(res.data);
      })
      .catch((err) => console.log(err));
  }


  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    API.deleteBook(id)
      .then((res) => loadSavedBooks())
      .catch((err) => console.log(err));
  }

  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1>Saved Books</h1>
          </Jumbotron>
        </Col>
        <Col size="md-6 sm-12">
          {savedBooks.length ? (
            <List>
              {savedBooks.map((book, i) => (
                <ListItem key={i}>
                  <a href={book.link}>
                    <strong>
                      {book.title}
                    </strong>
                    <p> by {book.authors}</p>
                    <img src={book.image} alt="book" />
                  </a>
                  <p>{book.description}</p>
                  <DeleteBtn onClick={() => deleteBook(book._id)} />
                  {/* <button onClick={() => saveTheBook(book)}>save</button> */}

                </ListItem>
              ))}
            </List>
          ) : (
              <h3>No Results to Display</h3>
            )}
        </Col>
      </Row>
    </Container>
  );
}

export default Saved;
