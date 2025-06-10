import {Component, Input, OnInit} from '@angular/core';
import {GeneralService} from '../../../../../shared/services/general.service';
import {Activity} from '../../../../../shared/models/bit-class-models/activity';
import {EndpointsService} from '../../../../../shared/services/endpoints.service';
import {ActivatedRoute} from '@angular/router';
import {MATERIAL_IMPORTS} from '../../../../../shared/imports/material.imports';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  imports: [
    MATERIAL_IMPORTS
  ],
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  @Input() activities!: Activity[];
  @Input() activity!: Activity;

  constructor(
    private generalService: GeneralService,
    private endpoints: EndpointsService,
    private route: ActivatedRoute,
) {}

  ngOnInit(): void {
    this.loadAvaliations();
  }

  loadAvaliations(): void {
    const classId = Number(this.route.snapshot.paramMap.get('classId'));
    const path = this.endpoints.path.classActivities(classId);
    this.generalService
      .list(path)
      .subscribe({
        next: (data: Activity[]) => this.activities = data,
        error: (err: unknown) => console.error('Erro ao buscar avaliações', err)
      });
  }
}
