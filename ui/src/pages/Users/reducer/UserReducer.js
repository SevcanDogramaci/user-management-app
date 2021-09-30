export default function UserReducer(state, action) {
	switch (action.type) {
		case 'set-all': {
			return {
				name: action.value.name,
				surname: action.value.surname,
				id: action.value.id,
			};
		}
		case 'reset': {
			return {
				name: '',
				surname: '',
				id: null,
			};
		}
		default:
			throw new Error();
	}
}
