import { LoginResponse } from '../models/login-response';

export class CookieLogin implements LoginResponse {
    constructor(
        /// <summary>
        /// Id shop
        /// </summary>
        public shopId: string,

        /// <summary>
        /// Price type
        /// </summary>
        public type: string,
        
        /// <summary>
        /// Логин пользователя в системе
        /// </summary>
        public login: string,

        /// <summary>
        /// Ключ доступа (стандартные запросы)
        /// </summary>
        public token: string,

        /// <summary>
        /// ФИО
        /// </summary>
        public cn: string,

        /// <summary>
        /// Должность
        /// </summary>
        public title: string,

        /// <summary>
        /// Отдел
        /// </summary>
        public department: string, 

        /// <summary>
        /// Админ = 1; Пользователь 0
        /// </summary>
        public adminCount: string, 
    ){}

    static setCookieLogin(id: string, type: string, data: LoginResponse) : CookieLogin {
        return new CookieLogin(id, type, data.login, data.token, data.cn, data.title, data.department, data.adminCount);
    }
}