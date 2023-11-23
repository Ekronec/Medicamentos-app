import { Component, OnInit } from '@angular/core';

import { User } from "../../models/user.model";
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Conditional } from '@angular/compiler';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  user = {} as User;
  constructor(
    private toasCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private router: Router
  ) { }

  irALogin() {
    this.router.navigate(['/login']);
  }
  ngOnInit() { }

  async registro(user: User) {
    if (this.formValidation()) {
      let loader = await this.loadingCtrl.create({
        message: "Espere por favor..."
      })
      await loader.present();

      try {
        await this.afAuth.createUserWithEmailAndPassword(user.email, user.password).then(data => {
          console.log(data);

          this.navCtrl.navigateRoot("tabs")
        })

      } catch (e: any) {
        e.message = "Error al registrarse";
        let errorMessege = e.message || e.getLocalizedMessege();

        this.showToast(errorMessege)
      }

      await loader.dismiss();
    }
  }
  formValidation() {
    if (!this.user.email) {
      this.showToast("Ingrese un email");
      return false;

    }
    if (!this.user.password) {
      this.showToast("Ingrese una clave");
      return false;
    }

    return true;
  }

  showToast(message: string) {
    this.toasCtrl.create({
      message: message,
      duration: 4000
    }).then(toastData => toastData.present());
  }
}