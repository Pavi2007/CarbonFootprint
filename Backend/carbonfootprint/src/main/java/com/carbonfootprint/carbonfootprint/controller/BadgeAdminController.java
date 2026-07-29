package com.carbonfootprint.carbonfootprint.controller;



import com.carbonfootprint.carbonfootprint.dto.admin.BadgeRequest;
import com.carbonfootprint.carbonfootprint.dto.admin.BadgeResponse;
import com.carbonfootprint.carbonfootprint.service.AdminBadgeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

        import java.util.List;

@RestController
@RequestMapping("/api/admin/badges")
@RequiredArgsConstructor
public class BadgeAdminController {


    private final AdminBadgeService adminBadgeService;

    @GetMapping
    public ResponseEntity<List<BadgeResponse>> getAllBadges() {
        return ResponseEntity.ok(adminBadgeService.getAllBadges());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BadgeResponse> getBadgeById(@PathVariable Long id) {
        return ResponseEntity.ok(adminBadgeService.getBadgeById(id));
    }

    @PostMapping
    public ResponseEntity<BadgeResponse> createBadge(@RequestBody BadgeRequest request) {
        return new ResponseEntity<>(adminBadgeService.createBadge(request), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BadgeResponse> updateBadge(
            @PathVariable Long id,
            @RequestBody BadgeRequest request) {

        return ResponseEntity.ok(adminBadgeService.updateBadge(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBadge(@PathVariable Long id) {

        adminBadgeService.deleteBadge(id);

        return ResponseEntity.ok("Badge deleted successfully");
    }
}
