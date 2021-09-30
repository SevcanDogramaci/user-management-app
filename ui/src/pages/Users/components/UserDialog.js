import React, { useEffect, useReducer } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Dialog, Intent, Spinner } from '@blueprintjs/core';

import UserService from '../../../service/UserService';
import UserReducer from '../reducer/UserReducer';
import UserDialogHeader from './UserDialogHeader';
import UserDialogInputs from './UserDialogInputs';
import ToastMessageBuilder, { ToastMessageTypes } from '../util/ToastUtil';

const DEFAULT_USER = {
	name: '',
	surname: '',
	id: null,
};

const UserDialog = (props) => {
	const { userID, isOpen, onClose, onRefresh } = props;
	const {
		control,
		reset,
		handleSubmit,
		formState: { errors, isSubmitting, isDirty },
	} = useForm();
	const [user, setUser] = useReducer(UserReducer, DEFAULT_USER);

	useEffect(() => {
		if (!isOpen) {
			// if dialog closed
			// reset form and state
			reset(DEFAULT_USER);
			setUser({ type: 'reset' });
		} else if (userID) {
			// if dialog opened on user select from table
			// reset form and state to fetched user info
			UserService.getUser(userID)
				.then((fetchedUser) => {
					reset(fetchedUser);
					setUser({ type: 'set-all', value: fetchedUser });
				})
				.catch((error) => onRefresh(new ToastMessageBuilder(ToastMessageTypes.ERROR, error.message)));
		}
	}, [isOpen]);

	const saveUser = (userForm) => {
		// save user and push toast notification
		if (!userID)
			UserService.createUser(userForm)
				.then((successMessage) => onRefresh(new ToastMessageBuilder(ToastMessageTypes.SUCCESS, successMessage)))
				.catch((error) => onRefresh(new ToastMessageBuilder(ToastMessageTypes.ERROR, error.message)));
		else
			UserService.updateUser(user.id, userForm)
				.then((successMessage) => onRefresh(new ToastMessageBuilder(ToastMessageTypes.SUCCESS, successMessage)))
				.catch((error) => onRefresh(new ToastMessageBuilder(ToastMessageTypes.ERROR, error.message)));
	};

	const UserDialogContent = () => {
		if (userID && user.id == null) return <Spinner />; // if user is being fetched
		return (
			<>
				<UserDialogInputs control={control} user={user} errors={errors} />
				<Button
					text={userID ? 'Save' : 'Create'}
					rightIcon="confirm"
					large
					loading={isSubmitting}
					intent={Intent.PRIMARY}
					onClick={handleSubmit(saveUser)}
					disabled={!isDirty}
				/>
			</>
		);
	};

	if (userID && user.id == null) return <Spinner />;

	return (
		<Dialog isOpen={isOpen}>
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '5%' }}>
				<UserDialogHeader isEditDialog={userID != null} onClose={onClose} />
				{UserDialogContent()}
			</div>
		</Dialog>
	);
};

export default UserDialog;
