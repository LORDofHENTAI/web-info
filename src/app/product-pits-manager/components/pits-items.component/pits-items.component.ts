import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core'
import { PitsService } from '../../services/pits.service';
import { TokenService } from 'src/app/common/services/token/token.service';
import { SnackbarService } from 'src/app/common/services/snackbar/snackbar.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pits } from '../../models/pits.model';
import { GetPitsItems } from '../../models/get-pits-items.model';
import { PitsList } from '../../models/pits-list.model';
import { AddPitsItem } from '../../models/add-pits.model';
import { UpdatePits } from '../../models/update-pits.model';
import { DeletePitsItem } from '../../models/delete-pits-item.model';
import { ImportPitsModel } from '../../models/import-pits.model';
import { PitsItemSuply } from '../../models/pits-item-suply.model';
import { formatDate } from '@angular/common';

@Component({
    selector: 'app-pits-items',
    templateUrl: './pits-items.component.html',
    styleUrls: ['./pits-items.component.scss']
})
export class PitsItemsComponent implements OnInit {
    @Input() data: Pits;
    @Output('hideChild') hide: EventEmitter<any> = new EventEmitter();

    tableColumns: string[] = ['Группа', 'Артикул', 'Штрихкод', 'Наименование', 'Поставщик', 'Остаток', 'Ср. сут. реал.', 'Дата поставкки', 'Комментарий руководителя', 'Примечание']
    constructor(
        private pitsService: PitsService,
        private tokenService: TokenService,
        private snackBarService: SnackbarService
    ) { }
    pitsItemsList: PitsList[]
    selectedDate = new Date()
    editableMode: boolean = false
    selectedRow: number
    jobTitle: string
    provider: string
    ngOnInit(): void {
        this.getPitsItems()
        this.jobTitle = this.tokenService.getTitle()
    }
    getPitsItems() {
        this.pitsService.GetPitsItems(new GetPitsItems(this.tokenService.getToken(), this.data.id)).subscribe({
            next: result => {
                this.pitsItemsList = result
                console.log(result)
            },
            error: error => {
                console.log(error)
                this.snackBarService.openRedSnackBar()
            }
        })
    }
    addProductToOrder(element: string) {
        if (this.data.status == "Черновик") {
            this.pitsService.AddPitsItem(new AddPitsItem(this.tokenService.getToken(), this.tokenService.getShop(), this.data.id, element)).subscribe({
                next: result => {
                    switch (result.status) {
                        case "true":
                            this.snackBarService.openSnackGreenBar('Добавлено в документ')
                            this.getPitsItems()
                            break;
                        case "BadAuth":
                            this.snackBarService.openRedSnackBar('Ошибка токена')
                            break;
                        case "null":
                            this.snackBarService.openRedSnackBar('Пустое значение')
                            break;
                        case "error":
                            this.snackBarService.openRedSnackBar()
                            break;
                    }
                },
                error: error => {
                    console.log(error)
                    this.snackBarService.openRedSnackBar()
                }
            })
        } else
            this.snackBarService.openRedSnackBar('Только черновик')
    }
    sendDoc() {
        this.pitsService.SendDoc(new GetPitsItems(this.tokenService.getToken(), this.data.id)).subscribe({
            next: result => {
                switch (result.status) {
                    case "true":
                        this.snackBarService.openSnackGreenBar('Отправлено в товарный отдел')
                        this.Back()
                        break;
                    case "BadAuth":
                        this.snackBarService.openRedSnackBar('Ошибка токена')
                        break;
                    case "null":
                        this.snackBarService.openRedSnackBar('Пустое значение')
                        break;
                    case "error":
                        this.snackBarService.openRedSnackBar()
                        break;
                }
            },
            error: error => {
                console.log(error);
                this.snackBarService.openRedSnackBar()
            }
        })
    }
    updateDocItems() {
        this.pitsService.UpdatePitsItems(new UpdatePits(this.tokenService.getToken(), this.pitsItemsList)).subscribe({
            next: result => {
                switch (result.status) {
                    case "true":
                        this.snackBarService.openSnackGreenBar('Сохранено')
                        this.Back()
                        break;
                    case "BadAuth":
                        this.snackBarService.openRedSnackBar('Ошибка токена')
                        break;
                    case "null":
                        this.snackBarService.openRedSnackBar('Пустое значение')
                        break;
                    case "error":
                        this.snackBarService.openRedSnackBar()
                        break;
                }
            },
            error: error => {
                console.log(error)
                this.snackBarService.openRedSnackBar()
            }
        })
    }
    clearDoc() {
        this.pitsService.DeleteAllPitsItems(new DeletePitsItem(this.tokenService.getToken(), this.data.id)).subscribe({
            next: result => {
                switch (result.status) {
                    case "true":
                        this.snackBarService.openSnackGreenBar('Документ очищен')
                        this.getPitsItems()
                        break;
                    case "BadAuth":
                        this.snackBarService.openRedSnackBar('Ошибка токена')
                        break;
                    case "null":
                        this.snackBarService.openRedSnackBar('Пустое значение')
                        break;
                    case "error":
                        this.snackBarService.openRedSnackBar()
                        break;
                }
            },
            error: error => {
                console.log(error);
                this.snackBarService.openRedSnackBar()
            }
        })
    }
    DeliteDocItem() {
        this.pitsService.DeletePitsItem(new DeletePitsItem(this.tokenService.getToken(), this.selectedRow)).subscribe({
            next: result => {
                switch (result.status) {
                    case "true":
                        this.snackBarService.openSnackGreenBar('Удалено')
                        this.getPitsItems()
                        break;
                    case "BadAuth":
                        this.snackBarService.openRedSnackBar('Ошибка токена')
                        break;
                    case "null":
                        this.snackBarService.openRedSnackBar('Пустое значение')
                        break;
                    case "error":
                        this.snackBarService.openRedSnackBar()
                        break;
                }
            },
            error: error => {
                console.log(error);
                this.snackBarService.openRedSnackBar()
            }
        })
    }
    selectedFiles: File;
    selectedFile: File;
    selectedFileName: string = 'Выберите файл';
    selectFile(event: any) {
        this.selectedFileName = '';
        this.selectedFiles = event.target.files;
        this.selectedFileName = this.selectedFiles[0].name;
        this.selectedFile = this.selectedFiles[0];
        console.log(this.selectedFile)
        this.uploadDat()
    }
    uploadDat() {
        let dat = new ImportPitsModel(this.tokenService.getToken(), String(this.data.id), this.tokenService.getShop(), this.selectedFile)
        this.pitsService.ImportFromDat(dat).subscribe({
            next: result => {
                switch (result.status) {
                    case "true":
                        this.snackBarService.openSnackGreenBar('Добавлено')
                        this.getPitsItems()
                        break;
                    case "BadAuth":
                        this.snackBarService.openRedSnackBar('Ошибка токена')
                        break;
                    case "null":
                        this.snackBarService.openRedSnackBar('Пустое значение')
                        break;
                    case "error":
                        this.snackBarService.openRedSnackBar()
                        break;
                }
            },
            error: error => {
                console.log(error);
                this.snackBarService.openRedSnackBar()
            }
        })
    }

    PitsItemSuply() {
        let suply = formatDate(this.selectedDate, 'dd.MM.yyyy', 'en-US')
        this.pitsService.PitsItemSuply(new PitsItemSuply(this.tokenService.getToken(), this.data.id, this.selectedRow, suply, this.provider)).subscribe({
            next: result => {
                switch (result.status) {
                    case "true":
                        this.snackBarService.openSnackGreenBar('Успешно')
                        this.getPitsItems()
                        break;
                    case "BadAuth":
                        this.snackBarService.openRedSnackBar('Ошибка токена')
                        break;
                    case "null":
                        this.snackBarService.openRedSnackBar('Пустое значение')
                        break;
                    case "error":
                        this.snackBarService.openRedSnackBar()
                        break;
                }
            },
            error: error => {
                console.log(error)
                this.snackBarService.openRedSnackBar()
            }
        })
    }

    editableModeON() {
        this.editableMode = !this.editableMode
    }
    selectPit(element: PitsList) {
        this.selectedRow = element.id
    }
    Back() {
        this.hide.emit()
    }
}