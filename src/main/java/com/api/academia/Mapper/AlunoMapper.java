package com.api.academia.Mapper;

import com.api.academia.DTO.request.AlunoRequestDTO;
import com.api.academia.DTO.response.AlunoResponseDTO;
import com.api.academia.Model.AlunoModel;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AlunoMapper {
    AlunoModel toModel(AlunoRequestDTO requestDTO);
    AlunoResponseDTO toResponse(AlunoModel alunoModel);
}
