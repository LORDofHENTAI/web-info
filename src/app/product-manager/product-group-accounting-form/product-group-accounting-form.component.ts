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
import { ProductPitsComponent } from 'src/app/product-pits-manager/product-pits/product-pits.component';
import { ProductProp } from '../models/product-prop';
import { ProductOrderingListFormComponent } from 'src/app/product-ordering-manager/product-ordering-list-form/product-ordering-list-form.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';


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
  @ViewChild("orderPits", { static: false }) orderPits: ProductPitsComponent;

  productArticlePrice: string;
  group: string = '';
  selectedRowTree: string = '';

  searchValue: string = '';

  selectedSearchVar: string = 'article';
  selectedModeVar: string;

  hoveredIndex: any;
  valueModeVar: string;

  productPropAnswer: ProductPropAnswer = new ProductPropAnswer('', '', '', '', '', '', '', [], [], [], '');
  displayedColumnsProducts = ['article', 'name', 'type', 'goods', 'price', 'stock_price', 'action']; //, 'action'
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
    private snackbarService: SnackbarService,) { }

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
  }

  onSelectNode(node: PoductNode) {
    this.clearProp();
    this.selectedRowTree = node.name;
    console.log(node);
    this.group = node.name.split(" ")[0];
    if (this.group) {
      this.dataSourceProducts = [];
      this.scrollPosition = 5000;
      this.getProducts(new ProductQuery(this.tokenService.getToken(), this.isExcluded, this.group, '', '', '', this.tokenService.getShop(), this.tokenService.getType(), ''));
    }
  }

  onSearch() {
    this.clearProp();
    if (this.searchValue) {
      this.scrollPosition = 5000;
      this.group = '';
      this.dataSourceProducts = [];
      console.log(this.searchValue);
      this.isEmptySearchValue = false;
      this.getProductsBySelectedSearchVar();
    } else {
      this.isEmptySearchValue = true;
    }
  }

  getProductsBySelectedSearchVar() {
    if (this.selectedSearchVar === 'article') {
      this.getProductsForSearch(
        new ProductQuery(this.tokenService.getToken(), this.isExcluded, '', this.searchValue, '', '', this.tokenService.getShop(), this.tokenService.getType(), '')
      );
    }
    if (this.selectedSearchVar === 'name') {
      this.getProductsForSearch(
        new ProductQuery(this.tokenService.getToken(), this.isExcluded, '', '', this.searchValue, '', this.tokenService.getShop(), this.tokenService.getType(), '')
      );
    }
    if (this.selectedSearchVar === 'barcode') {
      this.getProductsForSearch(
        new ProductQuery(this.tokenService.getToken(), this.isExcluded, '', '', '', this.searchValue, this.tokenService.getShop(), this.tokenService.getType(), '')
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
      if (result) { }
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
    this.productPropAnswer = new ProductPropAnswer('', '', '', '', '', '', '', [], [], [], '');
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
        if (this.searchValue.length >= 12)
          this.onOpenPriceChecker(this.dataSourceProducts[0]);
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
    switch (event.index) {
      case 3:
        this.isOpenOrdering = true;
        this.isOpenPrices = false;
        this.isOpenProductPits = false;
        break;

      case 4:
        this.isOpenOrdering = false;
        this.isOpenPrices = true;
        this.isOpenProductPits = false;
        break;

      case 5:
        this.isOpenOrdering = false;
        this.isOpenPrices = false;
        this.isOpenProductPits = true;
        break;
    }
  }

  onAddProductToOrder(article: string) {
    this.orderPits.addProductToOrder(article);
  }

  onClickAddArticleOrdering(article: string) {
    this.orderingList.addInExcerpt(article)
  }

  onAdInPriceList(article: string) {
    this.priceList.addInList(article);
  }

  onAddProduct(article: string) {
    switch (this.tabIndex) {
      case 3:
        this.orderingList.addInExcerpt(article)
        break;

      case 4:
        this.priceList.addInList(article);
        break;

      case 5:
        this.orderPits.addProductToOrder(article);
        break;
    }
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


}