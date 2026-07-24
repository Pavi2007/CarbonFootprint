package com.carbonfootprint.carbonfootprint.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {

    private static final String SECRET_KEY =
            "carbonfootprintprojectsecretkey2026";

    private SecretKey getSigningKey() {

        return Keys.hmacShaKeyFor(
                SECRET_KEY.getBytes(StandardCharsets.UTF_8)
        );

    }

    // ==========================
    // Generate JWT
    // ==========================

    public String generateToken(String email) {

        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis()
                        + 1000L * 60 * 60 * 24)) // 24 hours
                .signWith(getSigningKey())
                .compact();

    }

    // ==========================
    // Extract Email
    // ==========================

    public String extractEmail(String token) {

        return extractClaim(token, Claims::getSubject);

    }

    // ==========================
    // Extract Expiry
    // ==========================

    public Date extractExpiration(String token) {

        return extractClaim(token, Claims::getExpiration);

    }

    // ==========================
    // Generic Claim Extractor
    // ==========================

    public <T> T extractClaim(String token,
                              Function<Claims, T> claimsResolver) {

        Claims claims = extractAllClaims(token);

        return claimsResolver.apply(claims);

    }

    // ==========================
    // Extract All Claims
    // ==========================

    private Claims extractAllClaims(String token) {

        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();

    }

    // ==========================
    // Check Expired
    // ==========================

    private boolean isTokenExpired(String token) {

        return extractExpiration(token).before(new Date());

    }

    // ==========================
    // Validate JWT
    // ==========================

    public boolean isTokenValid(String token,
                                UserDetails userDetails) {

        final String email = extractEmail(token);

        return email.equals(userDetails.getUsername())
                && !isTokenExpired(token);

    }

}