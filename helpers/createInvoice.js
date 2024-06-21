const fs = require("fs");
const PDFDocument = require("pdfkit");

const createInvoice = (data, filePath) => {
    const doc = new PDFDocument({ size: "A4" });

    doc.pipe(fs.createWriteStream(filePath));

    // Add background image with adjusted top margin
    const backgroundImageBuffer = Buffer.from(data.images.background, "base64");
    const imagePosition = {
        fit: [595.28, 841.89], // A4 size
        align: "center",
        valign: "center",
    };
    const topMarginAdjustment = 0; // Adjust this value to decrease the top margin
    doc.image(backgroundImageBuffer, 0, topMarginAdjustment, imagePosition);

    // Header
    const headerYPosition = 200; // Adjust this value to position the header lower
    doc.fontSize(16).text(data.translate.invoice, 50, headerYPosition, { align: "right" });

    // Sender details
    const senderYPosition = headerYPosition + 40;
    doc.font("Helvetica-Bold").fontSize(14).text(`${data.sender.company}`, 50, senderYPosition);
    doc
        .font("Helvetica")
        .fontSize(12)
        .text(`Address: ${data.sender.address}`, 50, senderYPosition + 15)
        .text(`Country: ${data.sender.country}`, 50, senderYPosition + 35);

    // Divider Line
    doc
        .moveTo(50, senderYPosition + 50)
        .lineTo(550, senderYPosition + 50)
        .stroke();

    // Client details
    const clientYPosition = senderYPosition + 70;
    doc.font("Helvetica-Bold").fontSize(14).text(`${data.client.company}`, 50, clientYPosition);
    doc
        .font("Helvetica")
        .fontSize(12)
        .text(`Address: ${data.client.address}`, 50, clientYPosition + 20)
        .text(`Country: ${data.client.country}`, 50, clientYPosition + 35);

    // Invoice details
    const invoiceYPosition = clientYPosition + 50;
    const invoiceXPosition = 390; // Adjust this value to move invoice details horizontally
    doc.font("Helvetica-Bold").fontSize(14).text(`${data.translate.number}: ${data.information.number}`, invoiceXPosition, clientYPosition);
    doc
        .font("Helvetica")
        .fontSize(12)
        .text(`Date: ${data.information.date}`, invoiceXPosition, clientYPosition + 15)
        // .text(`Due-date: ${data.information["due-date"]}`, invoiceXPosition, clientYPosition + 30);

    // Divider Line
    doc.moveTo(50, invoiceYPosition + 20).lineTo(550, invoiceYPosition + 20).stroke();

    // Products Table
    const productsYPosition = invoiceYPosition + 40;
    doc.font("Helvetica-Bold").fontSize(14).text(`${data.translate.products}:`, 50, productsYPosition);

    // Table Header
    const tableHeaderY = productsYPosition + 20;
    const tableStartX = 50;
    const tableEndX = 550;

    const tableColumns = [
        { title: "Course", x: tableStartX + 10, width: 200 },
        { title: " ", x: tableStartX + 220, width: 70 },
        { title: "Amount", x: tableStartX + 300, width: 70 },
        { title: "Total", x: tableStartX + 380, width: 100 },
    ];

    tableColumns.forEach((column) => {
        doc
            .font("Helvetica-Bold")
            .fontSize(12)
            .text(column.title, column.x, tableHeaderY + 5);
    });

    doc
        .moveTo(tableStartX, tableHeaderY + 20)
        .lineTo(tableEndX, tableHeaderY + 20)
        .stroke();

    // Table Rows
    let currentY = tableHeaderY + 25;
    data.products.forEach((product) => {
        doc
            .font("Helvetica")
            .fontSize(12)
            .text(product.name, tableColumns[0].x, currentY)
            .text(product.quantity, tableColumns[1].x, currentY)
            .text(`${parseFloat(product.price).toFixed(2)}`, tableColumns[2].x, currentY)
            .text(`${parseFloat(product.total).toFixed(2)}`, tableColumns[3].x, currentY);
        currentY += 20;
    });

    // Subtotal and Amount Paid
    const totalsYPosition = currentY + 20;
    const amountPaid = parseFloat(5000);

    doc
        .font("Helvetica-Bold")
        .fontSize(12)
        .text("Subtotal:", 350, totalsYPosition)
        .text(`${amountPaid.toFixed(2)}`, 460, totalsYPosition, { align: "right" });

    doc.text("Amount Paid:", 350, totalsYPosition + 20).text(`${amountPaid.toFixed(2)}`, 460, totalsYPosition + 20, { align: "right" });

    // Bottom notice
    doc
        .font("Helvetica")
        .fontSize(12)
        .text(`\n${data["bottom-notice"]}`, 50, totalsYPosition + 60);

    doc.end();
};

module.exports = { createInvoice };
