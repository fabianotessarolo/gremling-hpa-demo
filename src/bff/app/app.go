package app

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/fabianotessarolo/gremling-hpa-demo/src/bff/utils"
	"github.com/gorilla/mux"
	"github.com/streadway/amqp"
)

var rUser, rPassword, rHost, rPort string

type App struct {
	Router *mux.Router
}

func (a *App) Initialize(rabbitUser, rabbitPassword, rabbitHost, rabbitPort string) {
	var err error
	if err != nil {
		log.Fatal(err)
	}

	rUser = rabbitUser
	rPassword = rabbitPassword
	rHost = rabbitHost
	rPort = rabbitPort

	a.Router = mux.NewRouter()
	a.Router.HandleFunc("/hello", hello).Methods("GET")
	a.Router.HandleFunc("/countGremlings", countGremlings).Methods("GET")
}

func (a *App) Run(addr string) {
	log.Fatal(http.ListenAndServe(":8080", a.Router))
}

func hello(w http.ResponseWriter, r *http.Request) {
	var data = struct {
		Title string `json:"title"`
	}{
		Title: "Hello from Gremlin",
	}

	jsonBytes, err := utils.StructToJSON(data)
	if err != nil {
		fmt.Print(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonBytes)
	return
}

func countGremlings(w http.ResponseWriter, r *http.Request) {
	e, err := inspectRabbit()
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Implement")
		return
	}
	respondWithJSON(w, http.StatusOK, e)
	log.Printf("%+v\n", e)

}

func inspectRabbit() (amqp.Queue, error) {
	//TODO: Implement conneciton reuse, retry, singletons or other strategy.
	conn, err := amqp.Dial("amqp://" + rUser + ":" + rPassword + "@" + rHost + ":" + rPort + "/")
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
	return inspect, err
}

func respondWithError(w http.ResponseWriter, code int, message string) {
	respondWithJSON(w, code, map[string]string{"error": message})
}

func respondWithJSON(w http.ResponseWriter, code int, payload interface{}) {
	response, _ := json.Marshal(payload)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	w.Write(response)
}

func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
	}
}
