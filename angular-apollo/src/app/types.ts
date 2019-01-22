/*
  Hero Project - FullStack Example
  Project Team - Jovin Toews, Alexander Rennie, Tristan Smith, Nico Cai, House Liu
*/

//Creating new Types that match the data being pulled from the database
export type Hero = {
    id: string;
    name: string;
}

//Specifies a property to store an array of hero's.
//Used as the type for the watchQuery in list.component.ts
export type Query = {
    heroes: [Hero];
}
