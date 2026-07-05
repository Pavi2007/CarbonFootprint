package com.carbonfootprint.carbonfootprint.dto;

import com.carbonfootprint.carbonfootprint.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {

    private String message;
    private Role role;
    private String token;

}