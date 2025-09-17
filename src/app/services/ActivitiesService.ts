import { Injectable } from '@angular/core';
import { Firestore, collection } from '@angular/fire/firestore';
import { getDocs } from 'firebase/firestore';  // <-- use this instead


@Injectable({ providedIn: 'root' })
export class ActivitiesService {
  constructor(private firestore: Firestore) {}

  private toJsDate(value: any): Date | null {
    if (!value) return null;
    if (value instanceof Date) return value;
    if (typeof value.toDate === 'function') return value.toDate();
    return null;
  }

  async getAllTransactions(): Promise<any[]> {
    const usersRef = collection(this.firestore, 'Users');
    const userSnapshot = await getDocs(usersRef);

    const allTransactions: any[] = [];

    for (const userDoc of userSnapshot.docs) {
      const userData: any = userDoc.data();
      const transactionsRef = collection(this.firestore, `Users/${userDoc.id}/Transactions`);
      const txSnapshot = await getDocs(transactionsRef);

      txSnapshot.forEach(txDoc => {
        const txData: any = txDoc.data();
        const transformed = {
          id: txDoc.id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          idNo: userData.idNo,
          ...txData,
          companions: Array.isArray(txData.companions) ? txData.companions : [],
          login: this.toJsDate(txData.login),
          logout: this.toJsDate(txData.logout),
        };

        allTransactions.push(transformed);
      });
    }
      allTransactions.sort((a, b) => {
      const aTime = a.login ? a.login.getTime() : 0;
      const bTime = b.login ? b.login.getTime() : 0;
      return bTime - aTime; // newest first
    });

    return allTransactions;
  }

  async getTodaysTransactions(): Promise<any[]> {
  const usersRef = collection(this.firestore, 'Users');
  const userSnapshot = await getDocs(usersRef);

  const todaysTransactions: any[] = [];

  // get today's start and end
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

  for (const userDoc of userSnapshot.docs) {
    const userData: any = userDoc.data();
    const transactionsRef = collection(this.firestore, `Users/${userDoc.id}/Transactions`);
    const txSnapshot = await getDocs(transactionsRef);

    txSnapshot.forEach(txDoc => {
      const txData: any = txDoc.data();
      const loginDate = this.toJsDate(txData.login);

      if (loginDate && loginDate >= startOfDay && loginDate <= endOfDay) {
        const transformed = {
          id: txDoc.id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          idNo: userData.idNo,
          ...txData,
          companions: Array.isArray(txData.companions) ? txData.companions : [],
          login: loginDate,
          logout: this.toJsDate(txData.logout),
        };

        todaysTransactions.push(transformed);
      }
    });
  }

  todaysTransactions.sort((a, b) => {
    const aTime = a.login ? a.login.getTime() : 0;
    const bTime = b.login ? b.login.getTime() : 0;
    return bTime - aTime; // newest first
  });

  return todaysTransactions;
}

}
