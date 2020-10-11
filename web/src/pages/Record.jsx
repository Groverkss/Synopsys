import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
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
            const snapshot = await messagesRef
                .where("record", "==", `/records/${props.match.params.id}`)
                .get();
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
        <Container className="pb-5">
            <Row>
                <Col md={6}>
                    <Container fluid className="rounded p-4 discord-bg-tertiary">
                        <h3 className="discord-fg-primary">
                            <span className="discord-fg-secondary">#</span> messages
                        </h3>
                        <Row className="mt-4">
                            {messages.map((message) => (
                                <Message {...message} />
                            ))}
                        </Row>
                    </Container>
                </Col>
                <Col>
                    <Container fluid className="rounded p-4 discord-bg-tertiary">
                        <div className="mb-5">
                            <h3 className="discord-fg-primary">
                                <span className="discord-fg-secondary">#</span> summary
                            </h3>
                            <div className="discord-fg-primary mt-4"> {summary} </div>
                        </div>
                        <div className="mt-5">
                            <h5 className="discord-fg-primary">
                                <span className="discord-fg-secondary">#</span> keywords
                            </h5>
                            <div className="discord-fg-secondary mt-3"> {keywords.join(", ")} </div>
                        </div>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};
