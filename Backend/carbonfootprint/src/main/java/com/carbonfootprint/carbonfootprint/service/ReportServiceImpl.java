package com.carbonfootprint.carbonfootprint.service;

import com.carbonfootprint.carbonfootprint.dto.admin.ReportResponse;
import com.carbonfootprint.carbonfootprint.repository.ActivityRepository;
import com.lowagie.text.Document;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final ActivityRepository activityRepository;

    @Override
    public List<ReportResponse> getWeeklyReport() {
        return activityRepository.getReportByDate(LocalDate.now().minusDays(7));
    }

    @Override
    public List<ReportResponse> getMonthlyReport() {
        return activityRepository.getReportByDate(LocalDate.now().minusMonths(1));
    }

    @Override

    public byte[] exportWeeklyPdf() throws IOException {

        List<ReportResponse> reports = getWeeklyReport();

        ByteArrayOutputStream out = new ByteArrayOutputStream();

        Document document = new Document();

        PdfWriter.getInstance(document, out);

        document.open();

        document.add(new Paragraph("Weekly Carbon Footprint Report"));
        document.add(new Paragraph(" "));

        PdfPTable table = new PdfPTable(3);

        table.addCell("User Name");
        table.addCell("Total Activities");
        table.addCell("Total Emission");

        for (ReportResponse report : reports) {

            table.addCell(report.getUserName());
            table.addCell(String.valueOf(report.getTotalActivities()));
            table.addCell(String.valueOf(report.getTotalEmission()));

        }

        document.add(table);

        document.close();

        return out.toByteArray();
    }
    @Override
    public byte[] exportMonthlyPdf() throws IOException {

        List<ReportResponse> reports = getMonthlyReport();

        ByteArrayOutputStream out = new ByteArrayOutputStream();

        Document document = new Document();

        PdfWriter.getInstance(document, out);

        document.open();

        document.add(new Paragraph("Monthly Carbon Footprint Report"));
        document.add(new Paragraph(" "));

        PdfPTable table = new PdfPTable(3);

        table.addCell("User Name");
        table.addCell("Total Activities");
        table.addCell("Total Emission");

        for (ReportResponse report : reports) {

            table.addCell(report.getUserName());
            table.addCell(String.valueOf(report.getTotalActivities()));
            table.addCell(String.valueOf(report.getTotalEmission()));

        }

        document.add(table);

        document.close();

        return out.toByteArray();
    }

    @Override
    public byte[] exportMonthlyCsv() throws IOException {

        List<ReportResponse> reports = getMonthlyReport();

        StringBuilder csv = new StringBuilder();

        csv.append("User Name,Total Activities,Total Emission\n");

        for (ReportResponse report : reports) {
            csv.append(report.getUserName()).append(",");
            csv.append(report.getTotalActivities()).append(",");
            csv.append(report.getTotalEmission()).append("\n");
        }

        return csv.toString().getBytes();
    }
    @Override
    public byte[] exportWeeklyCsv() throws IOException {

        List<ReportResponse> reports = getWeeklyReport();

        StringBuilder csv = new StringBuilder();

        csv.append("User Name,Total Activities,Total Emission\n");

        for (ReportResponse report : reports) {
            csv.append(report.getUserName()).append(",");
            csv.append(report.getTotalActivities()).append(",");
            csv.append(report.getTotalEmission()).append("\n");
        }

        return csv.toString().getBytes();
    }
}