import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppComponent } from './app.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
// import { PostagemComponent } from './postagem/postagem.component';
import { MenuComponent } from './menu/menu.component';
import { MinhasPostagensComponent } from './minhas-postagens/minhas-postagens.component';
import { PostagensEdicaoComponent } from './postagens-edicao/postagens-edicao.component';
import { TodasPostagensComponent } from './todas-postagens/todas-postagens.component';
import { AuthInterceptor } from './services/AuthInterceptor';
import { VisializarPostagemComponent } from './visializar-postagem/visializar-postagem.component';
import { PostagensComponent } from './postagens/postagens.component';
import { NovaPostagemComponent } from './nova-postagem/nova-postagem.component';

@NgModule({
	declarations: [
		AppComponent,
		CadastroComponent,
		LoginComponent,
		HomeComponent,
		MenuComponent,
		MinhasPostagensComponent,
		PostagensEdicaoComponent,
		TodasPostagensComponent,
		VisializarPostagemComponent,
		PostagensComponent,
		NovaPostagemComponent
	],
	imports: [ BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, AngularFontAwesomeModule ],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true
		}
	],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
