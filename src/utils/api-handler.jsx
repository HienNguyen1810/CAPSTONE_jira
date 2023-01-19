import { notification } from 'antd';

const responseErrorHandler = (message, skipNotification) => {
	!skipNotification && notification.error({ message });
};

export const apiHandler = async (args) => {
	const {
		service,
		successMessage,
		errorMessage,
		successCallback,
		failCallback,
		onFinally,
		skipNotification,
		_isReturnResponse,
	} = args;
	try {
		const response = await service;

		const { statusCode, message } = response.data;

		if (statusCode < 300) {
			!skipNotification &&
				successMessage &&
				notification.success({ message: successMessage || message });

			if (successCallback) {
				await successCallback(response.data);
			}
		} else {
			responseErrorHandler(message, skipNotification);
			failCallback && failCallback(message);
		}
	} catch (error) {
		responseErrorHandler(errorMessage, skipNotification);
		failCallback && failCallback(error);
	}

	onFinally && onFinally();
};
