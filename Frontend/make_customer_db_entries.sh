#!/bin/bash

# Array of gender-neutral names
gender_neutral_names=(
    "Taylor"
    "Jordan"
    "Alex"
    "Riley"
    "Casey"
    "Avery"
    "Peyton"
    "Dakota"
    "Charlie"
    "Jamie"
    "Jordan"
    "Alex"
    "Taylor"
    "Jordan"
    "Peyton"
    "Dakota"
    "Riley"
    "Charlie"
    "Avery"
    "Taylor"
    "Jordan"
    "Alex"
    "Riley"
    "Casey"
    "Jamie"
)

# Array of last names
last_names=(
    "Smith"
    "Johnson"
    "Williams"
    "Jones"
    "Brown"
    "Davis"
    "Miller"
    "Wilson"
    "Moore"
    "Taylor"
    "Anderson"
    "Thomas"
    "Jackson"
    "White"
    "Harris"
    "Martin"
    "Thompson"
    "Garcia"
    "Martinez"
    "Robinson"
    "Clark"
    "Rodriguez"
    "Lewis"
    "Lee"
)

# Function to generate a random number between 101 and 1000
generate_random_number() {
    echo "$((RANDOM % 1000 + 101))"
}

# Function to generate a random address
generate_random_address() {
    street_number=$(shuf -i 1-999 -n 1)
    street_name=("Main" "Oak" "Elm" "Maple" "Cedar" "Pine" "Birch" "Spruce")
    city=("New York" "Los Angeles" "Chicago" "Houston" "Phoenix" "Philadelphia" "San Antonio" "San Diego")
    state=("CA" "TX" "FL" "NY" "IL" "PA" "OH" "GA")
    zip=$(shuf -i 10000-99999 -n 1)
    random_address="${street_number} ${street_name[$RANDOM % ${#street_name[@]}]} St, ${city[$RANDOM % ${#city[@]}]}, ${state[$RANDOM % ${#state[@]}]} ${zip}"
    echo "$random_address"
}

# Generating a list of 25 customers
for ((i=1; i<=5; i++)); do
    random_name="${gender_neutral_names[$RANDOM % ${#gender_neutral_names[@]}]}"
    random_last_name="${last_names[$RANDOM % ${#last_names[@]}]}"

    random_address="$(generate_random_address)"
    random_email="${random_name}.${random_last_name}@example.com"

    # Sending POST request with httpie
 http POST http://localhost:5001/customer \
        firstName="$random_name" \
        lastName="$random_last_name" \
        address="$random_address" \
        emailAddress="$random_email" \
        phoneNumber="1111111111"

    # Sleep for a short interval to avoid overwhelming the server
    sleep 1
done