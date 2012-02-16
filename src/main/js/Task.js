/*global define */

/**
 * Anova IT Consulting 2011
 *
 * This file is licensed under the GPL version 3.
 * Please refer to the URL http://www.gnu.org/licenses/gpl-3.0.html for details.
 */

define(["jquery"], function($) {
	function Task(params) {
		params = $.extend({
			name: "",
			description: ""
		}, params);
		
		return {
			id: null,
			name: params.name,
			description: params.description
		};
	}

	return Task;
});