import { Container } from "react-bootstrap";
import { NoteForm } from "../components/NoteForm";
import { NoteData, Tag } from "../App";
import { useNote } from "../components/NoteLayout";

type EditNoteProps = {
    onSubmit: (id: string, data: NoteData) => void;
    onAddTag: (tag: Tag) => void;
    availableTags: Tag[];
};

export const EditNote = ({
    onSubmit,
    onAddTag,
    availableTags,
}: EditNoteProps) => {
    const note = useNote();

    return (
        <Container className="my-4">
            <h1 className="my-4" style={{ color: "navy" }}>
                <u>Edit Note</u>
            </h1>

            <NoteForm
                onSubmit={(data) => onSubmit(note.id, data)}
                onAddTag={onAddTag}
                availableTags={availableTags}
                // populate defaultValue NoteForm:
                title={note.title}
                tags={note.tags}
                markdown={note.markdown}
            />
        </Container>
    );
};
