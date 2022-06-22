import { Component, OnInit } from '@angular/core';
import {StorefrontComponent} from "@spartacus/storefront";

@Component({
  selector: 'app-payment-site',
  templateUrl: './payment-site.component.html',
  styleUrls: ['./payment-site.component.scss']
})
export class PaymentSiteComponent extends StorefrontComponent implements OnInit {


  ngOnInit(): void {
  }

}
