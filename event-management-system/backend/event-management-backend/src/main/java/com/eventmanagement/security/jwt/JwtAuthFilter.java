// Intercepts every request, checks for a valid token, and sets user details in context.
package com.eventmanagement.security.jwt;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.eventmanagement.security.JwtUtils;
import com.eventmanagement.security.services.CustomUserDetailsService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {
	// This filter will run once per request and is a Spring bean (@Component).
	// to ensure that JWT authentication happens for each incoming HTTP request.
	
	@Autowired
	private JwtUtils jwtUtils;
	
	@Autowired
	private CustomUserDetailsService userDetailsService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
	        throws ServletException, IOException {

	    final String authHeader = request.getHeader("Authorization");
	    String jwt = null;
	    String username = null;

	    if (authHeader != null && authHeader.startsWith("Bearer ")) {
	        jwt = authHeader.substring(7);
	        username = jwtUtils.getUsernameFromToken(jwt);
	        System.out.println("🔐 JWT detected. Extracted username: " + username);
	    } else {
	        System.out.println("⚠️ No valid Authorization header found. Skipping authentication for: " + request.getRequestURI());
	        filterChain.doFilter(request, response); // Skip auth and continue
	        return;
	    }

	    if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
	        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
	        System.out.println("🔍 Loaded UserDetails for: " + userDetails.getUsername());
	        

	        if (jwtUtils.validateToken(jwt)) {
	            System.out.println("✅ JWT is valid. Setting authentication for: " + username);

	            UsernamePasswordAuthenticationToken authToken =
	                    new UsernamePasswordAuthenticationToken(
	                            userDetails, null, userDetails.getAuthorities());
	            

	            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
	            SecurityContextHolder.getContext().setAuthentication(authToken);
	        } else {
	            System.out.println("❌ JWT validation failed for: " + username);
	        }
	    }
	    
	    filterChain.doFilter(request, response);
	}


}
