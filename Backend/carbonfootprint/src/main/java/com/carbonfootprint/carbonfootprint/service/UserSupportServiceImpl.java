package com.carbonfootprint.carbonfootprint.service;

import com.carbonfootprint.carbonfootprint.dto.SupportRequest;
import com.carbonfootprint.carbonfootprint.dto.SupportResponse;
import com.carbonfootprint.carbonfootprint.entity.SupportTicket;
import com.carbonfootprint.carbonfootprint.entity.User;
import com.carbonfootprint.carbonfootprint.repository.SupportRepository;
import com.carbonfootprint.carbonfootprint.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserSupportServiceImpl implements UserSupportService {

    private final SupportRepository supportRepository;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    @Override
    public SupportResponse createTicket(SupportRequest request) {

        User user = getCurrentUser();

        SupportTicket ticket = SupportTicket.builder()
                .user(user)
                .subject(request.getSubject())
                .message(request.getMessage())
                .build();

        ticket = supportRepository.save(ticket);

        return new SupportResponse(
                ticket.getId(),
                user.getName(),
                ticket.getSubject(),
                ticket.getMessage(),
                ticket.getReply(),
                ticket.getStatus().name(),
                ticket.getCreatedAt()
        );
    }

    @Override
    public List<SupportResponse> getMyTickets() {

        User user = getCurrentUser();

        return supportRepository.findByUser(user)
                .stream()
                .map(ticket -> new SupportResponse(
                        ticket.getId(),
                        user.getName(),
                        ticket.getSubject(),
                        ticket.getMessage(),
                        ticket.getReply(),
                        ticket.getStatus().name(),
                        ticket.getCreatedAt()
                ))
                .toList();
    }

    @Override
    public SupportResponse getTicketById(Long id) {

        User user = getCurrentUser();

        SupportTicket ticket = supportRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ticket not found"));

        if (!ticket.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied");
        }

        return new SupportResponse(
                ticket.getId(),
                user.getName(),
                ticket.getSubject(),
                ticket.getMessage(),
                ticket.getReply(),
                ticket.getStatus().name(),
                ticket.getCreatedAt()
        );
    }
}