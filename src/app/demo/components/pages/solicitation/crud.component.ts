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
    templateUrl: './crud.component.html',
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
        this.loadSolicitations();
        this.loadPets();
        this.loadTutors();
        this.loadServices();

        this.cols = [
            { field: 'pet', header: 'Pet' },
            { field: 'tutor', header: 'Tutor' },
            { field: 'service', header: 'Service' },
            { field: 'date', header: 'Date' }
        ];
    }

    loadSolicitations() {
        this.solicitationService.getSolicitations().subscribe((solicitations: any) => {
            this.solicitations = solicitations;
            console.log('Solicitations:', this.solicitations); // Verificar as solicitações recebidas
        });
    }

    loadPets() {
        this.petService.getPets().subscribe((pets: any) => {
            this.pets = pets;
            console.log('Pets:', this.pets); // Verificar os pets recebidos
        });
    }

    loadTutors() {
        this.tutorService.getTutors().subscribe((tutors: any) => {
            this.tutors = tutors;
            console.log('Tutors:', this.tutors); // Verificar os tutores recebidos
        });
    }

    loadServices() {
        this.servicoService.getServices().subscribe((services: any) => {
            this.services = services;
            console.log('Services:', this.services); // Verificar os serviços recebidos
        });
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
        this.solicitation = { ...solicitation }; // Cria uma cópia da solicitação para edição
        this.solicitationDialog = true; // Abre o diálogo de edição
    }
    

    deleteSolicitation(solicitation: Solicitation) {
        this.solicitation = { ...solicitation }; // Define a solicitação a ser excluída
        this.deleteSolicitationDialog = true; // Abre o diálogo de confirmação de exclusão
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
        this.solicitationService.deleteSolicitation(this.solicitation.key).subscribe(() => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Solicitation Deleted', life: 3000 });
            this.loadSolicitations(); // Recarrega as solicitações após exclusão
        },
        error => {
            console.error('Error deleting solicitation:', error);
            // Tratar o erro adequadamente
        });
    
        this.deleteSolicitationDialog = false; // Fecha o diálogo de confirmação de exclusão
    }
    

    hideDialog() {
        this.solicitationDialog = false;
        this.submitted = false;
    }
    saveSolicitation() {
        this.submitted = true;
    
        if (this.solicitation.pet && this.solicitation.tutor && this.solicitation.service) {
            if (this.solicitation.key) {
                this.solicitationService.updateSolicitation(this.solicitation.key, this.solicitation).subscribe(() => {
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Solicitation Updated', life: 3000 });
                    this.loadSolicitations();
                },
                error => {
                    console.error('Error updating solicitation:', error);
                    // Tratar o erro adequadamente
                });
            } else {
                this.solicitationService.addSolicitation(this.solicitation).subscribe(() => {
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Solicitation Created', life: 3000 });
                    this.loadSolicitations();
                },
                error => {
                    console.error('Error adding solicitation:', error);
                    // Tratar o erro adequadamente
                });
            }
    
            this.solicitationDialog = false;
            this.solicitation = {};
        }
    }
    

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
