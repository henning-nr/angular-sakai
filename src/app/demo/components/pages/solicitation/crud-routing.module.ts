// solicitation-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CrudComponent } from './crud.component';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component:  CrudComponent }])],
    exports: [RouterModule]
})
export class CrudRoutingModule {}

// solicitation.module.ts

// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { TableModule } from 'primeng/table';
// import { ButtonModule } from 'primeng/button';
// import { DialogModule } from 'primeng/dialog';
// import { InputTextModule } from 'primeng/inputtext';
// import { DropdownModule } from 'primeng/dropdown';
// import { CalendarModule } from 'primeng/calendar';

// @NgModule({
//     imports: [
//         CommonModule,
//         FormsModule,
//         SolicitationRoutingModule,
//         TableModule,
//         ButtonModule,
//         DialogModule,
//         InputTextModule,
//         DropdownModule,
//         CalendarModule
//     ],
//     declarations: [CrudRoutingModule]
// })
// export class CrudRoutingModule {}
