// Side.jsx
import React from 'react';
import { Stack, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Side() {
    return (
        <Stack gap={2} className="col-md-5 mx-auto">
            {/* <Link to="/">Home</Link> */}
            <Button variant="primary" as={Link} to="/">
                Home
            </Button>
            <hr></hr>
            <ListGroup>
                <ListGroup.Item as={Link} to="/hook1">
                    useEffect 훅
                </ListGroup.Item>
            </ListGroup>
        </Stack>
    );
}
