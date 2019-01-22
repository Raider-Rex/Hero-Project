/*
  Hero Project - FullStack Example
  Project Team - Jovin Toews, Alexander Rennie, Tristan Smith, Niko, House
*/

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Custom Imports
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ListComponent } from './list/list.component';
import { HeroDetailsComponent } from './hero-details/hero-details.component';
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    HeroDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    FormsModule
  ],
  providers: [{
    // Create an Apollo connection
    provide: APOLLO_OPTIONS,
    useFactory(httpLink: HttpLink) {
      return {
        //Creates a cache to temporarily store data
        cache: new InMemoryCache(),
        //Initializes the Link and sets the URI = to the address of our backend server
        link: httpLink.create({
          uri: "http://localhost:4000/graphql"
        })
      }
    },
    deps: [HttpLink]
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
 }