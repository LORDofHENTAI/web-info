import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetUsersModel } from '../../models/users/get-users-model'
import { InfoWorkersModel } from '../../models/users/info-workers-model'
import { NewUserModel } from '../../models/users/new-user-model'
import { Status } from '../../models/status';
import { DeleteWorkerModel } from '../../models/users/../../models/users/delete-worker-model'
import { CheckUserModel } from '../../models/users/../../models/users/check-user-model'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }
  getUsersURL = environment.apiUrl + 'users/get/'
  newUsersURL = environment.apiUrl + 'users/new/'
  deleteUsersURL = environment.apiUrl + 'users/delete/'
  updateUsersURL = environment.apiUrl + 'users/update/'
  checkUserURL = environment.apiUrl + 'users/check/'
  searchUserUrl = environment.apiUrl + 'users/search/'

  GetUsers(data: GetUsersModel): Observable<InfoWorkersModel[]> {
    return this.http.post<InfoWorkersModel[]>(this.getUsersURL, data)
  }
  NewUsers(data: NewUserModel): Observable<Status> {
    return this.http.post<Status>(this.newUsersURL, data)
  }
  DeleteUser(data: DeleteWorkerModel): Observable<Status> {
    return this.http.post<Status>(this.deleteUsersURL, data)
  }
  UpdateUser(data: NewUserModel): Observable<Status> {
    return this.http.post<Status>(this.updateUsersURL, data)
  }
  CheckUser(data: CheckUserModel): Observable<InfoWorkersModel> {
    return this.http.post<InfoWorkersModel>(this.checkUserURL, data)
  }
  SearchUser(input: string): Observable<InfoWorkersModel[]> {
    return this.http.get<InfoWorkersModel[]>(this.searchUserUrl + `?request=${input}`)
  }
}
