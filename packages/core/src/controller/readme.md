# Controller

Main class and core of the Ghostship. Basically, Controller listens for url changes or route navigate requests and calls necessary methods: plugins' hooks, route matching, subscription callbacks, browser history push, etc.

In most cases, Controller must be singleton for every SPA. Controller partially follows event-emitter pattern, it is possible to link Controller with other event-emitter instance, and there are implementations for some of them.
