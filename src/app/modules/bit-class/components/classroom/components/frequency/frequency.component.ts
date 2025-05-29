import {Component, OnInit} from '@angular/core';
import {ClassMember} from '../../../../../../shared/models/class-member';
import {TesteService} from '../../../../../../shared/services/teste.service';
import {MatListOption, MatSelectionList} from '@angular/material/list';
import {MatButton} from '@angular/material/button';
import {ToastrService} from 'ngx-toastr';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-frequency',
  standalone: true,
  imports: [
    MatSelectionList,
    MatListOption,
    MatButton,
    FormsModule
  ],
  templateUrl: './frequency.component.html',
  styleUrl: './frequency.component.scss'
})
export class FrequencyComponent implements OnInit{

  public classMembers: ClassMember[] = [];

  constructor(private classMemberService: TesteService,
              public toastr: ToastrService
              ) {
  }

  ngOnInit() {
    this.classMemberService.getClassMembers().then(members => {
      this.classMembers = members;
      console.log(members);
    });
  }

  public trackByIndex(index: number, item: any) {
    return index;
  }

  public onDateToda(date: Date) {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  }


  public onPostFrequency(students: MatSelectionList) {
    try {
      const selectedStudents = students.selectedOptions.selected.map(option => option.value);
      console.log('Selecionados:', selectedStudents);
      this.toastr.success('Frequência enviada com sucesso!', 'Sucesso');
    } catch (error) {
      console.error('Erro ao enviar frequência:', error);
      this.toastr.error('Erro ao enviar frequência', 'Erro');
    }
  }
}
