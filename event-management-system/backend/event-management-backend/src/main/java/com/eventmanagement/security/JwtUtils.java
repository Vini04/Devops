package com.eventmanagement.security;

import java.security.Key;
import java.util.Date;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

@Component
public class JwtUtils {

	// A long random secret key used to sign the JWT token (must be at least 32 characters for HMAC-SHA256)
    private final String jwtSecret = "UDUFJfR967bfE8PFD1CbyK90XUDkoEsJLzGB9dABewtW6"; // should be at least 32 chars
    private final int jwtExpirationMs = 86400000; // Token expiration time in milliseconds (24 hours)

    // Generates the signing key from the secret
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    //  Generate a JWT token using the provided username
    public String generateToken(String username, String role) {
        return Jwts.builder()
                .setSubject(username)
                .claim("role", role) // ✅ Add role to token payload
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    //  Extract the username (subject) from the JWT token
    public String getUsernameFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey()) // Set the same signing key
                .build()
                .parseClaimsJws(token)  // Parse the token and validate it
                .getBody()
                .getSubject(); // Return the subject (username)
    }

    // Validate the token: returns true if valid, false otherwise
    public boolean validateToken(String token) {
        try {
        	// Try to parse the token using the signing key
            Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
          // Token is invalid or tampered with
            return false;
        }
    }
}