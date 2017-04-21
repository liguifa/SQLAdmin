(function () {
	function event_service() {
		var _eventPools = [];
		function _register(name, func) {
			var event = { name: name, func: func };
			_eventPools.push(event);
		}

		function _trigger(name) {
			for(var i in _eventPools)
			{
				if(_eventPools[i].name == name)
				{
					_eventPools[i].func();
				}
			}
		}

		return {
			trigger: _trigger,
			register: _register
		}
	}

	angular.module("sqladmin").factory("event.service", event_service);
})();