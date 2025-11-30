package com.resumereviewer.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "resume_analyses")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResumeAnalysis {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(columnDefinition = "TEXT")
    private String resumeText;
    
    @Column(columnDefinition = "TEXT")
    private String jobDescription;
    
    private String resumeFileName;
    
    private Integer matchScore;
    
    @Column(columnDefinition = "TEXT")
    private String suggestion1;
    
    @Column(columnDefinition = "TEXT")
    private String suggestion2;
    
    @Column(columnDefinition = "TEXT")
    private String suggestion3;
    
    @Column(columnDefinition = "TEXT")
    private String fullAnalysis;
    
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
