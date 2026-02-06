package com.moneymanager.util;

import com.lowagie.text.Document;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;
import com.moneymanager.dto.ReportTransactionDTO;

import java.io.OutputStream;
import java.util.List;

public class ReportPdfGenerator {

    public static void generate(List<ReportTransactionDTO> list,
                                OutputStream out) throws Exception {

        Document document = new Document();
        PdfWriter.getInstance(document, out);

        document.open();
        document.add(new Paragraph("Money Manager Report"));
        document.add(new Paragraph(" "));

        for (ReportTransactionDTO dto : list) {
            document.add(new Paragraph(
                    dto.getDate() + " | " +
                            dto.getCategory() + " | " +
                            dto.getType() + " | ₹" +
                            dto.getAmount()
            ));
        }

        document.close();
    }
}
