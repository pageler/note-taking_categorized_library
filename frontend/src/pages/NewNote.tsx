import { Container } from "react-bootstrap";
import { NoteForm } from "../components/NoteForm";
import { NoteData, Tag } from "../App";
import { Header } from "../components/Header";

type NewNoteProps = {
    onSubmit: (data: NoteData) => void;
    availableTags: Tag[];
    onAddTag: (tag: Tag) => void;
};

export const NewNote = ({
    onSubmit,
    availableTags,
    onAddTag,
}: NewNoteProps) => {
    return (
        <>
            <Header />
            <Container className="my-4" style={{ color: "navy" }}>
                <h1>
                    <u>Create New Note</u>
                </h1>

                <NoteForm
                    onSubmit={onSubmit}
                    availableTags={availableTags}
                    onAddTag={onAddTag}
                />
            </Container>
        </>
    );
};
