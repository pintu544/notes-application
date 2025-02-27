import React, { useEffect, useState } from "react";
import { Accordion, Badge, Button, Card, Row, Col } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import CategoryFilter from "../../components/CategoryFilter";

import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import "./MyNotes.css";
function MyNotes({ history, search }) {
  const [selectedCategory, setSelectedCategory] = useState("");

  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);
  const { loading, error, notes } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  // Extract unique categories from notes
  const uniqueCategories = notes
    ? [...new Set(notes.map((note) => note.category))]
    : [];

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  // Filter notes by title and category
  const filteredNotes = notes
    ? notes.filter(
        (note) =>
          note.title.toLowerCase().includes(search.toLowerCase()) &&
          (selectedCategory === "" || note.category === selectedCategory)
      )
    : [];

  return (
    <MainScreen title={`Welcome Back ${userInfo && userInfo.name}..`}>
      <Row className="mb-3">
        <Col md={8}>
          <Link to="/createnote">
            <Button style={{ marginBottom: 6 }} size="lg">
              Create new Note
            </Button>
          </Link>
        </Col>
        <Col md={4}>
          <CategoryFilter
            categories={uniqueCategories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </Col>
      </Row>

      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {filteredNotes.length === 0 && !loading && (
        <div className="text-center">No notes found matching your filters</div>
      )}
      {filteredNotes.reverse().map((note) => (
        <Accordion key={note._id}>
          <Card style={{ margin: 10 }}>
            <Card.Header style={{ display: "flex" }}>
              <span
                style={{
                  color: "black",
                  textDecoration: "none",
                  flex: 1,
                  cursor: "pointer",
                  alignSelf: "center",
                  fontSize: 18,
                }}
              >
                <Accordion.Toggle as={Card.Text} variant="link" eventKey="0">
                  {note.title}
                </Accordion.Toggle>
              </span>

              <div>
                <Button href={`/note/${note._id}`}>Edit</Button>
                <Button
                  variant="danger"
                  className="mx-2"
                  onClick={() => deleteHandler(note._id)}
                >
                  Delete
                </Button>
              </div>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <h4>
                  <Badge variant="success">Category - {note.category}</Badge>
                </h4>
                <blockquote className="blockquote mb-0">
                  <ReactMarkdown>{note.content}</ReactMarkdown>
                  <footer className="blockquote-footer">
                    Created on{" "}
                    <cite title="Source Title">
                      {note.createdAt.substring(0, 10)}
                    </cite>
                  </footer>
                </blockquote>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      ))}
    </MainScreen>
  );
}

export default MyNotes;
