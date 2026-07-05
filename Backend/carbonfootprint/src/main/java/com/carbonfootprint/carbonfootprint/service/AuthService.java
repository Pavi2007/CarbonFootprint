package com.carbonfootprint.carbonfootprint.service;
import com.carbonfootprint.carbonfootprint.util.JwtService;
import com.carbonfootprint.carbonfootprint.dto.AuthResponse;
import com.carbonfootprint.carbonfootprint.dto.RegisterRequest;
import com.carbonfootprint.carbonfootprint.entity.User;
import com.carbonfootprint.carbonfootprint.enums.Role;
import com.carbonfootprint.carbonfootprint.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.carbonfootprint.carbonfootprint.dto.LoginRequest;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public AuthResponse register(RegisterRequest request){
        if (userRepository.existsByEmail(request.getEmail())) {
            return new AuthResponse(
                    "Email already exists",
                    null,
                    null
            );
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);

        userRepository.save(user);

        return new AuthResponse(
                "Registration Successful",
                user.getRole(),
                null
        );
    }
    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElse(null);

        if (user == null) {
            return new AuthResponse("User not found", null,null);
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return new AuthResponse("Invalid Password", null,null);
        }
        String token = jwtService.generateToken(user.getEmail());

        return new AuthResponse(
                "Login Successful",
                user.getRole(),
                token
        );

    }
}