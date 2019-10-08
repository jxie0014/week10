import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";

@Component({
  selector: "app-actor",
  templateUrl: "./actor.component.html",
  styleUrls: ["./actor.component.css"],
})
export class ActorComponent implements OnInit {
  actorsDB: any[] = [];
  moviesDB: any[] = [];
  miniActorsDB: any[] = [];

  section = 1;

  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";

  title: string = "";
  year: number = 0;
  movieId: string = "";

  actor: string = "";
  movie: string = "";


  constructor(private dbService: DatabaseService) {}

  //Get all Actors
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }
  //Create a new Actor, POST request
  onSaveActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe(result => {
      this.onGetActors();
    });
  }
  // Update an Actor
  onSelectUpdate(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }
  onUpdateActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe(result => {
      this.onGetActors();
    });
  }

  //Delete Actor
  onDeleteActor(item) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
    });
  }
  //Get all Movies
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }
  //Add Movie
  onSaveMovie() {
    let obj = { title: this.title, year: this.year };
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();
    });
  }
  //Delete Movie
  onDeleteMovie(item) {
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.onGetMovies();
    });
  }
  //Delete Movies by Year
  onDeleteMovies(year) {
    this.dbService.deleteMovies(year).subscribe(result => {
      this.onGetMovies();
    });
  }
  // Select Actor
  onSelectActor(item) {
    this.actor = item._id;
    console.log(this.actor);
  }
  // Select Movie
  onSelectMovie(item) {
    this.movie = item._id;
    console.log(this.movie);
  }
  //Add Actor to Movie
  onAddActorToMovie() {
    let obj = { actor: this.actor, movie: this.movie };
    this.dbService.addActorToMovie(obj).subscribe(result => {
      console.log("Actor added");
    });
  }
  onExtraTask(){
    let miniminiActorsDB = [];
      for (let i=0; i<this.actorsDB.length; i++){
        if (this.actorsDB[i].movies.length >= 2) {
          miniminiActorsDB.push(this.actorsDB[i]);
        }
      }
      this.miniActorsDB = miniminiActorsDB;
  }
  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
     this.onGetActors();
     this.onGetMovies();
  }

  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
    // if (sectionId == 10){
    //   this.onExtraTask();
    // }
  }

  resetValues() {
    this.fullName = "";
    this.bYear = 0;
    this.actorId = "";
    this.title = "";
    this.year = 0;
    this.movieId = "";
  }
}