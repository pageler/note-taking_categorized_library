import { useMemo, useState } from "react";
import {
    Badge,
    Button,
    Card,
    Col,
    Container,
    Form,
    Row,
    Stack,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Tag } from "../App";
import styles from "../components/NoteList.module.css";

type NoteListProps = {
    availableTags: Tag[];
    notes: SimplifiedNote[];
};

type SimplifiedNote = {
    id: string;
    title: string;
    tags: Tag[];
};

export const NoteList = ({ availableTags, notes }: NoteListProps) => {
    const [title, setTitle] = useState("");
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

    const filteredNotes = useMemo(() => {
        return notes.filter((note) => {
            return (
                (title === "" ||
                    note.title.toLowerCase().includes(title.toLowerCase())) &&
                (selectedTags.length > 0 ||
                    selectedTags.every((tag) =>
                        note.tags.some((noteTag) => noteTag.id === tag.id)
                    ))
            );
        });
    }, [title, selectedTags, notes]);

    return (
        <Container className="my-4">
            <Row className="align-items-center my-4">
                <Col>
                    <h1 style={{ color: "navy" }}>
                        <u>Your Note List</u>
                    </h1>
                </Col>

                <Col xs="auto">
                    <Stack direction="horizontal" gap={2}>
                        <Link to="/new">
                            <Button variant="primary">Create New Note</Button>
                        </Link>
                        <Button variant="outline-secondary">
                            Edit Category Tags
                        </Button>
                    </Stack>
                </Col>
            </Row>

            <Form>
                <Row className="mb-4">
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Search By Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Search By Tags</Form.Label>
                            <ReactSelect
                                isMulti
                                options={availableTags.map((tag) => {
                                    return { label: tag.label, value: tag.id };
                                })}
                                onChange={(tags) => {
                                    setSelectedTags(
                                        tags.map((tag) => {
                                            return {
                                                label: tag.label,
                                                id: tag.value,
                                            };
                                        })
                                    );
                                }}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>

            <Row xs={1} sm={2} md={3} lg={4} className="g-3">
                {filteredNotes.map((note) => (
                    <Col key={note.id}>
                        <NoteCard
                            id={note.id}
                            title={note.title}
                            tags={note.tags}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

function NoteCard({ id, title, tags }: SimplifiedNote) {
    return (
        <Card
            as={Link}
            to={`/${id}`}
            className={`h-100 text-reset text-decoration-none ${styles.card}`}
        >
            <Card.Body>
                <Stack
                    gap={2}
                    className="align-items-center adjust-content-center h-100"
                >
                    <span className="fs-5">{title}</span>
                    {tags.length > 0 && (
                        <Stack
                            direction="horizontal"
                            gap={1}
                            className="justify-content-center flex-wrap"
                        >
                            {tags.map((tag) => (
                                <Badge key={tag.id} className="text-truncate">
                                    {tag.label}
                                </Badge>
                            ))}
                        </Stack>
                    )}
                </Stack>
            </Card.Body>
        </Card>
    );
}
