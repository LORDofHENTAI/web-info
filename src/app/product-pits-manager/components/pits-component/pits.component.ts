import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { GetPitsModel } from '../../models/get-pits.model'
import { Pits } from '../../models/pits.model'
import { PitsService } from '../../services/pits.service'
import { TokenService } from 'src/app/common/services/token/token.service';
import { ShopService } from 'src/app/common/services/shop/shop.service';
import { StoreList } from 'src/app/common/models/store-list';
import { DepartmentList } from 'src/app/common/models/departmens';
import { formatDate } from '@angular/common';
import { SnackbarService } from 'src/app/common/services/snackbar/snackbar.service';
import { PitsItemsComponent } from '../pits-items.component/pits-items.component';
import { SearchPitModel } from '../../models/search-pit-model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreatePits } from '../../models/create-pits.model';
@Component({
    selector: 'app-pits',
    templateUrl: './pits.component.html',
    styleUrls: ['./pits.component.scss']
})
export class PitsComponent implements OnInit {
    @ViewChild("pitsItem", { static: false }) pitsItem: PitsItemsComponent;
    @Input() isOpen: boolean;
    tableColumns: string[] = ['№ Документа', 'Дата', 'Отдел', 'Статус', 'Торговая точка']
    startDate = new Date()
    endDate = new Date()
    pitsList: Pits[]
    selectedDepartment: string = 'Все'
    selectedStore: string = 'Все'
    selectedStatus: string = 'Все'
    shops: StoreList[]
    departments: DepartmentList[]
    selectedRow: number
    selectedPit: Pits
    PitsItemsOpened: boolean = false
    searchingDoc: number
    constructor(
        private pitsService: PitsService,
        private tokenService: TokenService,
        private shopService: ShopService,
        private snackBarService: SnackbarService,
        public dialog: MatDialog,
    ) { }

    ngOnInit(): void {
        this.getShopList()
        this.GetPitList()
        this.getDepartmentsList()
    }
    GetPitList() {
        let start = formatDate(this.startDate, 'dd.MM.yyyy', 'en-US')
        let end = formatDate(this.endDate, 'dd.MM.yyyy', 'en-US')
        let pitsModel = new GetPitsModel(this.tokenService.getToken(), start, end, this.selectedDepartment, this.selectedStatus, this.selectedStore)
        this.pitsService.GetPits(pitsModel).subscribe({
            next: result => {
                this.pitsList = result
            },
            error: error => {
                console.log(error);
            }
        })
    }
    GetMyPits() {
        this.pitsService.GetMyPits(new GetPitsModel(this.tokenService.getToken())).subscribe({
            next: result => {
                this.pitsList = result
            }, error: error => {
                console.log(error)
            }
        })
    }
    showAll() {
        this.selectedDepartment = 'Все'
        this.selectedStore = 'Все'
        this.selectedStatus = 'Все'
        this.GetPitList()
    }
    createPit() {
        const dialogRef = this.dialog.open(PitsDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            this.GetPitList()
        });
    }
    getShopList() {
        this.shopService.getShops().subscribe(response => {
            console.log(response)
            if (response)
                this.shops = response;
        },
            error => {
                console.log(error);
            });
    }
    getDepartmentsList() {
        this.shopService.getDepartmentList().subscribe(response => {
            if (response)
                this.departments = response;
        },
            error => {
                console.log(error);
            });
    }
    selectPit(element: Pits) {
        this.selectedRow = element.id
        this.selectedPit = element
    }
    openPitItems() {
        this.PitsItemsOpened = !this.PitsItemsOpened
        this.GetPitList()
    }
    addProductToOrder(element: string) {
        this.pitsItem.addProductToOrder(element)
    }
    searchPit() {
        this.pitsService.SearchPit(new SearchPitModel(this.tokenService.getToken(), this.searchingDoc)).subscribe({
            next: result => {
                this.pitsList = []
                this.pitsList.push(result)
            },
            error: error => {
                console.log(error);
            }
        })
    }
    DeletePit() {
        this.pitsService.DeletePit(new SearchPitModel(this.tokenService.getToken(), this.selectedRow)).subscribe({
            next: result => {
                switch (result.status) {
                    case 'true':
                        this.snackBarService.openSnackGreenBar('Документ удален!')
                        this.GetPitList()
                        break;
                    case 'BadAuth':
                        this.snackBarService.openRedSnackBar('Ошибка авторизации')
                        break;
                    case 'error':
                        this.snackBarService.openRedSnackBar()
                        break;
                    case 'block':
                        this.snackBarService.openRedSnackBar('Чужой документ')
                        break;
                    case 'null':
                        this.snackBarService.openRedSnackBar('Пустое значение')
                        break;
                }
            }, error: error => {
                console.log(error);
            }
        })
    }
}

@Component({
    selector: 'app-pits-dialog',
    templateUrl: './pits.component.dialog.window.html',
    styleUrls: ['./pits.component.scss']
})
export class PitsDialogComponent implements OnInit {
    constructor(
        private tokenService: TokenService,
        private shopService: ShopService,
        private pitsService: PitsService,
        private snackBarService: SnackbarService,
        public dialogRef: MatDialogRef<PitsComponent>,
    ) { }
    departments: DepartmentList[]
    selectedDepartment: string
    ngOnInit(): void {
        this.getDepartments()
    }
    getDepartments() {
        this.shopService.getDepartmentList().subscribe(response => {
            if (response)
                this.departments = response;
        },
            error => {
                console.log(error);
            });
    }
    newPit() {
        this.pitsService.CreateNewDocument(new CreatePits(this.tokenService.getToken(), this.selectedDepartment, this.tokenService.getShop())).subscribe({
            next: result => {
                switch (result.status) {
                    case 'true':
                        this.snackBarService.openSnackGreenBar('Документ создан успешно!')
                        break;
                    case 'BadAuth':
                        this.snackBarService.openRedSnackBar('Ошибка авторизации')
                        break;
                    case 'error':
                        this.snackBarService.openRedSnackBar()
                        break;
                    case 'null':
                        this.snackBarService.openRedSnackBar('Пустое значение')
                        break;
                }
                this.dialogRef.close();
            },
            error: error => {
                console.log(error);
                this.snackBarService.openRedSnackBar()
            }
        })
    }
}