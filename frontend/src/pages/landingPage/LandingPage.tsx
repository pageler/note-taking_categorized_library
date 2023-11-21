import { Button, Container, Row } from "react-bootstrap";
import "./LandingPage.css";

type LandingPageProps = {};

export const LandingPage = (props: LandingPageProps) => {
    return (
        <div className="main">
            <Container>
                <Row>
                    <div className="intro-text">
                        <div>
                            <h1 className="title">
                                Your Note Taking Categorized Library
                            </h1>
                            <p className="subtitle">
                                Secure storage for all your notes.
                            </p>
                        </div>
                        <div className="buttonContainer">
                            <a href="/login">
                                <Button
                                    size="lg"
                                    className="landingButton"
                                    variant="warning"
                                >
                                    Login
                                </Button>
                            </a>
                            <a href="/register">
                                <Button
                                    size="lg"
                                    className="landingButton"
                                    variant="outline-warning"
                                >
                                    Signup
                                </Button>
                            </a>
                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    );
};
