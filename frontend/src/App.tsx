import "bootstrap/dist/css/bootstrap.min.css";
import { LandingPage } from "./pages/landingPage/LandingPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { NoteList } from "./pages/NoteList";
import { NewNote } from "./pages/NewNote";
import { NoteDetails } from "./pages/NoteDetails";
import { EditNote } from "./pages/EditNote";

function App() {
    return (
        <>
            <div>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/list" element={<NoteList />} />
                    <Route path="/new" element={<NewNote />} />
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
