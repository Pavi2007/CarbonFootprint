package com.carbonfootprint.carbonfootprint.service;

import com.carbonfootprint.carbonfootprint.dto.admin.ReportResponse;

import java.io.IOException;
import java.util.List;

public interface ReportService {

    List<ReportResponse> getWeeklyReport();

    List<ReportResponse> getMonthlyReport();

    byte[] exportWeeklyPdf() throws IOException;

    byte[] exportMonthlyPdf() throws IOException;

    byte[] exportWeeklyCsv() throws IOException;

    byte[] exportMonthlyCsv() throws IOException;
}