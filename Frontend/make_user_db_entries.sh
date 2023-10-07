#!/bin/bash

# Function to generate a random name
generate_random_name() {
    names=("Alice" "Bob" "Charlie" "David" "Eva" "Frank" "Grace" "Henry" "Irene" "Jack")
    echo "${names[$RANDOM % ${#names[@]}]}"
}

# Function to generate a random number between 1 and 1000
generate_random_number() {
    echo "$((RANDOM % 1000 + 1))"
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
