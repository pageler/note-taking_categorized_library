import { Button, Container, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

type HeaderProps = {};

export const Header = (props: HeaderProps) => {
    const navigate = useNavigate();

    return (
        <Navbar style={{ backgroundColor: "#d9b18c" }}>
            <Container>
                <Navbar.Brand
                    href="/"
                    style={{
                        marginTop: "10px",
                        textAlign: "center",
                        textDecoration: "underline",
                        color: "navy",
                        fontFamily: "Lobster",
                        fontSize: "2.5em",
                    }}
                >
                    Note Taking Categorized Library
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text style={{ fontSize: "1.5em", color: "navy" }}>
                        Signed in as: <a href="/register">userName</a>
                    </Navbar.Text>
                </Navbar.Collapse>

                <Button
                    variant="outline-primary"
                    className="justify-content-end"
                    style={{ marginLeft: "30px" }}
                    onClick={() => {
                        localStorage.removeItem("userInfo");
                        navigate("/");
                    }}
                >
                    Logout of Library
                </Button>
            </Container>
        </Navbar>
    );
};
