stop:
	docker stop $(shell docker ps -a -q)

clean:
	docker system prune -af

dev:
	docker compose -f docker-compose.dev.yml up --build -d

seed-dev:
	docker compose -f docker-compose.dev.yml run server npm run seed-dev

prod:
	docker compose -f docker-compose.prod.yml up --build -d