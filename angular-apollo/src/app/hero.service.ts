import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { cors } from 'cors';

import gql from "graphql-tag";

import { Hero, Query } from "./types";
import { from } from 'zen-observable';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  heroes: Hero [];
  constructor(private apollo:Apollo) { }

  /*
  Query the database
  <Query> - is the type we are pulling from ./types
  query allHeroes - the name of the query
  heroes - is the name of the DB collection
  name, id - properties of heroes
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
}

export var HEROES: Hero[] = this.heroes;
