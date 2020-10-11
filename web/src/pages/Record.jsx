import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "reactstrap";
import firebase from "../firebase";

import Message from "../components/Message";

export default (props) => {
    const [messages, setMessages] = useState([]);
    const [keywords, setKeywords] = useState([]);
    const [summary, setSummary] = useState("");

    useEffect(() => {
        const recordRef = firebase.firestore().collection("records").doc(props.match.params.id);
        async function getRecords() {
            const snapshot = await recordRef.get();
            if (snapshot.empty) {
                console.log("Record not found!");
            } else {
                setSummary(snapshot.data().summary);
                setKeywords(snapshot.data().keywords);
            }
        }

        const messagesRef = firebase.firestore().collection("messages");
        async function getMessages() {
            const snapshot = await messagesRef.where("record", "==", recordRef).get();
            if (snapshot.empty) {
                console.log("No messages!");
            } else {
                setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
            }
        }

        getRecords();
        getMessages();
    }, [props.match.params.id]);

    if (messages.length === 0) return null;
    return (
        <Container>
            <Row>
                <Col md={6}>
                    <Row>
                        {messages.map((message) => (
                            <Message {...message} />
                        ))}
                    </Row>
                </Col>
                <Col>
                    <Container fluid className="rounded p-4 discord-bg-tertiary">
                        <div className="mb-3">
                            <h3 className="discord-fg-primary"> summary </h3>
                            <div className="discord-fg-primary"> {summary} </div>
                        </div>
                        <div className="mt-3">
                            <h4 className="discord-fg-primary"> keywords </h4>
                            <div className="discord-fg-secondary"> {keywords} </div>
                        </div>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};
