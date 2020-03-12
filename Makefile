DC=docker-compose

all:start

dev:
	@echo "Launch attached project and build\n"
	$(DC) up --build

build:
	@echo "build\n"
	$(DC) build
start:
	@echo "Launch dettached projet and build\n"
	$(DC) up -d --build
stop:
	$(DC) stop
clean:
	$(DC) down

re: clean start

tree:
	@tree | sed 's/├/\+/g; s/─/-/g; s/└/\\/g'
logs:
	$(DC) -f docker-compose.yml logs -f

linter:
	$(DC) -f docker-compose.yml exec api /usr/src/app/node_modules/eslint/bin/eslint.js --fix src/


install_dc:
	curl https://get.docker.com | sh -

install_dcc:
	COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep 'tag_name' | cut -d\" -f4)
	sh -c "curl -L https://github.com/docker/compose/releases/download/${COMPOSE_VERSION}/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose"
	chmod +x /usr/local/bin/docker-compose
	sh -c "curl -L https://raw.githubusercontent.com/docker/compose/${COMPOSE_VERSION}/contrib/completion/bash/docker-compose > /etc/bash_completion.d/docker-compose"

	docker-compose -v

.PHONY: all test test_clean loadtest loadtest_clean
