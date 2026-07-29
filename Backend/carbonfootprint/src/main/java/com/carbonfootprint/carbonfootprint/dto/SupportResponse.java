package com.carbonfootprint.carbonfootprint.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class SupportResponse {

    private Long id;

    private String userName;

    private String subject;

    private String message;

    private String reply;

    private String status;

    private LocalDateTime createdAt;

}
