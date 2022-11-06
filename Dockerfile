FROM golang:1.19.3 AS deps
WORKDIR /blin/backend
COPY go.mod .
COPY go.sum .
RUN go mod download

FROM deps AS builder
COPY . .
RUN go build -o ./blin ./cmd/main.go

FROM builder AS runner
ENTRYPOINT ["./blin"]