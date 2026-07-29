package com.carbonfootprint.carbonfootprint.service;

import com.carbonfootprint.carbonfootprint.dto.SupportRequest;
import com.carbonfootprint.carbonfootprint.dto.SupportResponse;

import java.util.List;

public interface UserSupportService {

    SupportResponse createTicket(SupportRequest request);

    List<SupportResponse> getMyTickets();

    SupportResponse getTicketById(Long id);

}