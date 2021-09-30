import { Intent } from '@blueprintjs/core';

export const ToastMessageTypes = {
	SUCCESS: 'success',
	ERROR: 'error',
};

const getStyle = (type) => {
	switch (type) {
		case 'error':
			return {
				intent: Intent.DANGER,
				icon: 'error',
			};
		case 'success':
			return {
				intent: Intent.SUCCESS,
				icon: 'tick',
			};
		default:
			return {
				intent: Intent.NONE,
				icon: 'info',
			};
	}
};

export default class ToastMessageBuilder {
	constructor(type, message) {
		this.type = type;
		this.message = message;

		const { intent, icon } = getStyle(this.type);
		this.intent = intent;
		this.icon = icon;
	}
}
