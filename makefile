stop:
	docker stop $(shell docker ps -a -q)

clean:
	docker system prune -af

test:
	docker compose -f docker-compose.test.yml up --build

dev:
	docker compose -f docker-compose.dev.yml up --build -d

seed-dev:
	docker compose -f docker-compose.dev.yml run server npm run seed-dev