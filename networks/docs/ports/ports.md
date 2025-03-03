# Ports

- If your computer is a house, think of port numbers as doors - ways to enter and exit house. You can have multiple ports "opened" that will allow processes to enter and exit their data through the computer. There are a few important things about port numbers though:

- Port numbers under 1023 (i.e. from 0 to 1023) are privileged ports. That means they require certain administrative access to be "opened"

- There are some port numbers reserved for certain operations. Although you can change them, but they still technically are popular choices. For example, HTTP runs on port 80 (or 8080), HTTPS on port 443 (or 8443). SSH runs on port 22. DNS runs on port 53, and so on.

- Port numbers are not infinite.

- You have a finite number of ports, and the range of ports is from 0 to 65535. This means you cannot start a process on port number 70000 (as it is outside the valid port range)
