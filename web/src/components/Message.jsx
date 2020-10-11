import React from "react";
import { Col, Card } from "reactstrap";

export default (props) => {
    return (
        <Col xs={12} key={props.id}>
            <Card className="w-100">
                <div>{`${props.author} at ${props.datetime.toDate()}`}</div>
                {props.content}
            </Card>
        </Col>
    );
};
