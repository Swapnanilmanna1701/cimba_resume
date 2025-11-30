package com.resumereviewer.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnalysisRequest {
    private String resumeText;
    private String jobDescription;
    private String resumeFileName;
}
