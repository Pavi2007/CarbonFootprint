package com.carbonfootprint.carbonfootprint.service;

import com.carbonfootprint.carbonfootprint.dto.NotificationResponse;
import com.carbonfootprint.carbonfootprint.entity.Notification;
import com.carbonfootprint.carbonfootprint.entity.User;
import com.carbonfootprint.carbonfootprint.enums.NotificationType;
import com.carbonfootprint.carbonfootprint.repository.NotificationRepository;
import com.carbonfootprint.carbonfootprint.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;


    private User getLoggedInUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }
    @Override
    public void createNotification(
            User user,
            String title,
            String message,
            NotificationType type) {

        System.out.println("Creating notification: " + title);

        Notification notification = new Notification();

        notification.setUser(user);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setType(type);
        notification.setRead(false);
        notification.setCreatedAt(LocalDateTime.now());

        notificationRepository.save(notification);

        System.out.println("Notification saved");
    }
    private NotificationResponse map(Notification notification){

        NotificationResponse response =
                new NotificationResponse();

        response.setId(notification.getId());
        response.setTitle(notification.getTitle());
        response.setMessage(notification.getMessage());
        response.setType(notification.getType());
        response.setRead(notification.isRead());
        response.setCreatedAt(notification.getCreatedAt());

        return response;
    }
    @Override
    public List<NotificationResponse> getNotifications() {

        User user = getLoggedInUser();

        return notificationRepository
                .findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(this::map)
                .toList();
    }

    @Override
    public long getUnreadCount() {

        return notificationRepository
                .countByUserAndIsReadFalse(getLoggedInUser());

    }
    @Override
    public void markAsRead(Long id) {

        User user = getLoggedInUser();

        Notification notification =
                notificationRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Notification not found"));

        if(!notification.getUser().getId().equals(user.getId()))
            throw new RuntimeException("Unauthorized");

        notification.setRead(true);

        notificationRepository.save(notification);
    }
    @Override
    public void markAllAsRead() {

        User user = getLoggedInUser();

        List<Notification> notifications =
                notificationRepository.findByUserOrderByCreatedAtDesc(user);

        notifications.forEach(n -> n.setRead(true));

        notificationRepository.saveAll(notifications);
    }
    @Override
    public void deleteNotification(Long id) {

        User user = getLoggedInUser();

        Notification notification =
                notificationRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Notification not found"));

        if(!notification.getUser().getId().equals(user.getId()))
            throw new RuntimeException("Unauthorized");

        notificationRepository.delete(notification);
    }

}
