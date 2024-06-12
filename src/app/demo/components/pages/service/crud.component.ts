import { Component, OnInit } from '@angular/core';
import { Service } from './models/service.models'; // Certifique-se de que o caminho do modelo está correto
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ServiceService } from './services/service.service';

@Component({
    templateUrl: './crud.component.html',
    providers: [MessageService]
})
export class CrudComponent implements OnInit {

    serviceDialog: boolean = false;

    deleteServiceDialog: boolean = false;

    deleteServicesDialog: boolean = false;

    services: Service[] = [];

    service: Service = {}; // Defina os campos necessários do Service

    selectedServices: Service[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private serviceService: ServiceService, private messageService: MessageService) { }

    ngOnInit() {
        this.serviceService.getServices().subscribe(data => this.services = data);

        this.cols = [
            { field: 'nome', header: 'Nome' },
            { field: 'descricao', header: 'Descrição' },
            { field: 'preco', header: 'Preço' },
            { field: 'duracao', header: 'Duração' }
        ];
    }

    openNew() {
        this.service = {};
        this.submitted = false;
        this.serviceDialog = true;
    }

    deleteSelectedServices() {
        this.deleteServicesDialog = true;
    }

    editService(service: Service) {
        this.service = { ...service };
        this.serviceDialog = true;
    }

    deleteService(service: Service) {
        this.deleteServiceDialog = true;
        this.serviceService.deleteService(service.key);
        this.confirmDelete();
    }

    confirmDeleteSelected() {
        this.deleteServicesDialog = false;
        this.selectedServices.forEach(service => {
            this.serviceService.deleteService(service.key);
        });
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Services Deleted', life: 3000 });
        this.selectedServices = [];
    }

    confirmDelete() {
        this.deleteServiceDialog = false;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Service Deleted', life: 3000 });
        this.service = {};
    }

    hideDialog() {
        this.serviceDialog = false;
        this.submitted = false;
    }

    saveService() {
        this.submitted = true;

        if (this.service.nome?.trim()) {
            if (this.service.id) {
                this.serviceService.updateService(this.service.key, this.service);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Service Updated', life: 3000 });
            } else {
                this.service.id = this.createId();
                this.serviceService.addService(this.service);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Service Created', life: 3000 });
            }

            this.services = [...this.services];
            this.serviceDialog = false;
            this.service = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.services.length; i++) {
            if (this.services[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
