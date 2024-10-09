package users

type User struct {
	ID string `json:"id"`
	Email    string `json:"email"`
	Username string `json:"username"`
	// will be hashed later
	Password string `json:"password"`
}

