import { Component, OnInit } from '@angular/core';
import { Tutor } from './models/tutor.model'; // Certifique-se de que o caminho do modelo está correto
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { TutorService } from './services/tutor.service';
import { CepService } from './services/cep.service';

@Component({
    templateUrl: './crud.component.html',
    providers: [MessageService]
})
export class CrudComponent implements OnInit {

    tutorDialog: boolean = false;

    deleteTutorDialog: boolean = false;

    deleteTutorsDialog: boolean = false;

    tutors: Tutor[] = [];

    tutor: Tutor = {}; // Defina os campos necessários do Tutor

    selectedTutors: Tutor[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    ufs: any[] =[];

    municipios: any[] = [];


    constructor(private tutorService: TutorService, private messageService: MessageService, private cepService: CepService) { }


    ngOnInit() {
        this.cepService.buscarEstados().subscribe((ufs:any[]) => {
            this.ufs = ufs
        })
        this.tutorService.getTutors().subscribe(data => this.tutors = data);

        this.tutorService.getTutors().subscribe((tutors: Tutor[])=>{ // Altere para o tipo Tutor[]
            this.tutors = tutors;
            console.log(tutors);
        });

        this.cols = [
            { field: 'nome', header: 'Nome' },
            { field: 'rua', header: 'Rua' },
            { field: 'bairro', header: 'Bairro' },
            { field: 'numero', header: 'Número' },
            { field: 'cidade', header: 'cidade' },
            { field: 'cep', header: 'CEP' },
            { field: 'estado', header: 'Estados' },
            { field: 'telefone', header: 'Telefone' },
            { field: 'cpf', header: 'CPF' },
            { field: 'sexo', header: 'Sexo' }
        ];

        this.statuses = [
            { label: 'Masculino', value: 'Masculino' },
            { label: 'Feminino', value: 'Feminino' },
            { label: 'Outro', value: 'Outro' }
        ];
    }

    getCep(cep: any) {
        this.cepService.buscar(cep).subscribe(
          (cep:any) => {
            this.tutor.logradouro = cep.logradouro
            const estadoId = this.ufs.find((estado: any) => estado.sigla == cep.uf)
            this.tutor.estado = estadoId
            this.tutor.bairro = cep.bairro
            this.getMunicipios(estadoId.id)
            setTimeout(() => {
                const municipioId = this.municipios.find((cidade: any) => cidade.nome == cep.localidade)
                this.tutor.municipio = municipioId

            }, 500)
            }
        )
      }

      getMunicipios(code: string) {
        this.cepService.buscarMunicipios(code).subscribe(
            (municipios:any) => {
                this.municipios = municipios
            }
        )
      }

      testeUF() {
        console.log('municipio', this.tutor.municipio);
      }


    openNew() {
        this.tutor = {};
        this.submitted = false;
        this.tutorDialog = true;
    }

    deleteSelectedTutors() {
        this.deleteTutorsDialog = true;
    }

    editTutor(tutor: Tutor) {
        this.tutor = { ...tutor };
        this.tutorDialog = true;
    }

    deleteTutor(tutor: Tutor) {
        this.deleteTutorDialog = true;
        this.tutorService.deleteTutor(tutor.key);
        this.confirmDelete();
    }

    confirmDeleteSelected() {
        this.deleteTutorsDialog = false;
        this.selectedTutors.forEach(tutor => {
            this.tutorService.deleteTutor(tutor.key);
        });
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Tutores Deletados', life: 3000 });
        this.selectedTutors = [];
    }

    confirmDelete() {
        this.deleteTutorsDialog = false;
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Tutores Deletados', life: 3000 });
        this.tutor = {};
    }

    hideDialog() {
        this.tutorDialog = false;
        this.submitted = false;
    }

    saveTutor() {
        this.submitted = true;

        if (this.tutor.nome?.trim()) {
            if (this.tutor.id) {
                this.tutorService.updateTutor(this.tutor.key, this.tutor);
                this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Tutor Atualizado', life: 3000 });
            } else {
                this.tutor.id = this.createId();
                this.tutorService.addTutor(this.tutor);
                this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Tutor Criado', life: 3000 });
            }

            this.tutors = [...this.tutors];
            this.tutorDialog = false;
            this.tutor = {};
        }
    }


    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.tutors.length; i++) {
            if (this.tutors[i].id === id) {
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
