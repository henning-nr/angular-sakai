import { Component, OnInit } from '@angular/core';
import { Pet } from './models/pet.model'; // Certifique-se de que o caminho do modelo está correto
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { PetService } from './services/pet.service';

@Component({
    templateUrl: './crud.component.html',
    providers: [MessageService]
})
export class CrudComponent implements OnInit {

    petDialog: boolean = false;

    deletePetDialog: boolean = false;

    deletePetsDialog: boolean = false;

    pets: Pet[] = [];

    pet: Pet = {}; // Defina os campos necessários do Pet

    selectedPets: Pet[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private petService: PetService, private messageService: MessageService) { }
    

    ngOnInit() {
        this.petService.getPets().subscribe(data => this.pets = data);
        
        this.petService.getPets().subscribe((pets: Pet[])=>{ // Altere para o tipo Pet[]
            this.pets = pets;
            console.log(pets);
        });

        this.cols = [
            { field: 'nome', header: 'Nome' },
            { field: 'especie', header: 'Espécie' },
            { field: 'idade', header: 'Idade' },
            { field: 'dataNascimento', header: 'Data de Nascimento' },
            { field: 'peso', header: 'Peso' },
            { field: 'cor', header: 'Cor' },
            { field: 'sexo', header: 'Sexo' }
        ];

        this.statuses = [
            { label: 'Masculino', value: 'Masculino' },
            { label: 'Feminino', value: 'Feminino' },
            { label: 'Outro', value: 'Outro' }
        ];
    }

    openNew() {
        this.pet = {};
        this.submitted = false;
        this.petDialog = true;
    }

    deleteSelectedPets() {
        this.deletePetsDialog = true;
    }

    editPet(pet: Pet) {
        this.pet = { ...pet };
        this.petDialog = true;
    }

    deletePet(pet: Pet) {
        this.deletePetDialog = true;
        this.petService.deletePet(pet.key); 
        this.confirmDelete();
    }

    confirmDeleteSelected() {
        this.deletePetsDialog = false;
        this.selectedPets.forEach(pet => {
            this.petService.deletePet(pet.key); 
        });
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Pets Deleted', life: 3000 });
        this.selectedPets = [];
    }

    confirmDelete() {
        this.deletePetDialog = false;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Pet Deleted', life: 3000 });
        this.pet = {};
    }

    hideDialog() {
        this.petDialog = false;
        this.submitted = false;
    }

    savePet() {
        this.submitted = true;

        if (this.pet.nome?.trim()) {
            if (this.pet.id) { 
                this.petService.updatePet(this.pet.key, this.pet);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Pet Updated', life: 3000 });
            } else {
                this.pet.id = this.createId(); 
                this.petService.addPet(this.pet);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Pet Created', life: 3000 });
            }

            this.pets = [...this.pets];
            this.petDialog = false;
            this.pet = {};
        }
    }
    

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.pets.length; i++) {
            if (this.pets[i].id === id) {
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
