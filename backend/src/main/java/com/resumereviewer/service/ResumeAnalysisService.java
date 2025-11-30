package com.resumereviewer.service;

import com.resumereviewer.dto.AnalysisResponse;
import com.resumereviewer.model.ResumeAnalysis;
import com.resumereviewer.repository.ResumeAnalysisRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ResumeAnalysisService {
    
    private final ResumeAnalysisRepository repository;
    private final PdfParserService pdfParserService;
    private final GeminiService geminiService;
    
    public AnalysisResponse analyzeResume(MultipartFile resumeFile, String jobDescription) throws Exception {
        String resumeText = pdfParserService.extractTextFromFile(resumeFile);
        String fileName = resumeFile.getOriginalFilename();
        
        Map<String, Object> analysisResult = geminiService.analyzeResume(resumeText, jobDescription);
        
        ResumeAnalysis analysis = new ResumeAnalysis();
        analysis.setResumeText(resumeText);
        analysis.setJobDescription(jobDescription);
        analysis.setResumeFileName(fileName);
        analysis.setMatchScore((Integer) analysisResult.get("matchScore"));
        analysis.setSuggestion1((String) analysisResult.get("suggestion1"));
        analysis.setSuggestion2((String) analysisResult.get("suggestion2"));
        analysis.setSuggestion3((String) analysisResult.get("suggestion3"));
        analysis.setFullAnalysis((String) analysisResult.get("analysis"));
        
        ResumeAnalysis savedAnalysis = repository.save(analysis);
        
        return mapToResponse(savedAnalysis);
    }
    
    public List<AnalysisResponse> getAllAnalyses() {
        return repository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    
    public AnalysisResponse getAnalysisById(Long id) {
        return repository.findById(id)
                .map(this::mapToResponse)
                .orElse(null);
    }
    
    private AnalysisResponse mapToResponse(ResumeAnalysis analysis) {
        return new AnalysisResponse(
                analysis.getId(),
                analysis.getResumeFileName(),
                analysis.getMatchScore(),
                Arrays.asList(
                        analysis.getSuggestion1(),
                        analysis.getSuggestion2(),
                        analysis.getSuggestion3()
                ),
                analysis.getFullAnalysis(),
                analysis.getCreatedAt()
        );
    }
}
