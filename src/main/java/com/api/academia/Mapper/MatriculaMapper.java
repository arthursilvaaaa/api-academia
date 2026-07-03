package com.api.academia.Mapper;

import com.api.academia.DTO.request.MatriculaRequestDTO;
import com.api.academia.DTO.response.MatriculaResponseDTO;
import com.api.academia.Model.MatriculaModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MatriculaMapper {
    @Mapping(target = "alunoModel", ignore = true)
    @Mapping(target = "aulaModel",ignore = true)
    MatriculaModel toModel (MatriculaRequestDTO dto);
    MatriculaResponseDTO toResponse (MatriculaModel matriculaModel);
}
