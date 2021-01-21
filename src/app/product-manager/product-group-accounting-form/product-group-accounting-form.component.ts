import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./product-group-accounting-form.component.css']
})
export class ProductGroupAccountingFormComponent implements OnInit {

  productArticleOrdering: string;
  productArticlePrice: string;
  group: string = '';
  selectedRowTree: string = '';
  
  searchValue: string = '';

  selectedSearchVar: string = 'article';
  selectedModeVar: string;

  hoveredIndex: any;
  valueModeVar: string;

  productPropAnswer: ProductPropAnswer = new ProductPropAnswer('', '', '', '', '', '', '', [], [], []);
  displayedColumnsProducts = ['article', 'name', 'type', 'goods', 'price', 'action'];
  displayedColumnsPlaces = ['place', 'bt'];
  displayedColumnsDelivers = ['delivers'];
  treeData: any;

  selectedRow: ProductAnswer = new ProductAnswer('', '', '', '', '');
  dataSourceProducts: ProductAnswer[] = [];
  tempDataSourceProducts: ProductAnswer[] = [];
  listPlaces: Array<string> = [];
  listDelivers: Array<string> = [];
  isEmptySearchValue = false;
  countListProducts: number = 0;
  scrollPosition = 5000;
  curentPositionTable = 200;
  isLoading: any;
  productToAdd: ProductAnswer;

  panelOpenStateTree = true;
  panelOpenStateOrdering = false;
  panelOpenStatePrice = false;

  isOpenProductPits = false;
  
  messageNoConnect = 'Нет соединения, попробуйте позже.';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';

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
    private snackbarService: SnackbarService,) 
    { }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  
  ngOnInit() {
    let y = this.tokenService.getToken();
    this.productService.getList(new DownList(this.tokenService.getToken())).subscribe(response => {
      if(response)
        this.dataSource.data = response;
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }

  onSelectNode(node) {
    this.clearProp();
    this.selectedRowTree = node.id;
    this.group = node.name.split(" ")[0];
    if(this.group) {
      this.dataSourceProducts = [];
      this.scrollPosition = 5000;
      this.productService.getProducts(
        new ProductQuery(this.tokenService.getToken(), this.group, '', '', '', this.tokenService.getShop(), this.tokenService.getType(), ''))
        .subscribe(response => {
          if(response) {
            this.dataSourceProducts = this.dataSourceProducts.concat(response);
            this.countListProducts = this.dataSourceProducts.length;
          }
      }, 
      error => { 
        console.log(error);
      });
    }
  }

  assignResponseProduct(response) {
    if(response) {
      this.dataSourceProducts = this.dataSourceProducts.concat(response);
      this.countListProducts = this.dataSourceProducts.length;
    }
  }

  assignResponseProductSearch(response) {
    if(response) {
      this.dataSourceProducts = response;
      this.countListProducts = this.dataSourceProducts.length;
      this.onSelectRowClick(this.dataSourceProducts[0]);
      if(this.searchValue.length >= 12)
        this.onOpenPriceChecker(this.dataSourceProducts[0]);
    }
  }

  assignResponseProductProp(response: ProductPropAnswer) {
    if(response) {
      this.listPlaces = [];
      this.listDelivers = [];
      this.productPropAnswer = response;  
      if(this.productPropAnswer.delivers) {
        var splitDelivers = this.productPropAnswer.delivers.split("; ");
        splitDelivers.forEach(element => {
          this.listDelivers.push(element);
        });
      }
      if(this.listPlaces.length > 0)
        if(this.listPlaces[this.listPlaces.length - 1].length == 0)
          this.listPlaces.pop();
      if(this.listDelivers.length > 0)    
        if(this.listDelivers[this.listDelivers.length - 1].length == 0)
          this.listDelivers.pop();
    }
  }

  onSearch() {
    this.clearProp();
    if(this.searchValue) {
      this.scrollPosition = 5000;
      this.group = '';
      this.dataSourceProducts = [];
      console.log(this.searchValue);
      this.isEmptySearchValue = false;
      if(this.selectedSearchVar === 'article') {
        this.productService.getProducts(
          new ProductQuery(this.tokenService.getToken(), '', this.searchValue, '', '', this.tokenService.getShop(), this.tokenService.getType(), ''))
          .subscribe(response => {
            this.assignResponseProductSearch(response); 
        }, 
        error => { 
          console.log(error);
        });
      }
      if(this.selectedSearchVar === 'name') {
        this.productService.getProducts(
          new ProductQuery(this.tokenService.getToken(), '', '', this.searchValue, '', this.tokenService.getShop(), this.tokenService.getType(), ''))
          .subscribe(response => {
            this.assignResponseProductSearch(response); 
        }, 
        error => { 
          console.log(error);
        });
      }
      if(this.selectedSearchVar === 'barcode') {
        this.productService.getProducts(
          new ProductQuery(this.tokenService.getToken(), '', '', '', this.searchValue, this.tokenService.getShop(), this.tokenService.getType(), ''))
          .subscribe(response => {
            this.assignResponseProductSearch(response);
        }, 
        error => { 
          console.log(error);
        });
      }
    } else {
      this.isEmptySearchValue = true;
    }
  }

  onClear() {
    this.isEmptySearchValue = false;
    this.searchValue = '';
    this.selectedSearchVar = 'article';
  }

  onSelectRowClick(row: ProductAnswer) {
    if(row.article) {
      this.selectedRow = row;
    }
  }

  onOpenPriceChecker(row: ProductAnswer) {
    const dialogRef = this.dialog.open(PriceCheckerComponent, {
      width: "60%",
      data: row
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result)
        if(this.panelOpenStateOrdering) {
          this.productArticleOrdering = '';
        }
    });
  }

  onOpenProductCard(row: ProductAnswer) {
    if(this.isOpenProductPits) {
      this.productToAdd = row;
    } else {
      const dialogRef = this.dialog.open(ProductCardComponent, {
        data: row.article
      });
      dialogRef.afterClosed().subscribe(result => {
      });
    }
  }

  onScroll(event) {
    if(event.target.scrollTop > this.scrollPosition) {
      this.scrollPosition += 5000;
      var pos = this.countListProducts + 200;
      if(pos % 200 == 0) {
        if(this.group && !this.searchValue) {
          this.productService.getProducts(
            new ProductQuery(this.tokenService.getToken(), this.group, '', '', '', this.tokenService.getShop(), this.tokenService.getType(), pos.toString()))
            .subscribe(response => {
              this.assignResponseProduct(response); 
          }, 
          error => { 
            console.log(error);
          });
        }
        if(this.selectedSearchVar === 'article' && this.searchValue) {
          this.productService.getProducts(
            new ProductQuery(this.tokenService.getToken(), '', this.searchValue, '', '', this.tokenService.getShop(), this.tokenService.getType(), pos.toString()))
            .subscribe(response => {
              this.assignResponseProduct(response); 
          }, 
          error => { 
            console.log(error);
          });
        }
        if(this.selectedSearchVar === 'name' && this.searchValue) {
          this.productService.getProducts(
            new ProductQuery(this.tokenService.getToken(), '', '', this.searchValue, '', this.tokenService.getShop(), this.tokenService.getType(), pos.toString()))
            .subscribe(response => {
              this.assignResponseProduct(response); 
          }, 
          error => { 
            console.log(error);
          });
        }
        if(this.selectedSearchVar === 'barcode' && this.searchValue) {
          this.productService.getProducts(
            new ProductQuery(this.tokenService.getToken(), '', '', '', this.searchValue, this.tokenService.getShop(), this.tokenService.getType(), pos.toString()))
            .subscribe(response => {
              this.assignResponseProduct(response); 
          }, 
          error => { 
            console.log(error);
          });
        }
      }
    }
  }

  openAttentionDialog(status: string) {
    const dialogRef = this.dialog.open(AttentionFormComponent, {
      data: { status: status },
    });
    dialogRef.afterClosed().subscribe(result => {});
  }

  clearProp() {
    this.productPropAnswer = new ProductPropAnswer('', '', '', '', '', '', '', [], [], []);
    this.listPlaces = [];
    this.listDelivers = [];
  }

  onModeVar(value) {
    if(this.valueModeVar !== value)
      this.valueModeVar = value;
    else {
      this.selectedModeVar = '';
      this.valueModeVar = '';
    }
  }
}