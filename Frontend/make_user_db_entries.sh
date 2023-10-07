#!/bin/bash

# Function to generate a random name
generate_random_name() {
  names_with_last_names=(
    "Taylor Smith"
    "Jordan Johnson"
    "Alex Brown"
    "Riley Davis"
    "Casey Martinez"
    "Jordan Miller"
    "Avery Clark"
    "Peyton Lewis"
    "Dakota Hall"
    "Taylor Lee"
    "Alex Taylor"
    "Jordan Parker"
    "Riley Morgan"
    "Casey Cooper"
    "Taylor Kelly"
    "Avery Bailey"
    "Jordan Carter"
    "Peyton Hayes"
    "Dakota Reed"
    "Riley Gray"
    "Charlie Brooks"
    "Jamie Morgan"
    "Taylor Green"
    "Alex Reed"
    "Peyton Bailey"
    "Jordan Green"
)
    echo "${names[$RANDOM % ${#names[@]}]}"
}

# Function to generate a random number between 101 and 1000
generate_random_number() {
    echo "$((RANDOM % 1000 + 101))"
}

# Loop to send 25 POST requests
for ((i=1; i<=25; i++)); do
    random_name=$(generate_random_name)
    random_number=$(generate_random_number)

    # Sending POST request with curl
    curl -X POST -H "Content-Type: application/json" -d '{
        "name": "'"$random_name"'",
        "userNumber": "'"$random_number"'"
    }' http://localhost:5001/user

    # Sleep for a short interval to avoid overwhelming the server
    sleep 1
done

echo "POST requests sent successfully."
