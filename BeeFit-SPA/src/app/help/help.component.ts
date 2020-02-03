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
        title: 'How many meals a day should a person eat?',
        description: 'The number of meals you eat per day depends on your energy needs and schedule. It is best to eat at least 3 times per day. For most individuals this would mean 3 meals per day, however, others find that they like to eat 6 times per day or 6 small meals.'
      },
      {
        title: 'What is the daily caloric demand of a person?',
        description: 'An average woman needs to eat about 2000 calories per day to maintain, and 1500 calories to lose one pound of weight per week. An average man needs 2500 calories to maintain, and 2000 to lose one pound of weight per week.'
      },
      {
        title: 'Which diet is the most effective in weight loss?',
        description: 'The Atkins diet is the most well-known low-carb weight loss diet. Its proponents insist that you can lose weight by eating as much protein and fat as you like, as long as you avoid carbs. The main reason why low-carb diets are so effective for weight loss is that they reduce your appetite'
      },
      {
        title: 'What is best breakfast to lose weight?',
        description: 'Oatmeal is a healthy and delicious breakfast option, especially if you\'re looking to lose weight. Oats are low in calories but high in fiber and protein — two nutrients that impact appetite and weight control.'
      },
      {
        title: 'Can I eat eggs everyday?',
        description: 'Overall, eating eggs is perfectly safe, even if you\'re eating up to 3 whole eggs per day. Given their range of nutrients and powerful health benefits, quality eggs may be among the healthiest foods on the planet.'
      },
      {
        title: 'What is the best snack for weight loss?',
        description: `Here are 8 healthy, weight-loss-friendly snacks to add to your diet:
        mixed nuts, 
        red bell pepper with guacamole, 
        greek yogurt and mixed berries, 
        apple slices with peanut butter, 
        cottage cheese with flax seeds and cinnamon, 
        celery sticks with cream cheese, 
        kale chips, 
        dark chocolate and almonds.
        `
      }
    ];
  }

}
