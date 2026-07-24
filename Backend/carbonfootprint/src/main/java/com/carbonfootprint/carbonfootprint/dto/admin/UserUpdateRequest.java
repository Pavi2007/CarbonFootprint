package com.carbonfootprint.carbonfootprint.dto.admin;

import com.carbonfootprint.carbonfootprint.enums.Role;
import lombok.Data;

@Data
public class UserUpdateRequest {

    private String name;

    private String phoneNumber;

    private Integer age;

    private String gender;

    private Role role;

}