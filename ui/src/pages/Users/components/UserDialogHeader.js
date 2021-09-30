import React from 'react';

import { Button } from '@blueprintjs/core';

const getHeader = (isEditDialog) => {
	if (isEditDialog) return 'Edit User';
	return 'Add New User';
};

const UserDialogHeader = (props) => {
	const { isEditDialog, onClose } = props;
	return (
		<>
			<div style={{ display: 'flex', alignSelf: 'flex-start' }}>
				<Button icon="arrow-left" minimal small onClick={onClose} />
				<h3 className="bp3-heading" style={{ marginBottom: 0 }}>
					{getHeader(isEditDialog)}
				</h3>
			</div>
		</>
	);
};

export default UserDialogHeader;
