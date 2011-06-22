test:
	./node_modules/expresso/bin/expresso -I lib $(TESTFLAGS) tests/*.test.js

.PHONY: test
