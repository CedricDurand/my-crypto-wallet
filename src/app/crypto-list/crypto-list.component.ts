import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CryptoService } from '../crypto.service';

export interface CryptoElement {
  rank: string;
  nom: number;
  prix: number;
  change: string;
}

const pricesWs = new WebSocket('wss://ws.coincap.io/prices?assets=ALL')

@Component({
  selector: 'app-crypto-list',
  templateUrl: './crypto-list.component.html',
  styleUrls: ['./crypto-list.component.css']
})
export class CryptoListComponent implements OnInit {
  displayedColumns: string[] = ['rank', 'nom', 'prix', 'change'];
  dataSource = new MatTableDataSource<CryptoElement>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  private cryptos : any;
  private elementData: any = [];
 constructor(private service: CryptoService) {
   this.service.getAllCrypto().subscribe((data) => {
     this.cryptos = data;
     console.log(data);

     for (let i = 0; i < this.cryptos.data.length ; i++) {
       let currentObject = {id: this.cryptos.data[i].id ,rank: this.cryptos.data[i].rank, nom: this.cryptos.data[i].name, prix: this.cryptos.data[i].priceUsd, change: this.cryptos.data[i].changePercent24Hr};
       this.elementData.push(currentObject);
     }

     this.dataSource = new MatTableDataSource<CryptoElement>(this.elementData);
   });

   pricesWs.onmessage = function (msg) {
        let jsonData = JSON.parse(msg.data)
        for (var key in jsonData){
            //console.log(jsonData[key]);
            if (this.elementData.hasOwnProperty(key)) {
              console.log('ici')
            }
        }
    }
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
