package main

import (
	"log"

	"github.com/gorilla/mux"
	"github.com/streadway/amqp"
)

type App struct {
	Router *mux.Router
}

func (a *App) Initialize(rabbitUser, rabbitPassword, rabbitHost, rabbitPort string) {
	var err error
	if err != nil {
		log.Fatal(err)
	}

	conn, err := amqp.Dial("amqp://" + rabbitUser + ":" + rabbitPassword + "@" + rabbitHost + ":" + rabbitPort + "/")
	failOnError(err, "Failed to connect to RabbitMQ")
	defer conn.Close()

	ch, err := conn.Channel()
	failOnError(err, "Failed to open a channel")
	defer ch.Close()

	q, err := ch.QueueDeclare(
		"task_queue", // name
		true,         // durable
		false,        // delete when unused
		false,        // exclusive
		false,        // no-wait
		nil,          // arguments
	)
	failOnError(err, "Failed to declare a queue")

	inspect, err := ch.QueueInspect(q.Name)
	failOnError(err, "Failed to inspect a queue")
	log.Printf("%+v\n", inspect)
	a.Router = mux.NewRouter()
}

func (a *App) Run(addr string) {}

func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
	}
}
