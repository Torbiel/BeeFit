import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';


@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  faq: {title: string, description: string}[];
  constructor() { }

  ngOnInit() {
    this.faq = [
      {
        title: 'How to Get Your Body Measurements?',
        description: `Waist - Find your natural waist or the narrowest part of the torso.
Hips - This is the widest part of your glutes. Try looking in a mirror while standing sideways. Make sure the tape is parallel to the floor.
Chest - Stand with feet together and the torso straight and find the widest part around your bust.
Abs - Stand with feet together and torso straight but relaxed and find the widest part of your torso, often around your bellybutton.
Arms - Stand up straight with the arm relaxed and find the midpoint between the shoulder bone and the elbow of one arm.
Thighs - The midpoint between the lower part of the glutes and the back of the knee, or the widest part of the thigh.
Calves - Halfway between the knee and the ankle.`
      },
      {
        title: 'Pytanie',
        description: 'odpowiedz'
      },
      {
        title: 'Pytanie',
        description: 'odpowiedz'
      },
    ];
  }

}
