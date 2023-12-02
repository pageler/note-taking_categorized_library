import { Container } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

type LoadingProps = {};

const size = 100;

export const Loading = (props: LoadingProps) => {
    return (
        <Container>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                }}
            >
                <Spinner
                    style={{
                        width: size,
                        height: size,
                    }}
                    animation="border"
                    variant="secondary"
                />
            </div>
        </Container>
    );
};
