package com.carbonfootprint.carbonfootprint.dto.admin;

import com.carbonfootprint.carbonfootprint.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserResponse {

    private Long id;

    private String name;

    private String email;

    private String phoneNumber;

    private Integer age;

    private String gender;

    private Role role;

}