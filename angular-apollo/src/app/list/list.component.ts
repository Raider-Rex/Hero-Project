import { Component, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { cors } from 'cors';

import gql from "graphql-tag";

import { Hero, Query } from "../types";
import { from } from 'zen-observable';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})



export class ListComponent implements OnInit {
  heroes: Hero [];
  constructor(private apollo:Apollo) { }
  /*
  */
  ngOnInit() {
      this.apollo
      .watchQuery<Query>({
        query: gql
      `
      query allHeroes{
        heroes{
          name
          id
        }
      }
      `,
      })
      .valueChanges.subscribe(({data}) => {
        this.heroes = data.heroes;
      });
  }
   
  selectedHero: Hero;
onSelect(hero: Hero): void {
  this.selectedHero = hero;
}

addHero(name :string){
    this.apollo.mutate({
      mutation: gql `
      mutation addHero($name: String!){
        addHero(name: $name){
          name
        }
      }
      `,
      variables: {
        name: name
      },
    }).subscribe();
}

deleteHero(id: string) {
  //const mutationDelete = `;
  this.apollo.mutate({
    mutation: gql`
    mutation delete($id: String!) {
      deleteHero(id: $id) {
        name
      }
    }`,
    variables: {
      id: id
    }
  }).subscribe();
}


}
