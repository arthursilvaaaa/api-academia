package com.api.academia.Service;

import com.api.academia.DTO.request.MatriculaRequestDTO;
import com.api.academia.Mapper.MatriculaMapper;
import com.api.academia.Model.AulaModel;
import com.api.academia.Model.AlunoModel;
import com.api.academia.Model.MatriculaModel;
import com.api.academia.Repository.AlunoRepository;
import com.api.academia.Repository.AulaRepository;
import com.api.academia.Repository.MatriculaRepository;
import com.api.academia.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MatriculaService {
    private final MatriculaRepository matriculaRepository;
    private final MatriculaMapper matriculaMapper;
    private final AlunoRepository alunoRepository;
    private final AulaRepository aulaRepository;

    public List<MatriculaModel> findAll() {
        return matriculaRepository.findAll();
    }

    public MatriculaModel findById(long id) {
        return matriculaRepository.findById(id)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,"Matrícula não encontrada."));
    }

    public MatriculaModel save(MatriculaRequestDTO matriculaRequestDTO) {
        MatriculaModel matriculaModel = matriculaMapper.toModel(matriculaRequestDTO);
        AlunoModel alunoModel = alunoRepository.findById(matriculaRequestDTO.alunoId())
                .orElseThrow(() -> new BadRequestException("Aluno não encontrado com o id: " + matriculaRequestDTO.alunoId()));
        AulaModel aulaModel = aulaRepository.findById(matriculaRequestDTO.aulaId())
                .orElseThrow(() -> new BadRequestException("Aula não encontrada com o id: " + matriculaRequestDTO.aulaId()));

        matriculaModel.setAlunoModel(alunoModel);
        matriculaModel.setAulaModel(aulaModel);

        return matriculaRepository.save(matriculaModel);
    }

    public void delete(long id) {
        if (!matriculaRepository.existsById(id)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Matrícula não encontrada.");
        }
        matriculaRepository.deleteById(id);
    }
}
