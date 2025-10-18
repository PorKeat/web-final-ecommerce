import { Component } from '@angular/core';

@Component({
  selector: 'app-about.components',
  imports: [],
  templateUrl: './about.components.html',
  styleUrls: ['./about.components.css'],
})
export class AboutComponents {
  teamMembers = [
    { name: 'Seng Porkeat', role: 'CEO & Founder' },
    { name: 'Chim Theara', role: 'Lead Designer' },
    { name: 'Va Eric', role: 'CTO' },
    { name: 'Noun Nara', role: 'Project Manager' },
    { name: 'SamBath Samnang', role: 'Lead Developer' },
  ];
}
