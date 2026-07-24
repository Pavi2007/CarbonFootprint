package com.carbonfootprint.carbonfootprint.service;

import com.carbonfootprint.carbonfootprint.dto.NotificationResponse;
import com.carbonfootprint.carbonfootprint.entity.User;
import com.carbonfootprint.carbonfootprint.enums.NotificationType;

import java.util.List;

public interface NotificationService {

    List<NotificationResponse> getNotifications();

    long getUnreadCount();

    void markAsRead(Long id);

    void markAllAsRead();

    void deleteNotification(Long id);

    void createNotification(
            User user,
            String title,
            String message,
            NotificationType type
    );

}