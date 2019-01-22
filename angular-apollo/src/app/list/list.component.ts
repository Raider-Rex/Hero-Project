/*
  Hero Project - FullStack Example
  Project Team - Jovin Toews, Alexander Rennie, Tristan Smith, Nico, House Liu
*/

import { Component, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";

import gql from "graphql-tag";

import { Hero, Query } from "../types";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})



export class ListComponent implements OnInit {
  //Array to store returned heroes
  heroes: Hero [];
  
  //Using dependacy injection to create an Apollo object
  constructor(private apollo:Apollo) { }

  //This lifecycle hook calls our Query that returns all of our heroes when the component is initialized
  ngOnInit() {

      /* This query returns all of our heroes in the DB and binds the data to the array declared above.
         allHeroes - Is the name of the query, a query can be named anything but should make logical sense
         heroes - Is the name of the collection in the DB, this must match exactly
         name, id - are attributes of the heroes collection
      */
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
  
  //Method called when a hero is clicked.
  selectedHero: Hero;
  onSelect(hero: Hero): void {
  this.selectedHero = hero;
}

///// Mutations //////

//This Query Adds a new hero to the database
addHero(name :string){
    console.log(name);
    this.apollo.mutate({
      //The mutation property takes the mutation that you want to perform 
      //This mutation accepts a variable of type String! called name ($ denotes its a variable)
      // addHero(name: $name) passes the variable from above into the addHero mutation declared in the backend/graphql
      mutation: gql `
      mutation addHero($name: String!){
        addHero(name: $name){
          name
        }
      }
      `,
      variables: {
        //Sets the name property of this mutations ($name) = to the one passed in as a parameter
        name: name
      },
    }).subscribe();
}

//This Query deletes a hero from the database
deleteHero(id: string) {
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
