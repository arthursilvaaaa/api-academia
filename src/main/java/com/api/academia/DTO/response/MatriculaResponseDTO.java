package com.api.academia.DTO.response;

public record MatriculaResponseDTO(
        Long id,
        String dataMatricula,
        Long alunoId,
        String alunoNome,
        Long aulaId,
        String aulaNome
) {}
