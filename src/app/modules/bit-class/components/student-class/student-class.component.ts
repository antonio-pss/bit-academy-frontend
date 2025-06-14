import { Component } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {EndpointsService} from '../../../../shared/services/endpoints.service';
import {GeneralService} from '../../../../shared/services/general.service';
import {Class} from '../../../../shared/models/bit-class-models/class';
import {MATERIAL_IMPORTS} from '../../../../shared/imports/material.imports';
import {CommonModule} from '@angular/common';
import {ClassMember} from '../../../../shared/models/bit-class-models/class-member';

@Component({
  selector: 'app-student-class',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './student-class.component.html',
  styleUrl: './student-class.component.scss'
})
export class StudentClassComponent {

  public displayedClasses: Class[] = [];
  public filteredClasses: Class[] = [];

  constructor(
    private classService: GeneralService,
    private endpoint: EndpointsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadStudentClasses();
  }

  public loadStudentClasses(): void {
    this.classService.get(this.endpoint.path.myStudentClass).subscribe({
      next: (members: ClassMember[]) => {
        this.displayedClasses = members.map(m => m.class_id);
        this.filteredClasses = [...this.displayedClasses];
      },
      error: (error) => {
        console.error('Erro ao carregar classes do aluno:', error);
        this.toastr.error('Erro ao carregar suas salas como aluno');
      }
    });
  }

  public onSearch(term: string): void {
    const search = term.trim().toLowerCase();
    if (!search) {
      this.filteredClasses = [...this.displayedClasses];
    } else {
      this.filteredClasses = this.displayedClasses.filter(cls =>
        cls.name.toLowerCase().includes(search)
      );
    }
  }
}
