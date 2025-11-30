package com.resumereviewer.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnalysisResponse {
    private Long id;
    private String resumeFileName;
    private Integer matchScore;
    private List<String> suggestions;
    private String fullAnalysis;
    private LocalDateTime createdAt;
}
