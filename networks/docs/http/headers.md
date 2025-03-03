# HTTP Headers

## What are HTTP Headers?

- HTTP Headers are a set of information that is sent along with the HTTP request and response. They are used to prov

## REQUEST HEADERS

### Host

- Denotes the host name of the server that the client is trying to connect to. This is required for HTTP/1.1 and HTTP/2.0. For HTTP/1.0, it is optional.

- Example: `Host: www.example.com`

### Connection

- The Connection general header controls whether or not the network connection stays open after the current transaction finishes. By default, the connection is closed after each transaction.

- Example: `Connection: keep-alive` which tells the server to keep the connection open for future requests.

### Cache-Control

- The Cache-Control general-header field is used to specify directives for caching mechanisms in both requests and responses.

- Example: `Cache-Control: no-cache` which tells the server to not cache the response.
  or `Cache-Control: max-age=3600` which tells the server to cache the response for 3600 seconds.

### Accept

- The Accept request HTTP header advertises which content types, expressed as MIME types, the client is able to understand. Using content negotiation, the server selects one of the proposals, uses it and informs the client of its choice with the Content-Type response header.

- Example: `Accept: text/html application/xhtml+xml application/xml;q=0.9 image/webp image/apng */*;q=0.8`
