import styles from '../Notes.module.css';

async function getNote(noteId) {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/notes/records/${noteId}`,
    {
      next: { revalidate: 10 },
    }
  );
  const data = await res.json();
  return data;
}

function formatTime(created) {
  const date = new Date(created);
  const time = date.toLocaleTimeString();
  return time;
}

export default async function NotePage({ params }) {
  const note = await getNote(params.id);

  return (
    <div>
      <h1>notes/{note.id}</h1>
      <div className={styles.note}>
        <h3 className={styles.title}>{note.title}</h3>
        <h5 className={styles.content}>{note.content}</h5>
        <p>Created: {formatTime(note.created)}</p>
      </div>
    </div>
  );
}
