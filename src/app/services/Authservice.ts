import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class AuthService {
   isLoggedIn: boolean = false;
  constructor(private firestore: Firestore) {}

  async login(username: string, password: string): Promise<boolean> {
    const usersRef = collection(this.firestore, 'Users');
    const q = query(
      usersRef,
      where('username', '==', username),
      where('password', '==', password)
    );

    const snapshot = await getDocs(q);
    if(!snapshot.empty){
      this.isLoggedIn = true;
    }
    return !snapshot.empty; // true if at least one match
  }
}
