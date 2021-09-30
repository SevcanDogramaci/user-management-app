import React, { useEffect, useState } from 'react';

import { Button, Intent, Position, Spinner, Toaster, Toast } from '@blueprintjs/core';

import ToastMessageBuilder, { ToastMessageTypes } from './util/ToastUtil';
import UserService from '../../service/UserService';
import UserDialog from './components/UserDialog';
import UsersTable from './components/UserTable';

const UsersPage = () => {
	const [users, setUsers] = useState(null);
	const [toastInfo, setToastInfo] = useState(null);
	const [dialogInfo, setDialogInfo] = useState({
		isOpen: false,
		selectedUserID: null,
	});

	const openNewUserDialog = () => setDialogInfo({ ...dialogInfo, isOpen: true });
	const openEditUserDialog = (userID) => setDialogInfo({ isOpen: true, selectedUserID: userID });
	const closeDialog = () => setDialogInfo({ isOpen: false, selectedUserID: null });
	const refreshPage = (toast) => {
		setToastInfo(toast);
		UserService.getAllUsers()
			.then((fetchedUsers) => setUsers(fetchedUsers))
			.catch((err) => setToastInfo(new ToastMessageBuilder(ToastMessageTypes.ERROR, err.message)));
		closeDialog();
	};

	useEffect(() => {
		refreshPage(null);
	}, []);

	if (!users) return <Spinner />;
	return (
		<div style={{ display: 'flex', flexDirection: 'column', minWidth: '20%' }}>
			<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '1%' }}>
				<h2 className="bp3-heading">User List</h2>
				<Button text="New User" rightIcon="plus" intent={Intent.SUCCESS} onClick={openNewUserDialog} />
			</div>
			<Toaster position={Position.RIGHT_TOP}>
				{toastInfo && (
					<Toast
						message={toastInfo.message}
						intent={toastInfo.intent}
						icon={toastInfo.icon}
						onDismiss={() => setToastInfo(null)}
					/>
				)}
			</Toaster>
			<UsersTable users={users} onUserSelect={openEditUserDialog} onRefresh={refreshPage} />
			<UserDialog
				userID={dialogInfo.selectedUserID}
				isOpen={dialogInfo.isOpen}
				onRefresh={refreshPage}
				onClose={closeDialog}
			/>
		</div>
	);
};

export default UsersPage;
