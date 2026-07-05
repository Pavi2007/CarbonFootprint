package com.carbonfootprint.carbonfootprint.controller;

import com.carbonfootprint.carbonfootprint.dto.AuthResponse;
import com.carbonfootprint.carbonfootprint.dto.RegisterRequest;
import com.carbonfootprint.carbonfootprint.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.carbonfootprint.carbonfootprint.dto.LoginRequest;
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;


    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }
    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request){

        return authService.login(request);

    }

}