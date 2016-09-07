function handleSubmit (e) {
	var submitButton = document.getElementById('emailFormSubmit');
	var form = $('#emailForm');
	var message = document.getElementById('emailFormMessage');
	
	var nameField = document.getElementById('emailFormName');
	var nameText = document.getElementById('emailFormNameText');
	var emailField = document.getElementById('emailFormEmail');
	var emailText = document.getElementById('emailFormEmailText');
	
	// Reset previous messages
	document.getElementsByClassName('form-control has-error').className = 'form-control';
	nameText.innerHTML = '';
	emailText.innerHTML = '';
	message.innerHTML = '';
	
	// Stops form from submitting
	e.preventDefault();
	
	submitButton.innerHTML = 'Submitting';
	submitButton.disabled = true;
	
	var formData = form.serializeArray().reduce(function (obj, item) {
		obj[item.name] = item.value;
		return obj;
	}, {});
	
	$.ajax({
		url: '/email',
		type: 'POST',
		data: formData,
		success: function (jqXHR) {
			submitButton.innerHTML = 'Submit Another';
			submitButton.disabled = false;
			message.innerHTML = 'Your email has been registered successfully, thank you.';			
		},
		error: function (jqXHR) {
			submitButton.innerHTML = 'Try again';
			submitButton.disabled = false;
			var response = JSON.parse(jqXHR.responseText);
			var detail = response.detail.detail;
			message.innerHTML = 'An error occured, please check your inputs';
			if (detail.name) {
				nameField.className = 'form-control has-error';
				nameText.innerHTML = detail.name.error;
			}
			if (detail.email) {
				emailField.className = 'form-control has-error';
				emailText.innerHTML = detail.email.error;
			}
			if (detail.errors) {
				if (detail.errors.name) {
					nameField.className = 'form-control has-error';
					nameText.innerHTML = detail.errors.name.name + ': ' + detail.errors.name.message;
				}
				if (detail.errors.email) {
					emailField.className = 'form-control has-error';
					emailText.innerHTML = detail.errors.email.name + ': ' + detail.errors.email.message;
				}
			}
		},
	})
}
