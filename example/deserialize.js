/*
			deserialize function from: 
			url: https://stackoverflow.com/a/24441276/3396168
			author: https://stackoverflow.com/users/1766230/luke
		*/
		$.fn.deserialize = function (serializedString, reset=true) 
		{
			var $form = $(this);
			if(reset) $form[0].reset();    // (A) optional
			serializedString = serializedString.replace(/\+/g, '%20'); // (B)
			var formFieldArray = serializedString.split("&");

			// Loop over all name-value pairs
			$.each(formFieldArray, function(i, pair){
				var nameValue = pair.split("=");
				var name = decodeURIComponent(nameValue[0]); // (C)
				var value = decodeURIComponent(nameValue[1]);
				// Find one or more fields
				var $field = $form.find('[name=' + name + ']');

				// Checkboxes and Radio types need to be handled differently
				if ($field[0].type == "radio" || $field[0].type == "checkbox") 
				{
					var $fieldWithValue = $field.filter('[value="' + value + '"]');
					var isFound = ($fieldWithValue.length > 0);
					// Special case if the value is not defined; value will be "on"
					if (!isFound && value == "on") {
						$field.first().prop("checked", true);
					} else {
						$fieldWithValue.prop("checked", isFound);
					} 
				} else { // input, textarea
					$field.val(value);
				}
			});
			return this;
		}
	