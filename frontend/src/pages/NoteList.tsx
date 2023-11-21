import { useState } from "react";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Tag } from "../App";

type NoteListProps = {
    availableTags: Tag[];
};

export const NoteList = ({ availableTags }: NoteListProps) => {
    const [title, setTitle] = useState("");
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

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
        </Container>
    );
};
