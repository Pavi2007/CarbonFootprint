package com.carbonfootprint.carbonfootprint.dto.gemini;

public class Candidate {

    private ResponseContent content;

    private String finishReason;

    public Candidate() {
    }

    public ResponseContent getContent() {
        return content;
    }

    public void setContent(ResponseContent content) {
        this.content = content;
    }

    public String getFinishReason() {
        return finishReason;
    }

    public void setFinishReason(String finishReason) {
        this.finishReason = finishReason;
    }

    @Override
    public String toString() {
        return "Candidate{" +
                "finishReason='" + finishReason + '\'' +
                ", content=" + content +
                '}';
    }
}