/*global define */

/**
 * Anova IT Consulting 2011
 *
 * This file is licensed under the GPL version 3.
 * Please refer to the URL http://www.gnu.org/licenses/gpl-3.0.html for details.
 */

/**
 * @import de.bassistance:jquery-validate
 */

define(["jquery", "Task", "Storage"], function($, Task, db) {
	function display_errors(params, errors) {
		var field, have_errors;
		have_errors = false;

		// remove the invalid class for all inputs
		$(":input.invalid").removeClass("invalid");

		// iterate through the fields specified in the errors array
		for (field in errors) {
			have_errors = true;
			$("input[name='" + field + "']").addClass("invalid");
		} // for

		// if we have errors, then add a message to the errors div
		$(params.error).html(have_errors ? "El nombre es obligatorio." 
				: "").css("display", have_errors ? "block" : "none");
	} 
	
	function get_values(form) {
		var values = {}; 

		$(form).find(":input").each(function() {
			var field = this.name.replace(/^\w*\[(\w+)\]$/, "$1"); 
			values[field] = this.value;
		}); 

		return values;
	}
	
	function validate_form(params, errors) {
		$(params.entry).validate({
			submitHandler: function(form) {
				var task = new Task(get_values(form));
				db.save(task);
				params.callback(task);
			}, 
			showErrors: function(error_map, error_list) { 
				var elem;
				errors = {};
				for (elem in error_map) { 
					if (!errors[elem]) { 
						errors[elem] = []; 
					}
					errors[elem].push(error_map[elem]); 
				}
				display_errors(params, errors);
			}
		});
	}

	function TaskEntry(_params) {
		var errors, params;
		
		function init(_params) {
			errors = {};
			params = $.extend({
				entry: "#taskentry",
				error: "#errors",
				callback: function(task) {}
			}, _params);
			
			validate_form(params, errors);
		}
		init(_params);

		return {
			reset: function(_params) {
				init(_params);
			},
			values: function() {
				return get_values($(params.entry));
			}
		};
	}

	return TaskEntry;
});