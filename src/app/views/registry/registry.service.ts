import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PeopleApi } from 'app/shared/models/peopleapi.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RegistryService {
  constructor(private http: HttpClient) { }
  getPeopleList(
    freeText?: string,
    clientNumber?: string,
    cpf?: string,
    lastModifiedDateMin?: Date,
    lastModifiedDateMax?: Date,
    status?: string,
    accountNumber?: string
  ): Observable<PeopleApi.PersonListViewModel[]> {
    const filter: { [k: string]: any } = {};

    if (freeText) {
      filter.textoLivre = freeText.replace(/[\/\;,.-]/g, '');
    } else {
      if (clientNumber) {
        filter.numeroCliente = clientNumber.replace(/[\/\;,.-]/g, '');
      }
      if (cpf) {
        filter.cpf = cpf.replace(/\D/g, '');
      }
      if (lastModifiedDateMax) {
        filter.dataUltimaModificacaoFinal = `${lastModifiedDateMax.getFullYear()}-${lastModifiedDateMax.getMonth() +
          1}-${lastModifiedDateMax.getDate()}`;
      }
      if (lastModifiedDateMin) {
        filter.dataUltimaModificacaoInicial = `${lastModifiedDateMin.getFullYear()}-${lastModifiedDateMin.getMonth() +
          1}-${lastModifiedDateMin.getDate()}`;
      }
      if (accountNumber) {
        filter.numeroCliente = accountNumber.replace(/[\/\;,.-]/g, '');
      }
      if (status !== null && status !== '') {
        filter.status = status;
      }
    }
    const url = `${environment.BASE_GATEWAY}/pessoas`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .get<PeopleApi.PeopleList[]>(url, { headers: headers, params: filter })
      .pipe(map(persons => persons.map(x => new PeopleApi.PersonListViewModel(x))));
  }
}


// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';
// import { delay } from 'rxjs/operators';
// import { UserDB } from '../../shared/inmemory-db/users';

// @Injectable()
// export class RegistryService {
//   items: any[];
//   constructor(
//     private http: HttpClient
//   ) {
//     let userDB = new UserDB();
//     this.items = userDB.users;
//   }

//   //******* Implement your APIs ********
//   getItems(): Observable<any> {
//     return of(this.items.slice())
//   }

//   addItem(item): Observable<any> {
//     item._id = Math.round(Math.random() * 10000000000).toString();
//     this.items.unshift(item);
//     return of(this.items.slice()).pipe(delay(1000));
//   }

//   updateItem(id, item) {
//     this.items = this.items.map(i => {
//       if (i._id === id) {
//         return Object.assign({}, i, item);
//       }
//       return i;

//     })
//     return of(this.items.slice()).pipe(delay(1000));
//   }

//   removeItem(row) {
//     let i = this.items.indexOf(row);
//     this.items.splice(i, 1);
//     return of(this.items.slice()).pipe(delay(1000));
//   }
// }
