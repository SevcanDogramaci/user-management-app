import React from 'react';

import ValidatedTextInput from './ValidatedTextInput';

const UserDialogInputs = (props) => {
	const { user, control, errors } = props;

	return (
		<>
			<div style={{ display: 'flex', flexDirection: 'row', margin: '5%' }}>
				<div style={{ display: 'flex', flexDirection: 'column', marginRight: '1%' }}>
					<ValidatedTextInput
						inputName="name"
						control={control}
						rules={{
							required: { value: true, message: 'Name is required' },
						}}
						error={errors.name}
						defaultValue={user.name}
					/>
					<ValidatedTextInput
						inputName="surname"
						control={control}
						rules={{
							required: { value: true, message: 'Surname is required' },
						}}
						error={errors.surname}
						defaultValue={user.surname}
					/>
				</div>
				<ValidatedTextInput
					inputName="id"
					control={control}
					rules={{
						required: { value: true, message: 'ID is required' },
						maxLength: { value: 5, message: 'ID must be 5 characters long' },
						minLength: { value: 5, message: 'ID must be 5 characters long' },
					}}
					error={errors.id}
					defaultValue={user.id}
				/>
			</div>
		</>
	);
};

export default UserDialogInputs;
