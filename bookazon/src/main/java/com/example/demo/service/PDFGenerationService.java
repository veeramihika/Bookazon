package com.example.demo.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.xhtmlrenderer.pdf.ITextRenderer;

@Service

public class PDFGenerationService {

	@Autowired
	private TemplateEngine templateEngine;

	public File createPdf(String templateName, Map<String, Object> map,int order_id,String phonenumber) throws Exception {
		Context ctx = new Context();
		if (map != null) {
			for (Map.Entry<String, Object> entry : map.entrySet()) {
				ctx.setVariable(entry.getKey().toString(), entry.getValue());
			}
		}
		String processedHtml = templateEngine.process(templateName, ctx);
		FileOutputStream os = null;
		String fileName = ""+order_id+"_"+phonenumber;
		try {
			
			final File outputFile = File.createTempFile(fileName, ".pdf");
			
			os = new FileOutputStream(outputFile);
			ITextRenderer renderer = new ITextRenderer();
			renderer.setDocumentFromString(processedHtml);
			renderer.layout();
			renderer.createPDF(os, false);
			renderer.finishPDF();
			//System.out.println(outputFile.getName());
			return outputFile;
			
		}catch(Exception e) {
			
			throw e;
		}
		finally {
			if (os != null) {
				try {
					os.close();
				} catch (IOException e) {
				}
			}
		}
	}
}
