import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { GetPitsModel } from '../../models/get-pits.model'
import { Pits } from '../../models/pits.model'
import { PitsService } from '../../services/pits.service'
import { TokenService } from 'src/app/common/services/token/token.service';
import { ShopService } from 'src/app/common/services/shop/shop.service';
import { StoreList } from 'src/app/common/models/store-list';
import { DepartmentList } from 'src/app/common/models/departmens';
import { formatDate } from '@angular/common';
import { CreatePits } from '../../models/create-pits.model';
import { SnackbarService } from 'src/app/common/services/snackbar/snackbar.service';
import { PitsItemsComponent } from '../pits-items.component/pits-items.component';
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

    constructor(
        private pitsService: PitsService,
        private tokenService: TokenService,
        private shopService: ShopService,
        private snackBarService: SnackbarService,
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
                console.log(result)
                this.pitsList = result
            },
            error: error => {
                console.log(error);
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
        this.pitsService.CreateNewDocument(new CreatePits(this.tokenService.getToken(), this.tokenService.getDepartment(), this.tokenService.getShop())).subscribe({
            next: result => {
                switch (result.status) {
                    case 'true':
                        this.GetPitList()
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
            },
            error: error => {
                console.log(error);
                this.snackBarService.openRedSnackBar()
            }
        })
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
    }
    addProductToOrder(element: string) {
        this.pitsItem.addProductToOrder(element)
    }
}