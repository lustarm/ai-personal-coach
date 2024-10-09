package users

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"strings"
	"backend/src/auth"
)

// get from DB
var users []User
var idCounter int

func ListUsers(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(users)
}

func CreateUser(w http.ResponseWriter, r *http.Request) {
	var newUser User
	err := json.NewDecoder(r.Body).Decode(&newUser)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if newUser.Username == "" || newUser.Password == "" || newUser.Email == ""{
        w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"message": "Invalid request"})
		return
	}

	/* == Check if user is already in DB == */
	for _, user := range users {
		if user.Username == newUser.Username {
            w.WriteHeader(http.StatusUnauthorized)
			json.NewEncoder(w).Encode(map[string]string{"message": "User already registered"})
			return
		}
	}

	idCounter++
	newUser.ID = strconv.Itoa(idCounter)
	users = append(users, newUser)

	// Change to auth token
	token, err := auth.CreateToken(newUser.ID, newUser.Username)
	if err != nil {
        w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"message": "Failed to create authorization token"})
	}

	// Set auth token header
	w.Header().Set("Authorization", fmt.Sprintf("Bearer %v", token))

	// Return auth token
	json.NewEncoder(w).Encode(map[string]string{"message": token})
}

// CheckUserRequest struct to represent the incoming request body
type CheckUserRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// CheckUser function to validate the user credentials
func CheckUser(w http.ResponseWriter, r *http.Request) {
	var credentials CheckUserRequest

	// Decode the incoming request body into credentials
	err := json.NewDecoder(r.Body).Decode(&credentials)
	if err != nil {
        w.WriteHeader(http.StatusUnauthorized)
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	// Iterate over the list of users to find a match
	for _, user := range users {
		if user.Username == credentials.Username && user.Password == credentials.Password {

			// Set auth header token with JWT
			token, err := auth.CreateToken(user.Username, user.ID)
			if err != nil {
                w.WriteHeader(http.StatusUnauthorized)
				json.NewEncoder(w).Encode(map[string]string{"message": "Failed to create authorization token"})
			}

			w.Header().Set("Authorization", fmt.Sprintf("Bearer %v", token))

			json.NewEncoder(w).Encode(map[string]string{"message": token})
			return
		}
	}

	// If no match is found, return invalid
	json.NewEncoder(w).Encode(map[string]string{"message": "Invalid username or password"})
}

type VerifyTokenRequest struct {
	Token string `json:"token"`
}

func VerifyToken(w http.ResponseWriter, r *http.Request) {
	// Get the Authorization header
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
        w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"message": "Authorization header missing"})
		return
	}

	// Check if the header format is valid and extract the token
	parts := strings.Split(authHeader, " ")
	if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {
        w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"message": "Invalid Authorization header format"})
		return
	}

	token := parts[1]

	// Verify the token
	err := auth.VerifyToken(token)
	if err != nil {
        w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"message": err.Error()})
		return
	}

	json.NewEncoder(w).Encode(map[string]string{"message": "Verified token"})
}
