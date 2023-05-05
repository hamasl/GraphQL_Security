name="tda602_graphql"

build:
	docker build -t $(name) .

# Hardcoding because school project that never will be maintained
run:
	docker run --rm -p 8080:8080 --name $(name) $(name)

app:
	$(MAKE) build
	$(MAKE) run

kill:
	docker kill $(name)

inspect:
	docker exec -it $(name) /bin/bash