import { Alert } from "react-bootstrap";

type ErrorMessageProps = {
    children: React.ReactNode;
    variant: string;
};

export const ErrorMessage = ({
    variant = "info",
    children,
}: ErrorMessageProps) => {
    return (
        <>
            <Alert variant={variant} style={{ fontSize: 20 }}>
                <strong>{children}</strong>
            </Alert>
        </>
    );
};
