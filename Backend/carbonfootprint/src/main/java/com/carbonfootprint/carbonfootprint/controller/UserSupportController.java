package com.carbonfootprint.carbonfootprint.controller;

import com.carbonfootprint.carbonfootprint.dto.SupportRequest;
import com.carbonfootprint.carbonfootprint.dto.SupportResponse;
import com.carbonfootprint.carbonfootprint.service.UserSupportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/support")
@RequiredArgsConstructor
public class UserSupportController {

    private final UserSupportService userSupportService;

    @PostMapping
    public ResponseEntity<SupportResponse> createTicket(
            @RequestBody SupportRequest request) {

        return new ResponseEntity<>(
                userSupportService.createTicket(request),
                HttpStatus.CREATED
        );
    }

    @GetMapping("/my-tickets")
    public ResponseEntity<List<SupportResponse>> getMyTickets() {

        return ResponseEntity.ok(userSupportService.getMyTickets());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SupportResponse> getTicket(@PathVariable Long id) {

        return ResponseEntity.ok(
                userSupportService.getTicketById(id)
        );
    }
}