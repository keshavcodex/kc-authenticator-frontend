interface ValidationResult {
	isValid: boolean;
	errors: string[];
}

export const loginValidator = (data: {
	[key: string]: string;
}): ValidationResult => {
	const errors: string[] = [];
	let isValid = true;

	// Email validation
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailPattern.test(data.devEmail)) {
		isValid = false;
		errors.push('Invalid email address.');
	}

	// Password validation
	if (data.password.length < 6) {
		isValid = false;
		errors.push('Password must be at least 6 characters long.');
	}

	return { isValid, errors };
};

export const signUpValidator = (data: {
	[key: string]: string;
}): ValidationResult => {
	const errors: string[] = [];
	let isValid = true;

	// First name validation
	if (data.firstName.trim() === '') {
		isValid = false;
		errors.push('First name is required.');
	}

	// Phone number validation (basic validation)
	const phonePattern = /^\+?[1-9]\d{1,14}$/; // E.164 format
	if (!phonePattern.test(data.phone)) {
		isValid = false;
		errors.push('Please enter a valid phone number.');
	}

	// Email validation
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailPattern.test(data.devEmail)) {
		isValid = false;
		errors.push('Invalid email address.');
	}

	// Password validation
	if (data.password.length < 6) {
		isValid = false;
		errors.push('Password must be at least 6 characters long.');
	} else if (data.password != data.cnfPassword){
		isValid = false;
		errors.push('Password and confirm password is not same');
	}

	return { isValid, errors };
};

export const passwordValidator = (data: {
	[key: string]: string;
}): ValidationResult => {
	const errors: string[] = [];
	let isValid = true;

	// Password validation
	if (data.password.length < 6) {
		isValid = false;
		errors.push('Password must be at least 6 characters long.');
	} else if (data.password != data.cnfPassword){
		isValid = false;
		errors.push('Password and confirm password is not same');
	}

	return { isValid, errors };
};

