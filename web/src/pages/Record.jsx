import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import firebase from "../firebase";

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
            {console.log(messages)}
            <Row>
                <Col md={6}>
                    <Row>
                        {messages.map((message) => (
                            <Col xs={12} key={message.id}>
                                {message.author}
                                {`${message.datetime.toDate()}`}
                                {message.content}
                            </Col>
                        ))}
                    </Row>
                </Col>
                <Col>
                    <Container fluid>
                        {`Keywords: ${keywords}`}
                        {`Summary: ${summary}`}
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};
