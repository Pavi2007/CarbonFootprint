package com.carbonfootprint.carbonfootprint.controller;

import com.carbonfootprint.carbonfootprint.dto.admin.ReportResponse;
import com.carbonfootprint.carbonfootprint.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/admin/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/weekly")
    public ResponseEntity<List<ReportResponse>> getWeeklyReport() {
        return ResponseEntity.ok(reportService.getWeeklyReport());
    }

    @GetMapping("/monthly")
    public ResponseEntity<List<ReportResponse>> getMonthlyReport() {
        return ResponseEntity.ok(reportService.getMonthlyReport());
    }

    @GetMapping("/weekly/pdf")
    public ResponseEntity<byte[]> exportWeeklyPdf() throws IOException {

        byte[] pdf = reportService.exportWeeklyPdf();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=Weekly_Report.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }

    @GetMapping("/monthly/pdf")
    public ResponseEntity<byte[]> exportMonthlyPdf() throws IOException {

        byte[] pdf = reportService.exportMonthlyPdf();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=Monthly_Report.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }

    @GetMapping("/weekly/csv")
    public ResponseEntity<byte[]> exportWeeklyCsv() throws IOException {

        byte[] csv = reportService.exportWeeklyCsv();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=Weekly_Report.csv")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(csv);
    }

    @GetMapping("/monthly/csv")
    public ResponseEntity<byte[]> exportMonthlyCsv() throws IOException {

        byte[] csv = reportService.exportMonthlyCsv();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=Monthly_Report.csv")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(csv);
    }
}