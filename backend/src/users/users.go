package users

import (
	"backend/src/auth"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"
)

// get from DB
var users []User
var idCounter int

// APIResponse struct to represent the response format
type APIResponse struct {
	Error   bool   `json:"error"`
	Message string `json:"message"`
}

// Updated CreateUser function with detailed error response
func CreateUser(w http.ResponseWriter, r *http.Request) {
	var newUser User
	err := json.NewDecoder(r.Body).Decode(&newUser)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(APIResponse{Error: true, Message: err.Error()})
		return
	}

	if newUser.Username == "" || newUser.Password == "" || newUser.Email == "" {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(APIResponse{Error: true, Message: "Invalid request"})
		return
	}

	// Check if user is already in DB
	for _, user := range users {
		if user.Username == newUser.Username {
			w.WriteHeader(http.StatusUnauthorized)
			json.NewEncoder(w).Encode(APIResponse{Error: true, Message: "User already registered"})
			return
		}
	}

	idCounter++
	newUser.ID = strconv.Itoa(idCounter)
	users = append(users, newUser)

	// Generate auth token
	token, err := auth.CreateToken(newUser.ID, newUser.Username)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(APIResponse{Error: true, Message: "Failed to create authorization token"})
		return
	}

	// Set auth token header
	w.Header().Set("Authorization", fmt.Sprintf("Bearer %v", token))

	// Return success response
	json.NewEncoder(w).Encode(APIResponse{Error: false, Message: token})
}

type CheckUserRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// Updated CheckUser function with detailed error response
func CheckUser(w http.ResponseWriter, r *http.Request) {
	var credentials CheckUserRequest

	// Decode the incoming request body into credentials
	err := json.NewDecoder(r.Body).Decode(&credentials)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(APIResponse{Error: true, Message: "Invalid request payload"})
		return
	}

	// Iterate over the list of users to find a match
	for _, user := range users {
		if user.Username == credentials.Username && user.Password == credentials.Password {

			// Generate auth token
			token, err := auth.CreateToken(user.Username, user.ID)
			if err != nil {
				w.WriteHeader(http.StatusUnauthorized)
				json.NewEncoder(w).Encode(APIResponse{Error: true, Message: "Failed to create authorization token"})
				return
			}

			// Set auth token header
			w.Header().Set("Authorization", fmt.Sprintf("Bearer %v", token))

			// Return success response
			json.NewEncoder(w).Encode(APIResponse{Error: false, Message: token})
			return
		}
	}

	// No match found, return invalid response
	w.WriteHeader(http.StatusUnauthorized)
	json.NewEncoder(w).Encode(APIResponse{Error: true, Message: "Invalid username or password"})
    log.Println("Created user " + credentials.Username + " ")
}

// Updated VerifyToken function with detailed error response
func VerifyToken(w http.ResponseWriter, r *http.Request) {
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(APIResponse{Error: true, Message: "Authorization header missing"})
		return
	}

	// Check if the header format is valid and extract the token
	parts := strings.Split(authHeader, " ")
	if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(APIResponse{Error: true, Message: "Invalid Authorization header format"})
		return
	}

	token := parts[1]

	// Verify the token
	err := auth.VerifyToken(token)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(APIResponse{Error: true, Message: err.Error()})
		return
	}

	// Return success response
	json.NewEncoder(w).Encode(APIResponse{Error: false, Message: "Verified token"})
}

