package com.carbonfootprint.carbonfootprint.controller;

import com.carbonfootprint.carbonfootprint.dto.*;
import com.carbonfootprint.carbonfootprint.service.AdminSupportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/support")
@RequiredArgsConstructor
public class AdminSupportController {

    private final AdminSupportService adminSupportService;

    @GetMapping
    public ResponseEntity<List<SupportResponse>> getAllTickets() {
        return ResponseEntity.ok(adminSupportService.getAllTickets());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SupportResponse> getTicket(@PathVariable Long id) {
        return ResponseEntity.ok(adminSupportService.getTicketById(id));
    }

    @PutMapping("/{id}/reply")
    public ResponseEntity<SupportResponse> reply(
            @PathVariable Long id,
            @RequestBody ReplyRequest request) {

        return ResponseEntity.ok(
                adminSupportService.replyToTicket(id, request.getReply())
        );
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<SupportResponse> updateStatus(
            @PathVariable Long id,
            @RequestBody StatusRequest request) {

        return ResponseEntity.ok(
                adminSupportService.updateStatus(id, request.getStatus())
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTicket(@PathVariable Long id) {

        adminSupportService.deleteTicket(id);

        return ResponseEntity.ok("Support ticket deleted successfully");
    }
}