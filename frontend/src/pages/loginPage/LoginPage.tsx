import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loading } from "../../components/Loading";
import { ErrorMessage } from "../../components/ErrorMessage";

type LoginPageProps = {};

export const LoginPage = (props: LoginPageProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const config: AxiosRequestConfig = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            setLoading(true);

            const { data } = await axios.post(
                "/api/users/login",
                { email, password },
                config
            );

            console.log("POST DATA", data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
        } catch (error: any) {
            setError(error.response.data.message);
            setLoading(false);
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
                <u>User Login</u>
            </h1>

            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

            {loading && <Loading />}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="my-4" controlId="email">
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
                <Button variant="primary" type="submit" className="mb-4">
                    Submit
                </Button>
            </Form>

            <Row className="py-4">
                <Col>
                    New User? <Link to="/register">Please Register Here</Link>
                </Col>
            </Row>
        </Container>
    );
};
