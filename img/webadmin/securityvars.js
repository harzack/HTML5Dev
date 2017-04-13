var SecurityVars = new function()
{
	var _theForm;

	return {
		/*
		 * Initialize the object
		 * 
		 * @param theForm	Securityvars form
		 */
		init: function( theForm )
		{
			_theForm = theForm;
			this.disableLoginFieldsSet();
			this.disableMultipleFieldsSet();
		},

		/*
	 	* Enable or disable the login fields on the form when the "Disable log-in when password incorrect" 
		* checkbox is changed.
	 	*/
		disableLoginFieldsSet: function()
		{
			var disable = !_theForm.disableLoginEnabled.checked;
			var webAdminDisable = !_theForm.disableWebAdminLoginEnabled.checked;
			var adminEmailDisable = !_theForm.emailAdminOnFailure.checked;

			_theForm.disableLoginAttempts.disabled = disable;
			_theForm.disableLoginEmailAdmin.disabled = disable;

			_theForm.disableWebAdminLoginAttempts.disabled = webAdminDisable;
			_theForm.disableWebAdminLockoutTime.disabled = webAdminDisable;
			_theForm.disableWebAdminLoginEmailAdmin.disabled = webAdminDisable;

			_theForm.emailAdminOnFailureThreshold.disabled = adminEmailDisable;
		},

		/*
	 	* Enable or disable the MultipleMachineSessionsExceptions field when the "Disable simultaneous
		* sessions" checkbox is changed.
	 	*/
		disableMultipleFieldsSet: function()
		{
			var disable = !_theForm.disableMultipleMachineSessions.checked;

			_theForm.disableMultipleMachineSessionsExceptions.disabled = disable;
		},

		/*
		 * Enable the login attempts and machine sessions enabled fields.  This is done on
		 * submission so that values are submitted.
		 */
		enableAllFields: function()
		{
			_theForm.disableLoginAttempts.disabled = false;
			_theForm.disableLoginEmailAdmin.disabled = false;
			_theForm.disableMultipleMachineSessionsExceptions.disabled = false;
		}
	}
}
