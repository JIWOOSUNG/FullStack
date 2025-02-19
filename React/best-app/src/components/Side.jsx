import React from 'react';
import { Stack, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export default function Side({ onShowLogin }) {
    return (
        <Stack gap={2} className="col-md-10 mx-auto">
            <Button variant="primary" as={Link} to="/">
                Home
            </Button>
            <Button variant="outline-success" as={Link} to="/signup">
                SignUp
            </Button>
            <Button variant="outline-success" onClick={() => onShowLogin(true)} as={Link}>
                SignIn
            </Button>
            <Button variant="outline-success" as={Link} to="/signup">
                Logout
            </Button>

            <hr></hr>
            <ListGroup>
                <ListGroup.Item as={Link} to="/hook1">
                    Menu 1
                </ListGroup.Item>
                <ListGroup.Item as={Link} to="/hook2">
                    Menu 2
                </ListGroup.Item>
            </ListGroup>
        </Stack>
    );
}
