const Note = ({ note, toggleImportance }) => {
  const label = note.important ? "true" : "False";
  return (
    <li className="notes">
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
};

export default Note;
