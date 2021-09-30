import React from 'react';

import { Cell, Column, Table2 } from '@blueprintjs/table';
import { Button, ButtonGroup, Intent } from '@blueprintjs/core';

import ToastMessageBuilder, { ToastMessageTypes } from '../util/ToastUtil';
import UserService from '../../../service/UserService';

const getColumnHeaders = (data) => {
	// extract data keys for using as column headers
	if (Array.isArray(data)) return Object.keys(data[0]);
	return Object.keys(data);
};

const renderColumnName = (columnName) => (
	<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
		<span>{columnName.toUpperCase()}</span>
	</div>
);

const UsersTable = (props) => {
	const { users, onUserSelect, onRefresh } = props;

	const deleteUser = (userID) => {
		UserService.deleteUser(userID)
			.then((successMessage) => onRefresh(new ToastMessageBuilder(ToastMessageTypes.SUCCESS, successMessage)))
			.catch((error) => onRefresh(new ToastMessageBuilder(ToastMessageTypes.ERROR, error.message)));
	};

	const renderDefaultTableCell = (rowId, columnKey) => {
		return (
			<Cell style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				{users[rowId][columnKey]}
			</Cell>
		);
	};

	const renderButtonTableCell = (rowId) => {
		const userID = users[rowId].id;
		return (
			<Cell style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<ButtonGroup style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<Button icon="edit" small minimal intent={Intent.PRIMARY} onClick={() => onUserSelect(userID)} />
					<Button icon="trash" small minimal intent={Intent.DANGER} onClick={() => deleteUser(userID)} />
				</ButtonGroup>
			</Cell>
		);
	};

	if (users.length === 0) return <p>No users yet !</p>;

	return (
		<Table2 numRows={users.length} defaultRowHeight={30}>
			{getColumnHeaders(users).map((columnHeader) => (
				<Column
					key={columnHeader}
					name={columnHeader}
					cellRenderer={(rowId) => renderDefaultTableCell(rowId, columnHeader)}
					nameRenderer={(columnName) => renderColumnName(columnName)}
				/>
			))}
			<Column
				key="actions"
				name="actions"
				cellRenderer={(rowId) => renderButtonTableCell(rowId)}
				nameRenderer={(columnName) => renderColumnName(columnName)}
			/>
		</Table2>
	);
};

export default UsersTable;
