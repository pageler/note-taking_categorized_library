import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { ErrorMessage } from "../../components/ErrorMessage";
import { Loading } from "../../components/Loading";
import { Link } from "react-router-dom";
import axios, { AxiosRequestConfig } from "axios";

type RegisterPageProps = {};

export const RegisterPage = (props: RegisterPageProps) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pic, setPic] = useState(
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    );
    const [message, setMessage] = useState<string | null>("");
    const [picMessage, setPicMessage] = useState<string | null>("");

    const postDetails = (pics: any) => {
        if (!pics) {
            return setPicMessage("Please select an image.");
        }
        setPicMessage(null);

        if (
            pics.type === "image/jpeg" ||
            pics.type === "image/png" ||
            pics.type === "image/jpg"
        ) {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "note-taking_categorized_library");
            data.append("cloud_name", "harakido1");
            fetch("https://api.cloudinary.com/v1_1/harakido1/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setPic(data.url.toString());
                })
                .catch((err: any) => {
                    console.log(err);
                });
        } else {
            return setPicMessage("Please select an image.");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
        } else {
            setMessage(null);
            try {
                const config: AxiosRequestConfig = {
                    headers: {
                        "Content-type": "application/json",
                    },
                };

                setLoading(true);

                const { data } = await axios.post(
                    "/api/users",
                    { name, email, password, pic },
                    config
                );

                setLoading(false);
                console.log("POST DATA", data);
                localStorage.setItem("userInfo", JSON.stringify(data));
            } catch (error: any) {
                setError(error.response.data.message);
                setLoading(false);
            }
        }
    };

    return (
        <Container
            className="my-4"
            style={{
                border: "4px solid grey",
                padding: "20px",
                width: "35%",
                backgroundColor: "lightgrey",
            }}
        >
            <h1 className="my-4" style={{ color: "navy" }}>
                <u>Register User</u>
            </h1>

            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
            {loading && <Loading />}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="my-4" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="name"
                        value={name}
                        placeholder="Enter name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-4" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        placeholder="Enter email address"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-4" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-4" controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>

                {picMessage && (
                    <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
                )}
                <Form.Group className="mb-4" controlId="pic">
                    <Form.Label>Profile Picture</Form.Label>
                    <Form.Control
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            postDetails(e.target.files?.[0])
                        }
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mb-4">
                    Submit
                </Button>
            </Form>

            <Row className="py-4">
                <Col>
                    Returning User? <Link to="/login">Please Login Here</Link>
                </Col>
            </Row>
        </Container>
    );
};
