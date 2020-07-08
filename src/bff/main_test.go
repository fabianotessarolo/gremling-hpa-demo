package main

import (
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/fabianotessarolo/gremling-hpa-demo/src/bff/app"
)

var a app.App

func TestMain(m *testing.M) {
	a.Initialize(
		os.Getenv("RABBIT_USER"),
		os.Getenv("RABBIT_PASSWORD"),
		os.Getenv("RABBIT_HOST"),
		os.Getenv("RABBIT_PORT"))

	code := m.Run()
	os.Exit(code)
}

func TestCountGremlings(t *testing.T) {
	req, _ := http.NewRequest("GET", "/countGremlings", nil)
	response := executeRequest(req)

	checkResponseCode(t, http.StatusOK, response.Code)

	if body := response.Body.String(); body != "[]" {
		t.Errorf("Expected an empty array. Got %s", body)
	}
}

func executeRequest(req *http.Request) *httptest.ResponseRecorder {
	rr := httptest.NewRecorder()
	a.Router.ServeHTTP(rr, req)

	return rr
}

func checkResponseCode(t *testing.T, expected, actual int) {
	if expected != actual {
		t.Errorf("Expected response code %d. Got %d\n", expected, actual)
	}
}
