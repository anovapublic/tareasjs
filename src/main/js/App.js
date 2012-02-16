/*global $, window, define */

/**
 * Anova IT Consulting 2011
 *
 * This file is licensed under the GPL version 3.
 * Please refer to the URL http://www.gnu.org/licenses/gpl-3.0.html for details.
 */

/**
 * @import com.jquerymobile:jquerymobile
 */

define(["jquery", "TaskEntry", "TaskList"], function($, TaskEntry, TaskList) {
	function App() {
		function fix_size() {
			$('div[role="main"]').height( 
				$(".ui-page-active").height() -  
				$('.ui-page-active div[data-role="header"]').outerHeight() - 
				$('.ui-page-active div[data-role="footer"]').outerHeight() - 30);
			/* Los viejos tiempos... */
			window.scrollTo(0, 1);
		}

		return {
			init: function() {
				var list, entry;
				$(window).bind("orientationchange resize pageshow", fix_size);
				
				$("#create_go").click(function() {
					$.mobile.changePage($("#create"), "slide", true, true);
				});
				$(".list_go").click(function() {
					$.mobile.changePage($("#list"), "slide", true, true);
				});
				
				list = new TaskList();
				entry = new TaskEntry({
					callback: function(task) { 
						list.add(task);
						$.mobile.changePage($("#list"), "slide", true, true);
					}
				});
			}
		};
	}

	return App;
});