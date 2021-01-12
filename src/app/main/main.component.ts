import { Component, ElementRef, OnInit } from '@angular/core';

export class Box{
    boxid: any
    constructor(id){
      this.boxid = id
    }
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  boxid: any = 0
  boxes: Box[] = []
  selectedBox: any
  toggle: boolean = false
  toggleText: string = 'OFF'
  boxLastPosLeft: any = []
  boxLastPosTop: any = []

  constructor(private element: ElementRef) { }

  ngOnInit(): void {
  }

  createBox(){
     this.boxes.push({'boxid': this.boxid});
     //initialise relative position of each box
     this.boxLastPosLeft[this.boxid] = '0px'
     this.boxLastPosTop[this.boxid] = '0px'
     this.boxid++
  }

  selectBox(boxid: any){
    //if listener ON
    if(this.toggleText == 'ON'){
      this.selectedBox = boxid
      let box = (<HTMLElement>document.getElementById('box' + this.selectedBox))
      box.style.position = 'relative'
      box.style.left = this.boxLastPosLeft[boxid]
      box.style.top = this.boxLastPosTop[boxid]
    }
  }

  toggleEventListener(){
    this.toggle = !this.toggle
    let self = this
    let abc = function(e){ 
      self.moveBox(e, self.selectedBox)
    }
    if(this.toggle==true){
      window.document.addEventListener("keydown", abc)
      this.toggleText = 'ON'
    }
    else{
      window.document.removeEventListener("keydown", abc);
      this.toggleText = 'OFF'
      this.selectedBox = null
    }
  }

  moveBox(e, boxSelected){   
    let box = (<HTMLElement>document.getElementById('box' + boxSelected))
    //get box position relative to fence
    var parentPos = document.getElementById('fence').getBoundingClientRect();
    let childPos = document.getElementById('box' + boxSelected).getBoundingClientRect();
    let relativePos: any = {};

    relativePos.top = childPos.top - parentPos.top,
    relativePos.right = childPos.right - parentPos.right,
    relativePos.bottom = childPos.bottom - parentPos.bottom,
    relativePos.left = childPos.left - parentPos.left;

    //console.log(box)
    var key_code = e.keyCode;
    switch(key_code){
        case 37: //left arrow 
        if(box!=null && childPos.left>(parentPos.left)){
            box.style.left=parseInt(box.style.left) - 10 +'px';
            this.boxLastPosLeft[boxSelected] = box.style.left
        }
        break;
        case 38: //up arrow
        if(box!=null && childPos.top>(parentPos.top)){
            box.style.top=parseInt(box.style.top) - 10 +'px'
            this.boxLastPosTop[boxSelected] = box.style.top
        }
        break;
        case 39: //right arrow
        if(box!=null && relativePos.left<(parentPos.width - childPos.width)){
            box.style.left=parseInt(box.style.left) + 10 +'px'
            this.boxLastPosLeft[boxSelected] = box.style.left
        }
        break;
        case 40: //down arrow
        if(box!=null && relativePos.top<(parentPos.height - childPos.height)){
            box.style.top=parseInt(box.style.top) + 10 +'px'
            this.boxLastPosTop[boxSelected] = box.style.top
        }
        break;
        case 65: //A 
        if(box!=null && childPos.left>(parentPos.left)){
            box.style.left=parseInt(box.style.left) - 10 +'px'
            this.boxLastPosLeft[boxSelected] = box.style.left
        }
        break;
        case 87: //W
        if(box!=null && childPos.top>(parentPos.top)){
            box.style.top=parseInt(box.style.top) - 10 +'px'
            this.boxLastPosTop[boxSelected] = box.style.top
        }
        break;
        case 68: //D
        if(box!=null && relativePos.left<(parentPos.width - childPos.width)){
            box.style.left=parseInt(box.style.left) + 10 +'px'
            this.boxLastPosLeft[boxSelected] = box.style.left
        }
        break;
        case 83: //S
        if(box!=null && relativePos.top<(parentPos.height - childPos.height)){
            box.style.top=parseInt(box.style.top) + 10 +'px'
            this.boxLastPosTop[boxSelected] = box.style.top
        }
        break;
        case 46: //Delete
        box.remove();
        break;
        default:
        console.log(e)                        
    }
  }

}
