package com.carbonfootprint.carbonfootprint.dto;

import com.carbonfootprint.carbonfootprint.enums.NotificationType;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class NotificationResponse {

    private Long id;

    private String title;

    private String message;

    private NotificationType type;

    private boolean read;

    private LocalDateTime createdAt;

}