name="tda602_graphql"
memory="100m"
cpus="1"

build:
	docker build -t $(name) .

# Hardcoding because school project that never will be maintained
run:
	docker run --cpus=$(cpus) -m $(memory) --memory-swap=$(memory) --rm -p 8080:8080 --name $(name) $(name)

app:
	$(MAKE) build
	$(MAKE) run

kill:
	docker kill $(name)

inspect:
	docker exec -it $(name) /bin/bash

rerun:
	$(MAKE) kill
	$(MAKE) run

restart:
	$(MAKE) kill
	$(MAKE) app