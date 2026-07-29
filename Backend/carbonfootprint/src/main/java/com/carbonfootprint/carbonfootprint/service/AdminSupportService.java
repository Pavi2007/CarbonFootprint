package com.carbonfootprint.carbonfootprint.service;

import com.carbonfootprint.carbonfootprint.dto.SupportResponse;

import java.util.List;

public interface AdminSupportService {

    List<SupportResponse> getAllTickets();

    SupportResponse getTicketById(Long id);

    SupportResponse replyToTicket(Long id, String reply);

    SupportResponse updateStatus(Long id, String status);

    void deleteTicket(Long id);

}