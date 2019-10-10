import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';
import { MinhasPostagensComponent } from './minhas-postagens/minhas-postagens.component';
import { PostagensEdicaoComponent } from './postagens-edicao/postagens-edicao.component';
import { TodasPostagensComponent } from './todas-postagens/todas-postagens.component';
import { AuthguardGuard } from './auth-guard.guard';
import { GuestGuardGuard } from './guest-guard.guard';
import { VisializarPostagemComponent } from './visializar-postagem/visializar-postagem.component';
import { NovaPostagemComponent } from './nova-postagem/nova-postagem.component';
import { EditarComponent } from './editar/editar.component';

const routes: Routes = [
	{ path: '', component: LoginComponent, canActivate: [ GuestGuardGuard ] },
	{ path: 'cadastro', component: CadastroComponent, canActivate: [ GuestGuardGuard ] },
	{ path: 'home', component: HomeComponent, canActivate: [ AuthguardGuard ] },
	{ path: 'minhas-postagens', component: MinhasPostagensComponent, canActivate: [ AuthguardGuard ] },
	{ path: 'postagens-edicao', component: PostagensEdicaoComponent, canActivate: [ AuthguardGuard ] },
	{ path: 'postagens', component: TodasPostagensComponent, canActivate: [ AuthguardGuard ] },
	{ path: 'postagens/:id', component: VisializarPostagemComponent, canActivate: [ AuthguardGuard ] },
	{ path: 'nova-postagem', component: NovaPostagemComponent, canActivate: [ AuthguardGuard ] },
	{ path: 'editar-postagem/:id', component: EditarComponent, canActivate: [ AuthguardGuard ] }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
