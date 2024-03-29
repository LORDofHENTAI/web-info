import { Component, OnInit, Version, ViewChild } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { ProductService } from '../services/product.service';
import { DownList } from '../models/down-list';
import { ProductQuery } from '../models/product-query';
import { ProductPropAnswer } from '../models/product-prop-answer';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/common/services/snackbar/snackbar.service';
import { AttentionFormComponent } from 'src/app/common/components/dialog-windows/attention-dialog/attention-form/attention-form.component';
import { ProductCardComponent } from '../dialog-windows/product-card/product-card.component';
import { TokenService } from 'src/app/common/services/token/token.service';
import { ProductAnswer } from '../models/product-answer';
import { PriceCheckerComponent } from '../dialog-windows/price-checker/price-checker.component';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ProductPriceListFormComponent } from 'src/app/product-price-manager/product-price-list-form/product-price-list-form.component';
import { ProductProp } from '../models/product-prop';
import { ProductOrderingListFormComponent } from 'src/app/product-ordering-manager/product-ordering-list-form/product-ordering-list-form.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { RequestProductManagerFormComponent } from 'src/app/request-product-manager/request-product-manager-form/request-product-manager-form.component';
import { PrintWindowComponent } from 'src/app/price-tags/dialog-windows/print-window/print-window.component';
import { HostListener } from "@angular/core";
import { PitsComponent } from 'src/app/product-pits-manager/components/pits-component/pits.component';
import { PitsService } from 'src/app/product-pits-manager/services/pits.service';
import { AddPitsItem } from 'src/app/product-pits-manager/models/add-pits.model';
import { PitsItemsComponent } from 'src/app/product-pits-manager/components/pits-items.component/pits-items.component';
interface PoductNode {
  id: string;
  name: string;
  children?: PoductNode[];
}

interface ExampleFlatNode {
  expandable: boolean;
  id: string;
  name: string;
  level: number;
}

@Component({
  selector: 'app-product-group-accounting-form',
  templateUrl: './product-group-accounting-form.component.html',
  styleUrls: ['./product-group-accounting-form.component.scss']
})
export class ProductGroupAccountingFormComponent implements OnInit {

  @ViewChild("orderingList", { static: false }) orderingList: ProductOrderingListFormComponent;
  @ViewChild("priceList", { static: false }) priceList: ProductPriceListFormComponent;
  @ViewChild("orderPits", { static: false }) orderPits: PitsComponent;
  @ViewChild("requestList", { static: false }) requestList: RequestProductManagerFormComponent;


  productArticlePrice: string;
  group: string = '';
  selectedRowTree: string = '';

  searchValue: string = '';

  selectedSearchVar: string = 'article';
  selectedModeVar: string;

  hoveredIndex: any;
  valueModeVar: string;

  productPropAnswer: ProductPropAnswer = new ProductPropAnswer('', '', '', '', '', '', '', [], [], [], [], '');
  displayedColumnsProducts = ['article', 'name', 'type', 'goods', 'price', 'stock_price', 'action']; //, 'action'
  displayedColumnsProducts1 = ['article', 'name', 'goods', 'price']
  displayColumns: any
  displayedColumnsPlaces = ['place', 'bt'];
  displayedColumnsDelivers = ['delivers'];
  treeData: any;

  selectedArticle = '';
  dataSourceProducts: ProductAnswer[] = [];
  tempDataSourceProducts: ProductAnswer[] = [];
  listPlaces: Array<string> = [];
  listDelivers: Array<string> = [];
  isEmptySearchValue = false;
  countListProducts: number = 0;
  scrollPosition = 5000;
  curentPositionTable = 200;
  isLoading: any;
  productToAdd: string;

  tabIndex: number = 0;

  panelOpenStateTree = true;

  isProductCard = false;
  isOpenOrdering = false;
  isOpenPrices = false;
  isOpenProductPits = false;
  isOpenProductRequest = false;

  color = 'accent';
  isExcluded = false;

  messageNoConnect = 'Нет соединения, попробуйте позже.';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';

  showLoader: boolean = false;

  private _transformer = (node: PoductNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      id: node.id,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    public dialog: MatDialog,
    private tokenService: TokenService,
    private productService: ProductService,
    private snackbarService: SnackbarService,
    private pitsService: PitsService
  ) {
    this.onResize();
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit() {
    // this.timerWakeUp();
    this.productService.getList(new DownList(this.tokenService.getToken())).subscribe(response => {
      if (response)
        this.dataSource.data = response;
    },
      error => {
        console.log(new Date().toString());
        console.log(error);
        this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
      });
    this.screenStartWidth = this.screenWidth
  }

  onSelectNode(node: PoductNode) {
    // this.clearProp();
    this.selectedRowTree = node.name;
    console.log(node);
    this.group = node.name.split(" ")[0];
    if (this.group) {
      this.dataSourceProducts = [];
      this.scrollPosition = 5000;
      // this.getProducts(new ProductQuery(this.tokenService.getToken(), this.isExcluded, this.group, '', '', '', this.tokenService.getShop(), this.tokenService.getType(), ''));
    }
  }

  onSelectNodeSearch(node: PoductNode) {
    this.clearProp();
    this.selectedRowTree = node.name;
    console.log(node);
    this.group = node.name.split(" ")[0];
    if (this.group) {
      if (this.group === "0.") {
        this.group = '';
      }
      this.dataSourceProducts = [];
      this.scrollPosition = 5000;
      this.getProducts(new ProductQuery(this.tokenService.getToken(), this.isExcluded, this.group, '', '', '', this.tokenService.getShop(), this.tokenService.getType(), ''));
    }
  }
  onSelectNode1(node: PoductNode) {
    // this.clearProp();
    this.selectedRowTree = node.name;
    console.log(node);
    this.group = node.name.split(" ")[0];
    if (this.group) {
      this.dataSourceProducts = [];
      this.scrollPosition = 5000;
      // this.getProducts(new ProductQuery(this.tokenService.getToken(), this.isExcluded, this.group, '', '', '', this.tokenService.getShop(), this.tokenService.getType(), ''));
    }
  }

  onSearch() {
    if (this.selectedSearchVar == 'barcode') {
      if (this.searchValue) {
        console.log(this.dataSourceProducts);
        console.log(this.searchValue);
        this.isEmptySearchValue = false;
        this.getProductsBySelectedSearchVar();
      } else {
        this.isEmptySearchValue = true;
      }
    }
    else {
      this.clearProp();
      if (this.searchValue) {
        this.scrollPosition = 5000;
        this.dataSourceProducts = [];
        console.log(this.searchValue);
        this.isEmptySearchValue = false;
        this.getProductsBySelectedSearchVar();
      } else {
        this.isEmptySearchValue = true;
      }
    }
  }

  getProductsBySelectedSearchVar() {
    console.log(this.group);
    if (this.group === "0.") {
      this.group = '';
    }
    if (this.selectedSearchVar === 'article') {
      this.getProductsForSearch(
        new ProductQuery(this.tokenService.getToken(), this.isExcluded, this.group, this.searchValue, '', '', this.tokenService.getShop(), this.tokenService.getType(), '')
      );
    }
    if (this.selectedSearchVar === 'name') {
      this.getProductsForSearch(
        new ProductQuery(this.tokenService.getToken(), this.isExcluded, this.group, '', this.searchValue, '', this.tokenService.getShop(), this.tokenService.getType(), '')
      );
    }
    if (this.selectedSearchVar === 'barcode') {
      console.log(111111);
      this.getProductsForSearch(
        new ProductQuery(this.tokenService.getToken(), this.isExcluded, this.group, '', '', this.searchValue, this.tokenService.getShop(), this.tokenService.getType(), '')
      );

    }
  }

  getProductsForSearch(query: ProductQuery) {
    this.showLoader = true;
    this.productService.getProducts(query).subscribe(response => {
      this.assignResponseProductSearch(response);
      this.showLoader = false;
    },
      error => {
        console.log(error);
        this.showLoader = false;
      });
  }

  onClear() {
    this.isEmptySearchValue = false;
    this.searchValue = '';
    this.selectedSearchVar = 'article';
  }

  onSelectRowClick(row: ProductAnswer) {
    if (row) {
      this.selectedArticle = row.article;
      this.getProductInfo(this.selectedArticle);
    }
  }

  onOpenPriceChecker(row: ProductAnswer) {
    const dialogRef = this.dialog.open(PriceCheckerComponent, {
      width: "60%",
      data: row
    });
    dialogRef.afterClosed().subscribe(result => {
      switch (result) {
        case 'print':
          this.priceList.getListPrices()
          break;
        case 'order':
          this.orderingList.getListVipiska();
          break;
      }
    });
  }

  onOpenProductCard(row: ProductAnswer) {
    const dialogRef = this.dialog.open(ProductCardComponent, {
      data: row.article
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onScroll(event) {
    if (event.target.scrollTop > this.scrollPosition) {
      this.scrollPosition += 5000;
      var pos = this.countListProducts + 200;
      if (pos % 200 == 0) {
        if (this.group && !this.searchValue) {
          this.getProducts(new ProductQuery(this.tokenService.getToken(), this.isExcluded, this.group, '', '', '', this.tokenService.getShop(), this.tokenService.getType(), pos.toString()));
        }
        if (this.selectedSearchVar === 'article' && this.searchValue) {
          this.getProducts(new ProductQuery(this.tokenService.getToken(), this.isExcluded, '', this.searchValue, '', '', this.tokenService.getShop(), this.tokenService.getType(), pos.toString()));
        }
        if (this.selectedSearchVar === 'name' && this.searchValue) {
          this.getProducts(new ProductQuery(this.tokenService.getToken(), this.isExcluded, '', '', this.searchValue, '', this.tokenService.getShop(), this.tokenService.getType(), pos.toString()));
        }
        if (this.selectedSearchVar === 'barcode' && this.searchValue) {
          this.getProducts(new ProductQuery(this.tokenService.getToken(), this.isExcluded, '', '', '', this.searchValue, this.tokenService.getShop(), this.tokenService.getType(), pos.toString()));
        }
      }
    }
  }

  openAttentionDialog(status: string) {
    const dialogRef = this.dialog.open(AttentionFormComponent, {
      data: { status: status },
    });
    dialogRef.afterClosed().subscribe(result => { });
  }

  clearProp() {
    this.productPropAnswer = new ProductPropAnswer('', '', '', '', '', '', '', [], [], [], [], '');
    this.listPlaces = [];
    this.listDelivers = [];
  }

  getProducts(query: ProductQuery) {
    this.showLoader = true;
    this.productService.getProducts(query).subscribe(response => {

      this.assignResponseProduct(response);
      this.showLoader = false;
    },
      error => {
        console.log(error);
        this.showLoader = false;
      });
  }

  assignResponseProduct(response) {
    if (response) {
      this.dataSourceProducts = this.dataSourceProducts.concat(response);
      this.countListProducts = this.dataSourceProducts.length;
    }
  }

  assignResponseProductSearch(response) {
    if (response) {
      this.dataSourceProducts = response;
      this.countListProducts = this.dataSourceProducts.length;
      this.onSelectRowClick(this.dataSourceProducts[0]);
      if (response.length > 0) {
        if (this.searchValue.length >= 12) {
          if (this.screenWidth > 1000)
            this.onOpenPriceChecker(this.dataSourceProducts[0]);
        }
        this.searchValue = '';
      }
    }
  }

  assignResponseProductProp(response: ProductPropAnswer) {
    if (response) {
      this.listPlaces = [];
      this.listDelivers = [];
      this.productPropAnswer = response;
      if (this.productPropAnswer.delivers) {
        var splitDelivers = this.productPropAnswer.delivers.split("; ");
        splitDelivers.forEach(element => {
          this.listDelivers.push(element);
        });
      }
      if (this.listPlaces.length > 0)
        if (this.listPlaces[this.listPlaces.length - 1].length == 0)
          this.listPlaces.pop();
      if (this.listDelivers.length > 0)
        if (this.listDelivers[this.listDelivers.length - 1].length == 0)
          this.listDelivers.pop();
    }
  }

  onSelectTab(event: MatTabChangeEvent) {
    this.tabIndex = event.index;
    switch (this.tabIndex) {
      case 3:
        this.isOpenOrdering = false;
        this.isOpenPrices = false;
        this.isOpenProductPits = false;
        break;

      case 4:
        this.isOpenOrdering = true;
        this.isOpenPrices = false;
        this.isOpenProductPits = false;
        this.isOpenProductRequest = false;
        break;

      case 5:
        this.isOpenOrdering = false;
        this.isOpenPrices = true;
        this.isOpenProductPits = false;
        this.isOpenProductRequest = false;
        break;
      case 6:
        this.isOpenOrdering = false;
        this.isOpenPrices = false;
        this.isOpenProductPits = true;
        this.isOpenProductRequest = false;
    }
  }

  onAddProductToOrder(article: string) {
    // this.orderPits.addProductToOrder(article);
  }

  onClickAddArticleOrdering(article: string) {
    this.orderingList.addInExcerpt(article)
  }

  onAdInPriceList(article: string) {
    this.priceList.addInList(article);
  }
  onAddProduct(article: string) {
    setTimeout(() => {
      switch (this.tabIndex) {
        case 4:
          this.orderingList.addInExcerpt(article)
          break;
        case 5:
          this.priceList.addInList(article);
          break;
        case 6:
          this.orderPits.addProductToOrder(article)
          break;
      }
    }, 1000)
  }

  getProductInfo(article: string) {
    this.productService.getProductProp(new ProductProp(this.tokenService.getToken(), article)).subscribe(response => {
      this.productPropAnswer = response;
      if (this.productPropAnswer.cashLoad === '1')
        this.productPropAnswer.cashLoad = 'ДА'
      if (this.productPropAnswer.cashLoad === '0')
        this.productPropAnswer.cashLoad = 'НЕТ'
    },
      error => {
        console.log(error);
      });
  }

  timerWakeUp() {
    var lastTime = (new Date()).getTime();
    setInterval(() => {
      var currentTime = (new Date()).getTime();
      if (currentTime > (lastTime + 20000 * 2)) {
        window.location.reload();
        console.log('reload');
      }
      lastTime = currentTime;
    }, 20000);
  }

  onToggleChange(value: MatSlideToggleChange) {
    this.isExcluded = value.checked;
    if (this.searchValue) {
      this.getProductsBySelectedSearchVar();
    } else {
      if (this.group) {
        this.clearProp();
        this.scrollPosition = 5000;
        this.dataSourceProducts = [];
        this.countListProducts = 0;
        this.getProducts(new ProductQuery(
          this.tokenService.getToken(), this.isExcluded, this.group, '', '', '', this.tokenService.getShop(), this.tokenService.getType(), '')
        );
      }
    }
  }

  inputHandle(event) {
    var number = event.target.value;
    if (number.length >= 12) {
      this.onSearch()
    }
  }

  onPrintLable(article: string) {
    const dialogRef = this.dialog.open(PrintWindowComponent, {
      width: '900px',
      height: '1000px',
      data: { article: article, printType: 'etiketka' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) { }
    });
  }
  //! адаптив
  screenHeight: number
  screenWidth: number
  screenStartWidth: number
  shortTable: boolean = false
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    if (this.screenWidth > 1000) {
      this.displayColumns = this.displayedColumnsProducts
      this.shortTable = true
    } else {
      this.displayColumns = this.displayedColumnsProducts1
      this.shortTable = false
    }
  }
  drawerControlArrow: string = 'arrow_forward_ios'
  showDrawerContent: boolean = false
  switchDrawerControl() {
    this.showDrawerContent = !this.showDrawerContent
    if (this.showDrawerContent == false)
      this.drawerControlArrow = 'arrow_forward_ios'
    else
      this.drawerControlArrow = 'arrow_back_ios'
  }
}