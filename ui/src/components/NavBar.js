import { Alignment, Icon, Navbar, NavbarGroup, NavbarHeading } from '@blueprintjs/core';
import React from 'react';

const NavBar = () => {
	return (
		<Navbar>
			<NavbarGroup align={Alignment.RIGHT}>
				<NavbarHeading>User Management App</NavbarHeading>
				<Icon icon="people" size={18} />
			</NavbarGroup>
		</Navbar>
	);
};

export default NavBar;
