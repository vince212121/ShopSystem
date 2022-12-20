package com.vl.server.purchaseorder;

import com.vl.server.product.Product;
import com.vl.server.vendor.Vendor;
import com.vl.server.vendor.VendorRepository;
import com.vl.server.product.ProductRepository;
import com.itextpdf.io.font.constants.StandardFonts;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.borders.Border;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import org.springframework.web.servlet.view.document.AbstractPdfView;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.net.URL;
import java.text.NumberFormat;
import java.time.format.DateTimeFormatter;
import java.util.Locale;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

public abstract class PurchaseOrderPDFGenerator extends AbstractPdfView {
        public static ByteArrayInputStream generateReport(String poid,
                        PurchaseOrderRepository poRepository,
                        VendorRepository vendorRepository,
                        ProductRepository productRepository) throws IOException {
                URL imageUrl = PurchaseOrderPDFGenerator.class.getResource("/static/images/logo.png");
                ByteArrayOutputStream baos = new ByteArrayOutputStream();
                PdfWriter writer = new PdfWriter(baos);
                // Initialize PDF document to be written to a stream not a file
                PdfDocument pdf = new PdfDocument(writer);
                // Document is the main object
                Document document = new Document(pdf);
                PdfFont font = PdfFontFactory.createFont(StandardFonts.HELVETICA);
                // add the image to the document
                PageSize pg = PageSize.A4;
                Image img = new Image(ImageDataFactory.create(imageUrl)).scaleAbsolute(60, 60)
                                .setFixedPosition(pg.getWidth() / 6, 700);
                document.add(img);
                // now let's add a big heading
                document.add(new Paragraph("\n\n"));
                Locale locale = new Locale("en", "US");
                NumberFormat formatter = NumberFormat.getCurrencyInstance(locale);

                try {
                        Optional<PurchaseOrder> optPo = poRepository.findById(Long.parseLong(poid));

                        if (optPo.isPresent()) {
                                PurchaseOrder po = optPo.get();
                                document.add(new Paragraph(String.format("Purchase Order"))
                                                .setFont(font)
                                                .setFontSize(24)
                                                .setMarginRight(75)
                                                .setTextAlignment(TextAlignment.RIGHT)
                                                .setBold());
                                document.add(new Paragraph("#:" + poid)
                                                .setFont(font)
                                                .setFontSize(16)
                                                .setBold()
                                                .setMarginRight(145)
                                                .setMarginTop(-10)
                                                .setTextAlignment(TextAlignment.RIGHT));
                                document.add(new Paragraph("\n\n"));

                                Optional<Vendor> opt = vendorRepository.findById(po.getVendorid());
                                if (opt.isPresent()) {
                                        Vendor vendor = opt.get();

                                        // now a 2 column table
                                        Table table = new Table(2);
                                        table.setWidth(new UnitValue(UnitValue.PERCENT, 35));
                                        // Unfortunately we must format each cell individually :(
                                        // table headings
                                        Cell cell = new Cell().add(new Paragraph("Vendor:")
                                                        .setFont(font)
                                                        .setFontSize(12)
                                                        .setBold())
                                                        .setBorder(Border.NO_BORDER)
                                                        .setTextAlignment(TextAlignment.LEFT);
                                        table.addCell(cell);
                                        cell = new Cell().add(new Paragraph(vendor.getName())
                                                        .setFont(font)
                                                        .setFontSize(12)
                                                        .setBold())
                                                        .setBorder(Border.NO_BORDER)
                                                        .setBackgroundColor(ColorConstants.LIGHT_GRAY)
                                                        .setTextAlignment(TextAlignment.LEFT);
                                        table.addCell(cell);
                                        // table details
                                        table.addCell(new Cell().setBorder(Border.NO_BORDER));
                                        cell = new Cell().add(new Paragraph(vendor.getAddress1())
                                                        .setFont(font)
                                                        .setFontSize(12)
                                                        .setBold())
                                                        .setBorder(Border.NO_BORDER)
                                                        .setBackgroundColor(ColorConstants.LIGHT_GRAY)
                                                        .setTextAlignment(TextAlignment.LEFT);
                                        table.addCell(cell);
                                        table.addCell(new Cell().setBorder(Border.NO_BORDER));
                                        cell = new Cell().add(new Paragraph(vendor.getCity())
                                                        .setFont(font)
                                                        .setFontSize(12)
                                                        .setBold())
                                                        .setBorder(Border.NO_BORDER)
                                                        .setBackgroundColor(ColorConstants.LIGHT_GRAY)
                                                        .setTextAlignment(TextAlignment.LEFT);
                                        table.addCell(cell);
                                        table.addCell(new Cell().setBorder(Border.NO_BORDER));
                                        cell = new Cell().add(new Paragraph(vendor.getProvince())
                                                        .setFont(font)
                                                        .setFontSize(12)
                                                        .setBold())
                                                        .setBorder(Border.NO_BORDER)
                                                        .setBackgroundColor(ColorConstants.LIGHT_GRAY)
                                                        .setTextAlignment(TextAlignment.LEFT);
                                        table.addCell(cell);
                                        table.addCell(new Cell().setBorder(Border.NO_BORDER));
                                        cell = new Cell().add(new Paragraph(vendor.getEmail())
                                                        .setFont(font)
                                                        .setFontSize(12)
                                                        .setBold())
                                                        .setBorder(Border.NO_BORDER)
                                                        .setBackgroundColor(ColorConstants.LIGHT_GRAY)
                                                        .setTextAlignment(TextAlignment.LEFT);
                                        table.addCell(cell);
                                        document.add(table);

                                        // add table spacing
                                        document.add(new Paragraph("\n\n"));

                                        // now a 5 column table
                                        Table productTable = new Table(5);
                                        productTable.setWidth(new UnitValue(UnitValue.PERCENT, 100));
                                        // table headings
                                        cell = new Cell().add(new Paragraph("Product Code")
                                                        .setFont(font)
                                                        .setFontSize(12)
                                                        .setBold())
                                                        .setTextAlignment(TextAlignment.CENTER);
                                        productTable.addCell(cell);
                                        cell = new Cell().add(new Paragraph("Description")
                                                        .setFont(font)
                                                        .setFontSize(12)
                                                        .setBold())
                                                        .setTextAlignment(TextAlignment.CENTER);
                                        productTable.addCell(cell);
                                        cell = new Cell().add(new Paragraph("Qty Sold")
                                                        .setFont(font)
                                                        .setFontSize(12)
                                                        .setBold())
                                                        .setTextAlignment(TextAlignment.CENTER);
                                        productTable.addCell(cell);
                                        cell = new Cell().add(new Paragraph("Price")
                                                        .setFont(font)
                                                        .setFontSize(12)
                                                        .setBold())
                                                        .setTextAlignment(TextAlignment.CENTER);
                                        productTable.addCell(cell);
                                        cell = new Cell().add(new Paragraph("Ext. Price")
                                                        .setFont(font)
                                                        .setFontSize(12)
                                                        .setBold())
                                                        .setTextAlignment(TextAlignment.CENTER);
                                        productTable.addCell(cell);

                                        BigDecimal tot = new BigDecimal(0.0);

                                        for (PurchaseOrderLineItem line : po.getItems()) {
                                                Optional<Product> optx = productRepository
                                                                .findById(line.getProductid());
                                                if (optx.isPresent()) {
                                                        Product prod = optx.get();

                                                        // table details
                                                        cell = new Cell().add(new Paragraph(prod.getId())
                                                                        .setFont(font)
                                                                        .setFontSize(12)
                                                                        .setTextAlignment(TextAlignment.CENTER));
                                                        productTable.addCell(cell);
                                                        cell = new Cell().add(new Paragraph(prod.getName())
                                                                        .setFont(font)
                                                                        .setFontSize(12)
                                                                        .setTextAlignment(TextAlignment.CENTER));
                                                        productTable.addCell(cell);
                                                        cell = new Cell().add(new Paragraph(prod.getQoo() + "") // Java
                                                                                                                // compiler
                                                                                                                // casts
                                                                                                                // int
                                                                                                                // to
                                                                                                                // string
                                                                        .setFont(font)
                                                                        .setFontSize(12)
                                                                        .setTextAlignment(TextAlignment.RIGHT));
                                                        productTable.addCell(cell);
                                                        cell = new Cell().add(new Paragraph(
                                                                        formatter.format(prod.getCostprice()))
                                                                        .setFont(font)
                                                                        .setFontSize(12)
                                                                        .setTextAlignment(TextAlignment.RIGHT));
                                                        productTable.addCell(cell);
                                                        cell = new Cell().add(new Paragraph(
                                                                        formatter.format(prod.getCostprice().multiply(
                                                                                        new BigDecimal(prod.getQoo()))))
                                                                        .setFont(font)
                                                                        .setFontSize(12)
                                                                        .setTextAlignment(TextAlignment.RIGHT));
                                                        productTable.addCell(cell);

                                                        tot = tot.add(prod.getCostprice()
                                                                        .multiply(new BigDecimal(prod.getQoo())),
                                                                        new MathContext(8, RoundingMode.UP));
                                                }
                                        }

                                        // sub total
                                        cell = new Cell(1, 4).add(new Paragraph("Sub Total:"))
                                                        .setBorder(Border.NO_BORDER)
                                                        .setTextAlignment(TextAlignment.RIGHT);
                                        productTable.addCell(cell);
                                        cell = new Cell().add(new Paragraph(formatter.format(tot)))
                                                        .setTextAlignment(TextAlignment.RIGHT);
                                        productTable.addCell(cell);
                                        // tax
                                        cell = new Cell(1, 4).add(new Paragraph("Tax:"))
                                                        .setBorder(Border.NO_BORDER)
                                                        .setTextAlignment(TextAlignment.RIGHT);
                                        productTable.addCell(cell);
                                        cell = new Cell()
                                                        .add(new Paragraph(formatter
                                                                        .format(tot.multiply(new BigDecimal(0.13)))))
                                                        .setTextAlignment(TextAlignment.RIGHT);
                                        productTable.addCell(cell);
                                        // pruchase order total
                                        cell = new Cell(1, 4).add(new Paragraph("PO Total:"))
                                                        .setBorder(Border.NO_BORDER)
                                                        .setTextAlignment(TextAlignment.RIGHT);
                                        productTable.addCell(cell);
                                        cell = new Cell()
                                                        .add(new Paragraph(formatter
                                                                        .format(tot.multiply(new BigDecimal(1.13)))))
                                                        .setTextAlignment(TextAlignment.RIGHT)
                                                        .setBackgroundColor(ColorConstants.YELLOW);
                                        productTable.addCell(cell);

                                        document.add(productTable);

                                        document.add(new Paragraph("\n\n"));
                                        DateTimeFormatter dateFormatter = DateTimeFormatter
                                                        .ofPattern("yyyy-MM-dd h:mm a");
                                        document.add(new Paragraph(dateFormatter.format(optPo.get().getPodate()))
                                                        .setTextAlignment(TextAlignment.CENTER));

                                }
                        }

                        document.close();
                } catch (Exception ex) {
                        Logger.getLogger(PurchaseOrderPDFGenerator.class.getName()).log(Level.SEVERE, null, ex);
                }

                // finally send stream back to the controller
                return new ByteArrayInputStream(baos.toByteArray());
        }
}
