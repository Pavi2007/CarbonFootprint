package com.carbonfootprint.carbonfootprint.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OrganizationResponse {

    private Long id;

    private String organizationName;

    private String location;

}