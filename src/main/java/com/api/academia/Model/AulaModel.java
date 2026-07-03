package com.api.academia.Model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AulaModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String horario;

    @ManyToOne
    @JoinColumn(name = "instrutor_id", nullable = false)
    private InstrutorModel instrutorModel;

    @OneToMany(mappedBy = "aulaModel", cascade = CascadeType.ALL)
    private List<MatriculaModel> matriculaModels = new ArrayList<>();
}
