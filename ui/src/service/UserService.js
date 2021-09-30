import axios from 'axios';

const extractError = (errorResponse) => {
	const { error } = errorResponse.data;
	return error;
};

const throwError = (errorResponse) => {
	throw new Error(`Failed: ${extractError(errorResponse)}`);
};

const AXIOS_INSTANCE = axios.create({
	baseURL: 'http://127.0.0.1:8080/',
});

export default class UserService {
	static async getAllUsers() {
		return AXIOS_INSTANCE.get(`/users`)
			.then((res) => res.data)
			.catch((err) => throwError(err.response));
	}

	static async getUser(userID) {
		return AXIOS_INSTANCE.get(`/user/${userID}`)
			.then((res) => res.data)
			.catch((err) => throwError(err.response));
	}

	static async createUser(userData) {
		return AXIOS_INSTANCE.post(`/user`, userData)
			.then(() => 'Successfully created')
			.catch((err) => throwError(err.response));
	}

	static async updateUser(userID, userData) {
		return AXIOS_INSTANCE.put(`/user/${userID}`, userData)
			.then(() => 'Successfully updated')
			.catch((err) => throwError(err.response));
	}

	static async deleteUser(userID) {
		return AXIOS_INSTANCE.delete(`/user/${userID}`)
			.then(() => 'Successfully deleted')
			.catch((err) => throwError(err.response));
	}
}
