import { Container } from "react-bootstrap";
import { NoteForm } from "../components/NoteForm";

type NewNoteProps = {};

export const NewNote = (props: NewNoteProps) => {
    return (
        <Container className="my-4" style={{ color: "navy" }}>
            <h1>
                <u>Create New Note</u>
            </h1>

            <NoteForm />
        </Container>
    );
};
