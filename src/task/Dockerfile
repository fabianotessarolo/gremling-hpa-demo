FROM golang

ADD . /go/src/tessarolo.dev/task
RUN go get tessarolo.dev/task
RUN go install tessarolo.dev/task

ENTRYPOINT /go/bin/task

