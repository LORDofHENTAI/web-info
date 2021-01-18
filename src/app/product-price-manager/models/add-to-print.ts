export class AddToPrint{
    constructor(
        /// <summary>
        /// Идентификатор пользователя
        /// </summary>
        public token: string,

        /// <summary>
        /// Артикул
        /// </summary>
        public article: string,

        /// <summary>
        /// Номер МХ
        /// </summary>
        public storeType: string,

        /// <summary>
        /// Вид цены МХ
        /// </summary>
        public priceType: string,
    ){}
}