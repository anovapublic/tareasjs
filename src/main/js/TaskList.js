/*global define, iScroll */
/*jslint newcap: false */

/**
 * Anova IT Consulting 2011
 *
 * This file is licensed under the GPL version 3.
 * Please refer to the URL http://www.gnu.org/licenses/gpl-3.0.html for details.
 */

/**
 * @import com.jquerymobile:jquerymobile
 * @import org.cubiq:iscroll4
 */

define(["jquery", "Storage"], function($, db) {
	function detail(task) {
		return $("<li></li>").append(
				$('<a href="#"></a>').click(function() {
					$("#description").text(task.description);
					$.mobile.changePage($("#detail"), "slide", true, true);
				}).text(task.name));
	}

	function populate_list(params) {
		var task_list = $(params.tasks);
		task_list.empty();
		$("#description").empty();
		db.all(function(tasks) {
			$.each(tasks, function(i, task) {
				 task_list.append(params.to_item(task));
			});
			task_list.listview("refresh");
		});
	}

	function TaskList(_params) {
		var params, scroll;

		function init(_params) {
			params = $.extend({
				tasks: "#tasks",
				to_item: detail
			}, _params);

			populate_list(params);
		}
		init(_params);

		scroll = new iScroll("scroll", {desktopCompatibility: true});
		return {
			reset: function(_params) {
				init(_params);
			},
			populate: function() {
				populate_list(params);
			},
			add: function(task) {
				$(params.tasks).append(params.to_item(task))
					.listview("refresh");
			}
		};
	}

	return TaskList;
});