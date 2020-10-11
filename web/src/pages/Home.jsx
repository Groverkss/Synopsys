import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
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
                        {`Recording: ${record.datetime.toDate()}`}
                    </Col>
                ))}
            </Row>
        </Container>
    );
};
