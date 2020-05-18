import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

function Books() {
  // Setting our component's initial state
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  // Load all books and store them with setBooks
  // useEffect(() => {
  //   loadBooks();
  // }, []);

  // // Loads all books and sets them to books
  // function loadBooks() {
  //   API.getBooks()
  //     .then((res) => setBooks(res.data))
  //     .catch((err) => console.log(err));
  // }

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    API.deleteBook(id)
      .then((res) => loadBooks())
      .catch((err) => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    //const { name, value } = event.target;
    //setFormObject({ ...formObject, [name]: value })

    setSearch(event.target.value);
  }

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database

  function saveTheBook(event) {
    event.preventDefault();
    if (formObject.title && formObject.author) {
      API.saveBook()
        .then((res) => loadBooks())
        .catch((err) => console.log(err));
    }

    //clear results/search
    //redirect to saved page
  }
  function handleFormSubmit(event) {
    event.preventDefault();
    API.searchBooks(search)
      .then((res) => {
        const mappedBooks = res.data.items.map((book) => ({
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors.join(", "),
          description: book.volumeInfo.description,
          image: book.volumeInfo.imageLinks.smallThumbnail,
          link: book.volumeInfo.infoLink,
        }));
        setBooks(mappedBooks);
      })
      //.then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  }

  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1>Search for a Book</h1>
          </Jumbotron>
          <form>
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              name="title"
              placeholder="Enter the Title of a Book"
            />
            <FormBtn disabled={!search} onClick={handleFormSubmit}>
              Search for Book
            </FormBtn>
          </form>
        </Col>
        <Col size="md-6 sm-12">
          {books.length ? (
            <List>
              {books.map((book, i) => (
                <ListItem key={i}>
                  <Link to={"/books/" + book._id}>
                    <strong>
                      {book.title} by {book.authors}
                    </strong>
                  </Link>
                  <img src={book.image} />
                  <DeleteBtn onClick={() => deleteBook(book._id)} />
                  {/* <button onClick={() => saveTheBook(book)}>save</button> */}
                  <button onClick={(event) => saveTheBook(event, book)}>
                    save
                  </button>
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

export default Books;
