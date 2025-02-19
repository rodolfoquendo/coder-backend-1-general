mongo:
	@docker pull mongo:8.0.4 && docker run --name coder-backend-1-mongo -v ./volumes/db:/data/db -p27017:27017 -d mongo:8.0.4
mongosh:
	@docker exec -it coder-backend-1-mongo mongosh