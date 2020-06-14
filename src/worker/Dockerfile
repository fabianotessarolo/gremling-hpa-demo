FROM golang

ADD . /go/src/tessarolo.dev/worker
RUN go get tessarolo.dev/worker
RUN go install tessarolo.dev/worker

ENTRYPOINT /go/bin/worker

