package com.resumereviewer.service;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.Map;

@Service
public class GeminiService {
    
    @Value("${gemini.api.key}")
    private String apiKey;
    
    private final HttpClient httpClient = HttpClient.newHttpClient();
    private final Gson gson = new Gson();
    
    public Map<String, Object> analyzeResume(String resumeText, String jobDescription) throws Exception {
        String prompt = buildPrompt(resumeText, jobDescription);
        String response = callGeminiApi(prompt);
        return parseResponse(response);
    }
    
    private String buildPrompt(String resumeText, String jobDescription) {
        return """
            You are an expert resume reviewer and career coach. Analyze the following resume against the job description and provide:
            
            1. A match score from 0 to 100 (where 100 is a perfect match)
            2. Exactly three specific improvement suggestions
            
            IMPORTANT: Respond ONLY in valid JSON format with this exact structure:
            {
                "matchScore": <number between 0-100>,
                "suggestion1": "<first specific improvement suggestion>",
                "suggestion2": "<second specific improvement suggestion>",
                "suggestion3": "<third specific improvement suggestion>",
                "analysis": "<brief overall analysis explaining the score>"
            }
            
            Consider these factors when scoring:
            - Skills match (technical and soft skills)
            - Experience relevance
            - Education alignment
            - Keywords from job description present in resume
            - Overall presentation and clarity
            
            For suggestions, focus on:
            - Missing keywords that should be added
            - Skills that could be highlighted better
            - Phrasing improvements for impact
            - Any gaps that should be addressed
            
            === RESUME ===
            %s
            
            === JOB DESCRIPTION ===
            %s
            
            Remember: Respond ONLY with valid JSON, no additional text.
            """.formatted(resumeText, jobDescription);
    }
    
    private String callGeminiApi(String prompt) throws Exception {
        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey;
        
        JsonObject requestBody = new JsonObject();
        JsonArray contents = new JsonArray();
        JsonObject content = new JsonObject();
        JsonArray parts = new JsonArray();
        JsonObject part = new JsonObject();
        
        part.addProperty("text", prompt);
        parts.add(part);
        content.add("parts", parts);
        content.addProperty("role", "user");
        contents.add(content);
        requestBody.add("contents", contents);
        
        JsonObject generationConfig = new JsonObject();
        generationConfig.addProperty("temperature", 0.3);
        generationConfig.addProperty("maxOutputTokens", 2048);
        requestBody.add("generationConfig", generationConfig);
        
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(gson.toJson(requestBody)))
                .build();
        
        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        
        if (response.statusCode() != 200) {
            throw new RuntimeException("Gemini API error: " + response.body());
        }
        
        return response.body();
    }
    
    private Map<String, Object> parseResponse(String apiResponse) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            JsonObject responseJson = gson.fromJson(apiResponse, JsonObject.class);
            JsonArray candidates = responseJson.getAsJsonArray("candidates");
            
            if (candidates != null && candidates.size() > 0) {
                JsonObject candidate = candidates.get(0).getAsJsonObject();
                JsonObject contentObj = candidate.getAsJsonObject("content");
                JsonArray partsArray = contentObj.getAsJsonArray("parts");
                
                if (partsArray != null && partsArray.size() > 0) {
                    String text = partsArray.get(0).getAsJsonObject().get("text").getAsString();
                    
                    text = text.trim();
                    if (text.startsWith("```json")) {
                        text = text.substring(7);
                    }
                    if (text.startsWith("```")) {
                        text = text.substring(3);
                    }
                    if (text.endsWith("```")) {
                        text = text.substring(0, text.length() - 3);
                    }
                    text = text.trim();
                    
                    JsonObject analysisResult = gson.fromJson(text, JsonObject.class);
                    
                    result.put("matchScore", analysisResult.get("matchScore").getAsInt());
                    result.put("suggestion1", analysisResult.get("suggestion1").getAsString());
                    result.put("suggestion2", analysisResult.get("suggestion2").getAsString());
                    result.put("suggestion3", analysisResult.get("suggestion3").getAsString());
                    result.put("analysis", analysisResult.get("analysis").getAsString());
                }
            }
        } catch (Exception e) {
            result.put("matchScore", 0);
            result.put("suggestion1", "Unable to parse AI response. Please try again.");
            result.put("suggestion2", "Ensure your resume and job description are clearly formatted.");
            result.put("suggestion3", "Contact support if the issue persists.");
            result.put("analysis", "Error analyzing resume: " + e.getMessage());
        }
        
        return result;
    }
}
