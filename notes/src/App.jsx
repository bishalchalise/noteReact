import Note from "./components/Note";
import { useState, useEffect } from "react";
import noteService from "./services/notes";
import "./index.css";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNotes, setNewNotes] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  const handleOnSubmit = (event) => {
    event.preventDefault();

    const noteObject = {
      important: Math.random() < 0.5,
      content: newNotes,
    };

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNotes("");
    });
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    console.log(note.important);
    const changedNote = { ...note, important: !note.important };
    noteService
      .update(id, changedNote)
      .then((returnedNote) =>
        setNotes(notes.map((note) => (note.id === id ? returnedNote : note)))
      )
      .catch((error) => {
        setErrorMessage(
          `Note: ${note.content} was already remoed form the server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);

        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const handleOnChange = (event) => {
    setNewNotes(event.target.value);
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={handleOnSubmit}>
        <input value={newNotes} onChange={handleOnChange} />
        <button>Save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;
