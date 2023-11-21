import "bootstrap/dist/css/bootstrap.min.css";
import { LandingPage } from "./pages/landingPage/LandingPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { NoteList } from "./pages/NoteList";
import { NewNote } from "./pages/NewNote";
import { NoteDetails } from "./pages/NoteDetails";
import { EditNote } from "./pages/EditNote";
import { useMemo, useState } from "react";
import { v4 as uuidV4 } from "uuid";

export type Note = {
    id: string;
} & NoteData;

export type NoteData = {
    title: string;
    markdown: string;
    tags: Tag[];
};

export type Tag = {
    id: string;
    label: string;
};

export type RawNote = {
    id: string;
} & RawNoteData;

export type RawNoteData = {
    title: string;
    markdown: string;
    tagIds: string[];
};

function App() {
    const [notes, setNotes] = useState<RawNote[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);

    const notesWithTags = useMemo(() => {
        return notes.map((note) => {
            return {
                ...note,
                tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
            };
        });
    }, [notes, tags]);

    function onCreateNote({ tags, ...data }: NoteData) {
        setNotes((prevNotes) => {
            return [
                ...prevNotes,
                { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
            ];
        });
    }

    function onAddTag(tag: Tag) {
        setTags((prevTags) => [...prevTags, tag]);
    }

    return (
        <>
            <div>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/list" element={<NoteList />} />
                    <Route
                        path="/new"
                        element={
                            <NewNote
                                onSubmit={onCreateNote}
                                availableTags={tags}
                                onAddTag={onAddTag}
                            />
                        }
                    />
                    <Route path="/:id">
                        <Route index element={<NoteDetails />} />
                        <Route path="edit" element={<EditNote />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/list" />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
