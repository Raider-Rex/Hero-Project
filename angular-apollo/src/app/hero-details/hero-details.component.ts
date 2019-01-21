import { Component, OnInit,Input } from '@angular/core';
import { Hero } from '../types';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss']
})
export class HeroDetailsComponent implements OnInit {
  //This makes it like an optional parameter to pass to 
  @Input() hero: Hero;

  constructor(private apollo:Apollo) { }

  updateHero(id: string, name: String) {
    //const mutationDelete = `;
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
