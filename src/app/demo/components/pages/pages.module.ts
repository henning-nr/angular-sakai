import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
    declarations: [], // Nenhuma declaração de componente neste módulo
    imports: [
        CommonModule, // Módulo Angular com diretivas comuns
        PagesRoutingModule // Módulo de roteamento das páginas
    ]
})
export class PagesModule { }
