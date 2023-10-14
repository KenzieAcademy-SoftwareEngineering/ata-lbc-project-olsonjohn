#!/bin/bash

# Define the URL where the POST request will be sent
URL="http://localhost:5001/ticket"

# Define an array of JSON objects representing 5 helpdesk tickets
TICKETS=(
  '{"subject":"Cannot Access Email","description":"User is unable to access email. Getting a login error."}'
  '{"subject":"Software Installation Issue","description":"User needs assistance with installing software on their computer."}'
  '{"subject":"Network Connectivity Problem","description":"User is experiencing issues with network connection. Unable to connect to the internet."}'
  '{"subject":"Printer Not Working","description":"Users printer is not working. Unable to print documents."}'
  '{"subject":"Password Reset Request","description":"User forgot their password and needs to reset it to regain access to the system."}'
)

# Loop through the tickets and make HTTP POST requests for each one
for ticket in "${TICKETS[@]}"; do
  http POST "$URL" <<< "$ticket"
  echo "Helpdesk ticket submitted: $ticket"
done

# Output a message indicating all tickets have been submitted
echo "All helpdesk tickets submitted!"
