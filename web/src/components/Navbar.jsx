import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";

export default () => {
    return (
        <Navbar dark className="shadow-sm discord-bg-primary mb-5">
            <NavbarBrand href="/" className="font-weight-bold">
                SummarizerBot
            </NavbarBrand>
        </Navbar>
    );
};
