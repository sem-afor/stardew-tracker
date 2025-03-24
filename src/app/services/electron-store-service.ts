import { Injectable } from '@angular/core';
import ElectronStore from 'electron-store';

// SINGLETON 
// behaving like a Singleton due to Angular's dependency injection system and the @Injectable({ providedIn: 'root' }) decorator
@Injectable({
  providedIn: 'root',
})
export class ElectronStoreService {
  private store: ElectronStore;

  constructor() {
    this.store = new ElectronStore();
  }

  getData(key: string): any {
    return this.store.get(key);
  }

  setData(key: string, value: any): void {
    this.store.set(key, value);
  }

  deleteData(key: string): void {
    this.store.delete(key);
  }

  clearAllData(): void {
    this.store.clear();
  }
}
