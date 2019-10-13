import { Observable } from 'rxjs/Rx';


export abstract class BaseService {  
    
    baseUrl = "http://localhost:4000";

    constructor() { }

    protected handleError(error: any) {
    var applicationError = error.headers.get('Application-Error');

    // either applicationError in header or model error in body
    if (applicationError) {
      alert(applicationError);
      return Observable.throw(applicationError);
    }

    var serverError = error.text();
    alert(serverError);
    return Observable.throw(serverError || 'Server error');
  }
}