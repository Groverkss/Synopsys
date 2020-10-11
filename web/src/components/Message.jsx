import React from "react";
import { Col, Card, CardBody } from "reactstrap";

export default (props) => {
    return (
        <Col xs={12} key={props.id} className="my-1">
            <Card className="w-100 discord-bg-secondary">
                <CardBody className="p-2">
                    <div>
                        <span className="discord-fg-primary font-weight-bold">{props.author}</span>
                        <span className="discord-fg-secondary ml-2">
                            {props.datetime.toDate().toLocaleString()}
                        </span>
                    </div>
                    <div className="discord-fg-primary">{props.content}</div>
                </CardBody>
            </Card>
        </Col>
    );
};
