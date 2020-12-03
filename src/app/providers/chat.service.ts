import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

import { map } from 'rxjs/operators';

import { Mensaje } from '../iterface/mensaje.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<any>;

  public chats: any[] = [];
  public usuario: any = {};

  constructor( private afs: AngularFirestore,
               public auth: AngularFireAuth ) {

                this.auth.authState.subscribe( user => {

                  console.log( 'Estado del usuario:', user );

                  if ( !user ){
                    return;
                  }

                  this.usuario.nombre = user.displayName;
                  this.usuario.uid = user.uid;

                });
               }

  login( proveedor: string ): any {

    if ( proveedor === 'google' ) {

      this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

    } else {

      this.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());

    }


  }

  logout(): any {

    this.usuario = {};

    this.auth.signOut();

  }



  cargarMensajes(): any {

    this.itemsCollection = this.afs.collection<any>('chats', ref => ref.orderBy( 'fecha', 'desc' ).limit(8));

    return this.itemsCollection.valueChanges().pipe( map( ( mensajes: Mensaje[] ) => {
      console.log( mensajes );

      // this.chats = mensajes;

      this.chats = [];

      for (const mensaje of mensajes){

        this.chats.unshift( mensaje ); // invierte el arreglo para que salga ordenado correctamente
      }
      return this.chats;  // opcional en este caso si requiero trabajar con la data

    }));
  }

  agregarMensaje( texto: string ): any {

    const mensaje: Mensaje = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    };
    this.itemsCollection.add( mensaje )
    .then ( () => {
      console.log( 'mensaje enviado' );

    })
    .catch ( ( err ) => {

      console.log( 'error al enviar:', err );

    });
  }
}
