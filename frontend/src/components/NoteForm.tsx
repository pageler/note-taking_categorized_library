import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";

type NoteFormProps = {};

export const NoteForm = (props: NoteFormProps) => {
    return (
        <Form className="my-4">
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control required />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <CreatableReactSelect isMulti />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="markdown">
                    <Form.Label>Body (Markdown)</Form.Label>
                    <Form.Control required as="textarea" rows={15} />
                </Form.Group>

                <Stack
                    direction="horizontal"
                    gap={2}
                    className="justify-content-end"
                >
                    <a
                        href="https://www.markdownguide.org/cheat-sheet/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Markdown Reference
                    </a>

                    <Button type="submit" variant="primary">
                        Save Note
                    </Button>

                    <Link to="..">
                        <Button type="button" variant="outline-secondary">
                            Cancel
                        </Button>
                    </Link>
                </Stack>
            </Stack>
        </Form>
    );
};
