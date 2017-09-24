(function () {
	function session_service($cacheFactory) {
		var _session = $cacheFactory("_session");

		function _setSession(name, obj) {
			_session.put(name, obj);
		}

		function _getSession(name) {
			return _session.get(name);
		}

		return {
			set: _setSession,
			get:_getSession
		}
	}
	angular.module("shinyui").factory("session.service", ["$cacheFactory", session_service]);
})();