import { LoginResponse } from '../models/login-response';

export class CookieLogin implements LoginResponse {
    constructor(
        public shopId: string,
        
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

    static setCookieLogin(id: string, data: LoginResponse) : CookieLogin {
        return new CookieLogin(id, data.login, data.token, data.cn, data.title, data.department, data.adminCount);
    }
}