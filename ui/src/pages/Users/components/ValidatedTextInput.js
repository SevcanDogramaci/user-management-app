import { FormGroup, InputGroup, Intent } from '@blueprintjs/core';
import React from 'react';
import { Controller } from 'react-hook-form';

const ValidatedTextInput = (props) => {
	const { inputName, defaultValue, control, rules, error } = props;

	return (
		<Controller
			name={inputName}
			control={control}
			rules={rules}
			defaultValue={defaultValue}
			render={({ field: { onChange, value, name, ref } }) => (
				<FormGroup intent={error && Intent.DANGER} helperText={error && error.message}>
					<InputGroup
						large
						placeholder={`Enter your ${name}`}
						value={value}
						name={name}
						onChange={onChange}
						inputRef={ref}
					/>
				</FormGroup>
			)}
		/>
	);
};

export default ValidatedTextInput;
