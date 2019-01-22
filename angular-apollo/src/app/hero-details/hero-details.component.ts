/*
  Hero Project - FullStack Example
  Project Team - Jovin Toews, Alexander Rennie, Tristan Smith, John Tran, Niko, House
*/
import { Component, OnInit,Input } from '@angular/core';
import { Hero } from '../types';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss']
})
export class HeroDetailsComponent implements OnInit {
  //This makes it like an optional parameter to pass to 
  @Input() hero: Hero;

  //Dependacy Injection
  constructor(private apollo:Apollo) { }

  //This query updates a heros name based on its ID, see list.component.ts for breakdown
  updateHero(id: string, name: String) {
    this.apollo.mutate({
      mutation: gql`
      mutation update($id: String!, $name: String!) {
        updateHero(id: $id, name: $name) {
          name
        }
      }`,
      variables: {
        id: id,
        name: name
      }
    }).subscribe();
  }

  ngOnInit() {
  }
}
