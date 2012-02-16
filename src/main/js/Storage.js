/*global window, define */

/**
 * Anova IT Consulting 2011
 *
 * This file is licensed under the GPL version 3.
 * Please refer to the URL http://www.gnu.org/licenses/gpl-3.0.html for details.
 */
 
define(["Task"], function(Task) {
	var db;
	// open/create a database for the application (expected size ~ 100K) 
	db = window.openDatabase(
			"tasklist",
			"1.0", "Task List Database",
			100 * 1024);

	// check that we have the required tables created 
	db.transaction(function(transaction) {
		transaction.executeSql(
			"CREATE TABLE IF NOT EXISTS task(" +
			"  name TEXT NOT NULL, " +
			"  description TEXT);");
	});

	function tasks(callback, extraClauses) { 
		db.transaction(function(transaction) { 
			transaction.executeSql( 
					"SELECT rowid as id, * FROM task " + 
						(extraClauses ? extraClauses : ""), [],
					function (transaction, results) { 
						var tasks = [], ii;
						for (ii = 0; ii < results.rows.length; ii++) { 
							tasks.push(new Task(results.rows.item(ii))); 
						}
						if (callback) {
							callback(tasks);
						}
					} 
			); 
		}); 
	}

	return {
		save: function(task) {
			db.transaction(function(transaction) {
				transaction.executeSql(
					"INSERT INTO task(name, description)" + 
					"VALUES (?, ?);", [task.name, task.description]);
			});
		},
		all: function (callback) {
			tasks(callback);
		}
	};
});