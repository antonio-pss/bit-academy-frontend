import { Component } from '@angular/core';
import { Class } from '../../../../shared/models/bit-class-models/class';
import {ToastrService} from 'ngx-toastr';
import {EndpointsService} from '../../../../shared/services/endpoints.service';
import {GeneralService} from '../../../../shared/services/general.service';
import {ClassMember} from '../../../../shared/models/bit-class-models/class-member';

@Component({
  selector: 'app-teacher-class',
  imports: [],
  templateUrl: './teacher-class.component.html',
  styleUrl: './teacher-class.component.scss'
})
export class TeacherClassComponent {

  public displayedClasses: Class[] = [];
  public filteredClasses: Class[] = [];

  constructor(
    private classService: GeneralService,
    private endpoint: EndpointsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadTeacherClasses();
  }

  public loadTeacherClasses(): void {
    this.classService.get(this.endpoint.path.myTeacherClass).subscribe({
      next: (members: ClassMember[]) => {
        this.displayedClasses = members.map(m => m.class_id);
      },
      error: (error) => {
        console.error('Erro ao carregar classes do professor:', error);
        this.toastr.error('Erro ao carregar suas salas como professor');
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
