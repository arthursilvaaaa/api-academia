package com.api.academia.Service;

import com.api.academia.DTO.request.AulaRequestDTO;
import com.api.academia.Mapper.AulaMapper;
import com.api.academia.Model.AulaModel;
import com.api.academia.Model.InstrutorModel;
import com.api.academia.Repository.AulaRepository;
import com.api.academia.Repository.InstrutorRepository;
import com.api.academia.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AulaService {
    private final AulaRepository aulaRepository;
    private final InstrutorRepository instrutorRepository;
    private final AulaMapper aulaMapper;

    public List<AulaModel> listAll() {
        return aulaRepository.findAll();
    }


    public AulaModel findById(long id) {
        return aulaRepository.findById(id)
                .orElseThrow(()-> new BadRequestException("Aula não encontrada"));
    }

    public AulaModel save(AulaRequestDTO dto) {
        AulaModel aulaModel = aulaMapper.toModel(dto);
        InstrutorModel instrutorModel = instrutorRepository.findById(dto.instrutorId())
                .orElseThrow(() -> new BadRequestException("Instrutor não encontrado com o ID: " + dto.instrutorId()));

        aulaModel.setInstrutorModel(instrutorModel);

        return aulaRepository.save(aulaModel);
    }

    public void delete(long id) {
        if (!aulaRepository.existsById(id)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Aula não encontrada");
        }
        aulaRepository.deleteById(id);
    }
}
