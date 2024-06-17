// components/solicitation/solicitation.component.ts
import { Component, OnInit } from '@angular/core';
import { Solicitation } from './models/sol.models';
import { PetService } from '../pet/services/pet.service';
import { TutorService } from '../tutor/services/tutor.service';
import { ServiceService } from '../service/services/service.service';
import { SolicitationService } from './services/sol.services';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
    selector: 'app-solicitation',
    templateUrl: './solicitation.component.html',
    providers: [MessageService]
})
export class CrudComponent implements OnInit {
    solicitationDialog: boolean = false;
    deleteSolicitationDialog: boolean = false;
    deleteSolicitationsDialog: boolean = false;

    solicitations: Solicitation[] = [];
    solicitation: Solicitation = {};
    selectedSolicitations: Solicitation[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    pets: any[] = [];
    tutors: any[] = [];
    services: any[] = [];
    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private solicitationService: SolicitationService,
        private petService: PetService,
        private tutorService: TutorService,
        private servicoService: ServiceService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.solicitationService.getSolicitations().subscribe((solicitations: any) => {
            this.solicitations = solicitations;
        });

        this.petService.getPets().subscribe((pets: any) => {
            this.pets = pets;
        });

        this.tutorService.getTutors().subscribe((tutors: any) => {
            this.tutors = tutors;
        });

        this.servicoService.getServices().subscribe((services: any) => {
            this.services = services;
        });

        this.cols = [
            { field: 'pet', header: 'Pet' },
            { field: 'tutor', header: 'Tutor' },
            { field: 'service', header: 'Service' },
            { field: 'date', header: 'Date' }
        ];
    }

    openNew() {
        this.solicitation = {};
        this.submitted = false;
        this.solicitationDialog = true;
    }

    deleteSelectedSolicitations() {
        this.deleteSolicitationsDialog = true;
    }

    editSolicitation(solicitation: Solicitation) {
        this.solicitation = { ...solicitation };
        this.solicitationDialog = true;
    }

    deleteSolicitation(solicitation: Solicitation) {
        this.deleteSolicitationDialog = true;
        this.solicitation = { ...solicitation };
    }

    confirmDeleteSelected() {
        this.deleteSolicitationsDialog = false;
        this.selectedSolicitations.forEach(solicitation => {
            this.solicitationService.deleteSolicitation(solicitation.key);
        });
        this.selectedSolicitations = [];
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Solicitations Deleted', life: 3000 });
    }

    confirmDelete() {
        this.deleteSolicitationDialog = false;
        this.solicitationService.deleteSolicitation(this.solicitation.key);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Solicitation Deleted', life: 3000 });
    }

    hideDialog() {
        this.solicitationDialog = false;
        this.submitted = false;
    }

    saveSolicitation() {
        this.submitted = true;

        if (this.solicitation.pet && this.solicitation.tutor && this.solicitation.service && this.solicitation.date) {
            if (this.solicitation.key) {
                this.solicitationService.updateSolicitation(this.solicitation.key, this.solicitation);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Solicitation Updated', life: 3000 });
            } else {
                this.solicitationService.addSolicitation(this.solicitation);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Solicitation Created', life: 3000 });
            }

            this.solicitations = [...this.solicitations];
            this.solicitationDialog = false;
            this.solicitation = {};
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
