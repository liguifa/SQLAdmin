(function () {
	function event_service() {
		var _eventPools = [];
		function _register(name, func,args) {
			var event = { name: name, func: func,args:args};
			_eventPools.push(event);
		}

		function _trigger(name,args) {
			for(var i in _eventPools)
			{
				if(_eventPools[i].name == name)
				{
				    _eventPools[i].func(args, _eventPools[i].args);
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