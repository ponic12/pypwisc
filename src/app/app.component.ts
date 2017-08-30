import { Component , OnInit} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
  trigger('cardFlip', [
      state('inactive', style({
        backgroundColor: '#eee',
        transform: 'scale(1)'
      })),
      state('active',   style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate('500ms ease-in')),
      transition('active => inactive', animate('500ms ease-out'))
    ])
  ]
})
export class AppComponent implements OnInit{
  constructor() { }

  disableButton: boolean = true;
  resultImgPath: string = "";
  
  colors: Array<string> = ["red", "green", "blue", "yellow"];
  shapes: Array<string> =["cross", "star", "circle", "triangle"];
  numbers: Array<number> =[1,2,3,4];
  
  cards : Array<any> = [];
  
  c1 : any = {nro:1, shape:'triangle', color:'red'};
  c2 : any = {nro:2, shape:'star', color:'green'};
  c3 : any = {nro:3, shape:'cross', color:'yellow'};
  c4 : any = {nro:4, shape:'circle', color:'blue'};
  sel = {nro:4, shape:'star', color:'blue'};
  
  cardsCounter : number = 0;
  series:Array<string> = ['color', 'shape', 'number', 'color', 'shape', 'number'];
  seriesIndex: number = 0;
  result: any = {partialOK:0, correct:0, incorrect:0, perseverations:0};
  
  ngOnInit() {
    this.initCards();
  };
  
  shapeColor = function(o){
    var fn = './assets/images/' + o.shape + '_' + o.color + '.png';
    return fn;
  };
  
  startTest() : void {
    this.disableButton = false;
    this.cardsCounter = 0;
    this.sel = this.cards[this.cardsCounter]; //{nro:4, shape:'triangle', color:'green'};
    this.cardsCounter++;
  };
  
  evalSel(c) : void {
      this.disableButton = true;
      setTimeout(()=>{
          this.disableButton=false
          },2000);
      
      let serie = this.series[this.seriesIndex];
      if (((serie == 'color')&&(this.sel.color == c.color)) ||
          ((serie == 'shape')&&(this.sel.shape == c.shape)) ||
          ((serie == 'number')&&(this.sel.nro == c.nro))
        )
      {
        this.result.correct = this.result.correct + 1;
        this.result.partialOK++;
        if (this.result.partialOK == 10) {
          this.result.perseverations--; // previene la perseveracion en el cambio de serie
          this.result.partialOK = 0;
          this.seriesIndex++;
          if (this.seriesIndex > 6)
            this.cardsCounter = 128;
        }
        this.resultImgPath = './assets/images/ok.png';
      }
      else {
        this.result.partialOK = 0;
        this.result.incorrect = this.result.incorrect + 1;
        this.resultImgPath = './assets/images/cancel.png';
        
        if (((serie == 'color')&&(this.sel.nro == c.nro)&&(this.seriesIndex==3)) ||
            ((serie == 'shape')&&(this.sel.color == c.color)) ||
            ((serie == 'number')&&(this.sel.shape == c.shape))
        )
        {
          this.result.perseverations++;
        }
      };

      this.sel = null;
      this.cardsCounter++;
      this.sel = this.cards[this.cardsCounter]; 
  }
  
  initCards() : void {
    for (let i of [1,2]) {
      for (let c of this.colors) {
        for (let s of this.shapes) {
          for (let n of this.numbers) {
            let card : any = {
              pile:i, color:c, shape:s, nro:n
            };
            this.cards.push(card);
          }  
        }  
      }
    }
    this.cards = this.shuffleCards();
    console.log(this.cards);
  }

  shuffleCards() : any[] {
   	let shuffle : Array<any> = [];
   	while (this.cards.length > 0) {
   	  let rnd: number = Math.floor(Math.random()*this.cards.length);
   	  console.log(rnd);
		  let c = this.cards[rnd];
		  shuffle.push(c);
		  this.cards.splice(rnd, 1);   	  
    }
    return shuffle;
  }
}
