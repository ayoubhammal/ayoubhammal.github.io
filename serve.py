from http.server import (
    HTTPServer,
    SimpleHTTPRequestHandler
)

server = HTTPServer(
    server_address=("127.0.0.1", 8000),
    RequestHandlerClass=lambda *_: SimpleHTTPRequestHandler(*_, directory="./dist/")
)

server.serve_forever()
