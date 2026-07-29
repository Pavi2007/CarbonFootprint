package com.carbonfootprint.carbonfootprint.service;

import com.carbonfootprint.carbonfootprint.dto.*;
import com.carbonfootprint.carbonfootprint.entity.SupportTicket;
import com.carbonfootprint.carbonfootprint.enums.TicketStatus;
import com.carbonfootprint.carbonfootprint.repository.SupportRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminSupportServiceImpl implements AdminSupportService {

    private final SupportRepository supportRepository;

    @Override
    public List<SupportResponse> getAllTickets() {

        return supportRepository.findAll().stream()
                .map(ticket -> new SupportResponse(
                        ticket.getId(),
                        ticket.getUser().getName(),
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

        SupportTicket ticket = supportRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ticket not found"));

        return new SupportResponse(
                ticket.getId(),
                ticket.getUser().getName(),
                ticket.getSubject(),
                ticket.getMessage(),
                ticket.getReply(),
                ticket.getStatus().name(),
                ticket.getCreatedAt()
        );
    }

    @Override
    public SupportResponse replyToTicket(Long id, String reply) {

        SupportTicket ticket = supportRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ticket not found"));

        ticket.setReply(reply);

        SupportTicket updated = supportRepository.save(ticket);

        return new SupportResponse(
                updated.getId(),
                updated.getUser().getName(),
                updated.getSubject(),
                updated.getMessage(),
                updated.getReply(),
                updated.getStatus().name(),
                updated.getCreatedAt()
        );
    }

    @Override
    public SupportResponse updateStatus(Long id, String status) {

        SupportTicket ticket = supportRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ticket not found"));

        ticket.setStatus(TicketStatus.valueOf(status));

        SupportTicket updated = supportRepository.save(ticket);

        return new SupportResponse(
                updated.getId(),
                updated.getUser().getName(),
                updated.getSubject(),
                updated.getMessage(),
                updated.getReply(),
                updated.getStatus().name(),
                updated.getCreatedAt()
        );
    }

    @Override
    public void deleteTicket(Long id) {

        if (!supportRepository.existsById(id)) {
            throw new EntityNotFoundException("Ticket not found");
        }

        supportRepository.deleteById(id);
    }
}