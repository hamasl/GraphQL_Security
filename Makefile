# Hardcoded vaues for the containers name and aavailable resources
name="tda602_graphql"
memory="100m"
cpus="1"

# Builds the Dockerfile into an image 
build:
	docker build -t $(name) .

# Runs the docker container from the built image
# Runs with limited memory and cpu
# Hardcoded portforwaring on port 8080
run:
	docker run --cpus=$(cpus) -m $(memory) --memory-swap=$(memory) --rm -p 8080:8080 --name $(name) $(name)

# Same as "make run", but with full access to the host system's resources
# Needed when testing the brute force password cracking with batch and alias limiting
# enabled in order to avoid having the container crash due to large amount of network
# requests.
run_unlimited:
	docker run --rm -p 8080:8080 --name $(name) $(name)

# Does both build and run
app:
	$(MAKE) build
	$(MAKE) run

# In case --rm flag of run command did not work,
# can manually kill the container this way
kill:
	docker kill $(name)

# To go inside the docker container and inspect what is actually happening
exec:
	docker exec -it $(name) /bin/bash

# Kills then reruns the container from the image
rerun:
	$(MAKE) kill
	$(MAKE) run

# Kills, then builds an image from the Dockerfile,
# then runs a container from the image
restart:
	$(MAKE) kill
	$(MAKE) app