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
                <ListGroup.Item as={Link} to="/hook2">
                    useEffect 훅-Clock
                </ListGroup.Item>
                <ListGroup.Item as={Link} to="/hook3">
                    useRef 훅
                </ListGroup.Item>
                <ListGroup.Item as={Link} to="/hook4">
                    useNavigate 훅
                </ListGroup.Item>

                <ListGroup.Item as={Link} to="/hook5">
                    useMemo 훅
                </ListGroup.Item>
                <ListGroup.Item as={Link} to="/hook6">
                    useCallback 훅
                </ListGroup.Item>
                <ListGroup.Item as={Link} to="/hook7">
                    useContext 훅
                </ListGroup.Item>
                <ListGroup.Item as={Link} to="/ajax1/3">
                    Rest API 1
                </ListGroup.Item>
                <ListGroup.Item as={Link} to="/ajax2">
                    Rest API 2
                </ListGroup.Item>
            </ListGroup>
        </Stack>
    );
}
