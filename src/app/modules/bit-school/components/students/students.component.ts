import {Component, OnInit} from '@angular/core';
import {MATERIAL_IMPORTS} from '../../../../shared/imports/material.imports';
import {ClassMember} from '../../../../shared/models/bit-class-models/class-member';
import {GeneralService} from '../../../../shared/services/general.service';
import {EndpointsService} from '../../../../shared/services/endpoints.service';
import {ToastrService} from 'ngx-toastr';
import {Class} from '../../../../shared/models/bit-class-models/class';

@Component({
  selector: 'app-students',
  imports: [
    MATERIAL_IMPORTS,

  ],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit {
  public members: ClassMember[] = [];
  public class: Class[] = [];
  public classId: number = 1

  constructor(
    private generalService: GeneralService,
    private endpointService: EndpointsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getClassMembers();
  }

  public getClassMembers(): void {
    const path = this.endpointService.path.classMembers(this.classId);
    this.generalService.get(path).subscribe({
      next: (res) => {
        this.members = res;
        this.toastr.success('Alunos carregados com sucesso!');
      },
      error: (err) => {
        console.error('Erro ao buscar membros:', err);
        this.toastr.error('Erro ao carregar alunos');
      }
    });
  }
}
