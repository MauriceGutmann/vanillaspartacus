import {Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {CheckoutStepService} from '@spartacus/checkout/components'
import {CheckoutStepType, PaymentTypeFacade} from '@spartacus/checkout/root'
import {B2BPaymentTypeEnum, isNotUndefined, PaymentType} from '@spartacus/core'
import {Observable} from 'rxjs'
import {distinctUntilChanged, filter, tap} from 'rxjs/operators'

@Component({
  selector: 'app-my-payment-type',
  templateUrl: './my-payment-type.component.html',
  styleUrls: ['./my-payment-type.component.scss']
})
export class MyPaymentTypeComponent  {

  @ViewChild('poNumber', { static: false })
  private _poNumberInput?: ElementRef;
  typeSelected?: string;
  cartPoNumber?: string;
  paymentTypes$: Observable<
    PaymentType[]
    > = this.paymentTypeService.getPaymentTypes();
  typeSelected$: Observable<string> = this.paymentTypeService
    .getSelectedPaymentType()
    .pipe(
      filter(isNotUndefined),
      distinctUntilChanged(),
      tap((selected) => {
        this.typeSelected = selected;
        this.checkoutStepService.resetSteps();
        this.checkoutStepService.disableEnableStep(
          CheckoutStepType.PAYMENT_DETAILS,
          selected === B2BPaymentTypeEnum.ACCOUNT_PAYMENT
        );
      })
    );
  cartPoNumber$: Observable<string> = this.paymentTypeService
    .getPoNumber()
    .pipe(
      filter(isNotUndefined),
      tap((po) => {
        return (this.cartPoNumber = po);
      })
    );
  constructor(
    protected paymentTypeService: PaymentTypeFacade,
    protected checkoutStepService: CheckoutStepService,
    protected activatedRoute: ActivatedRoute
  ) {}

  changeType(code: string | undefined): void {
    if (!code) return
    this.paymentTypeService.setPaymentType(code);
    this.typeSelected = code;
  }

  next(): void {
    // set po number to cart
    const poNumInput = this._poNumberInput?.nativeElement.value;
    if (this.typeSelected && poNumInput !== this.cartPoNumber) {
      this.paymentTypeService.setPaymentType(this.typeSelected, poNumInput);
    }

    this.checkoutStepService.next(this.activatedRoute);
  }

  back(): void {
    this.checkoutStepService.back(this.activatedRoute);
  }

}
