import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/User';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-nav',
  templateUrl: './profile-nav.component.html',
  styleUrls: ['./profile-nav.component.css']
})
export class ProfileNavComponent implements OnInit {
  user: User;
  activeOutlet: String = '';
  constructor(
    private alertify: AlertifyService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    const id = localStorage.getItem('userId');
    this.userService.getUser(id).subscribe((user: User) => {

      this.user = user;
    }, error => {
      this.alertify.error(error);
    });
  }

  navigate(url: string) {
    this.activeOutlet = url;
    history.pushState({ data: { user: this.user } }, '', '');

    this.router.navigate([
      { outlets: { profile: [url] } }],
      { relativeTo: this.route, skipLocationChange: true, state: { data: {user: this.user } } });
  }
}
