FROM golang:alpine AS builder
WORKDIR /go/src/app
COPY ./app .
RUN go build hello-world.go

FROM scratch
WORKDIR /go/bin/
COPY --from=builder /go/src/app/hello-world .
ENTRYPOINT [ "./hello-world" ]