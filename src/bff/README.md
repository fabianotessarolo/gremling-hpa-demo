# Testing

```bash
../../docker-compose up rabbitmq
source env-sample
go test -v
```

# Running locally

Export rabbit env vars

```bash
../../docker-compose up rabbitmq
source env-sample
go run main.go
```