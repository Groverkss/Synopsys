import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import firebase from "../firebase";

export default () => {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        firebase
            .firestore()
            .collection("records")
            .onSnapshot((snapshot) => {
                const newRecords = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setRecords(newRecords);
            });
    }, []);

    if (records.length === 0) return null;
    return (
        <Container>
            {console.log(records)}
            <Row>
                {records.map((record) => (
                    <Col xs={12} key={record.id}>
                        <Card
                            tag={Link}
                            to={`/records/${record.id}`}
                            className="w-100 discord-bg-tertiary discord-fg-primary my-2"
                        >
                            <CardBody>{`Recording: ${record.datetime.toDate()}`}</CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};
