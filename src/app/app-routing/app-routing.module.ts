import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CryptoListComponent } from '../crypto-list/crypto-list.component';

const routes: Routes = [
    {
        path: '',
        component: CryptoListComponent,
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }
