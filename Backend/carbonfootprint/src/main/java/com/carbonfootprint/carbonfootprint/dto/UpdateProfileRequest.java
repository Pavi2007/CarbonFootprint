package com.carbonfootprint.carbonfootprint.dto;

import lombok.Data;

@Data
public class UpdateProfileRequest {

    private String name;

    private String phoneNumber;

    private Integer age;

    private String gender;
}