package com.moneymanager.controller;

import com.moneymanager.dto.ReportTransactionDTO;
import com.moneymanager.service.ReportService;
import com.moneymanager.util.ReportPdfGenerator;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin("*")
public class ReportController {

    @Autowired
    private ReportService service;

    @GetMapping("/transactions")
    public List<ReportTransactionDTO> getTransactions() {
        return service.getAllTransactions();
    }

    @GetMapping("/summary")
    public Map<String, Double> getSummary() {
        return service.getSummary();
    }

    @GetMapping("/download")
    public void downloadPdf(HttpServletResponse response) throws Exception {

        response.setContentType("application/pdf");
        response.setHeader(
                "Content-Disposition",
                "attachment; filename=report.pdf"
        );

        ReportPdfGenerator.generate(
                service.getAllTransactions(),
                response.getOutputStream()
        );
    }
}
