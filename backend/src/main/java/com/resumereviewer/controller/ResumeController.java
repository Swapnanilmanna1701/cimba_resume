package com.resumereviewer.controller;

import com.resumereviewer.dto.AnalysisResponse;
import com.resumereviewer.service.ResumeAnalysisService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ResumeController {
    
    private final ResumeAnalysisService analysisService;
    
    @PostMapping("/analyze")
    public ResponseEntity<?> analyzeResume(
            @RequestParam("resume") MultipartFile resumeFile,
            @RequestParam("jobDescription") String jobDescription) {
        try {
            if (resumeFile.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Resume file is required"));
            }
            if (jobDescription == null || jobDescription.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Job description is required"));
            }
            
            AnalysisResponse response = analysisService.analyzeResume(resumeFile, jobDescription);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Failed to analyze resume: " + e.getMessage()));
        }
    }
    
    @GetMapping("/analyses")
    public ResponseEntity<List<AnalysisResponse>> getAllAnalyses() {
        return ResponseEntity.ok(analysisService.getAllAnalyses());
    }
    
    @GetMapping("/analyses/{id}")
    public ResponseEntity<?> getAnalysisById(@PathVariable Long id) {
        AnalysisResponse response = analysisService.getAnalysisById(id);
        if (response == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "healthy"));
    }
}
