/*global $, require */

/**
 * Anova IT Consulting 2011
 *
 * This file is licensed under the GPL version 3.
 * Please refer to the URL http://www.gnu.org/licenses/gpl-3.0.html for details.
 */

$().ready(function() {
	require(["App"], function(App) {
		var app = new App();
		app.init();
	});
});
